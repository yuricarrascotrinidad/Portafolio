// admin/components/EditorHero.tsx
import { useState } from 'react'
import { Save, RefreshCw, Link, FileText, File, Upload, X } from 'lucide-react'
import { useContent } from '../../context/ContentContext'
import WysiwygEditor from './WysiwygEditor'
import ImageUpload from './ImageUpload'

export default function EditorHero() {
    const { content, updateSection, refresh } = useContent()
    const hero = content?.hero

    const [form, setForm] = useState({
        title: hero?.title || '',
        subtitle: hero?.subtitle || '',
        description: hero?.description || '',
        photo: hero?.photo || '',
        available: hero?.available ?? true,
        cvUrl: hero?.cvUrl || '',
        cvType: hero?.cvType || 'url',
        cvLabel: hero?.cvLabel || 'Descargar CV',
        socialLinks: {
            linkedin: hero?.socialLinks?.linkedin || '',
            github: hero?.socialLinks?.github || '',
            twitter: hero?.socialLinks?.twitter || ''
        }
    })

    const [saving, setSaving] = useState(false)
    const [success, setSuccess] = useState(false)
    const [uploadingCv, setUploadingCv] = useState(false)

    const handleChange = (field: string, value: any) => {
        setForm(prev => ({ ...prev, [field]: value }))
    }

    const handleSocialChange = (platform: string, value: string) => {
        setForm(prev => ({
            ...prev,
            socialLinks: { ...prev.socialLinks, [platform]: value }
        }))
    }

    const handleCvFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) {
            console.log('No se seleccionó ningún archivo')
            return
        }

        console.log('=== SUBIENDO CV ===')
        console.log('Nombre:', file.name)
        console.log('Tipo:', file.type)
        console.log('Tamaño:', file.size, 'bytes')

        // Validar tamaño (máx 10MB)
        if (file.size > 10 * 1024 * 1024) {
            alert('El archivo es demasiado grande (máx 10MB)')
            return
        }

        // Validar tipo de archivo
        const allowedTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'image/jpeg',
            'image/png',
            'image/webp',
            'image/gif',
            'image/svg+xml',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ]

        if (!allowedTypes.includes(file.type)) {
            alert(`Tipo de archivo no permitido. Tipos permitidos: PDF, Word, Imagen, Excel. (Recibido: ${file.type})`)
            return
        }

        setUploadingCv(true)

        try {
            const token = localStorage.getItem('adminToken')
            if (!token) {
                throw new Error('No autenticado. Inicia sesión nuevamente.')
            }

            // Crear FormData
            const formData = new FormData()
            formData.append('image', file)
            // 🔥 CAMBIO IMPORTANTE: Usar 'hero' como sección y 'cv' como subcarpeta
            formData.append('section', 'hero')
            formData.append('subfolder', 'cv')

            console.log('Enviando a /api/upload con section=hero, subfolder=cv')

            const res = await fetch('http://localhost:3001/api/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            })

            console.log('Respuesta status:', res.status)

            // Intentar leer la respuesta
            let result
            const responseText = await res.text()
            console.log('Respuesta texto:', responseText)

            try {
                result = JSON.parse(responseText)
            } catch (parseError) {
                console.error('Error parseando JSON:', parseError)
                throw new Error(`Error del servidor: ${responseText || 'Respuesta vacía'}`)
            }

            if (!res.ok) {
                throw new Error(result.error || `Error ${res.status}: ${responseText}`)
            }

            console.log('Resultado:', result)

            // Determinar el tipo de archivo
            const fileType = file.type
            let cvType = 'url'
            if (fileType === 'application/pdf') cvType = 'pdf'
            else if (fileType.startsWith('image/')) cvType = 'image'
            else if (fileType.includes('word') || fileType.includes('document')) cvType = 'word'
            else if (fileType.includes('sheet') || fileType.includes('excel')) cvType = 'excel'

            // Actualizar estado con la URL correcta (que ahora será /uploads/hero/cv/...)
            setForm(prev => ({
                ...prev,
                cvUrl: result.url,
                cvType: cvType,
                cvLabel: file.name
            }))

            // Guardar automáticamente
            const updatedForm = {
                ...form,
                cvUrl: result.url,
                cvType: cvType,
                cvLabel: file.name
            }

            await updateSection('hero', updatedForm)

            setSuccess(true)
            setTimeout(() => setSuccess(false), 3000)

            console.log('CV subido y guardado exitosamente en:', result.url)

        } catch (err) {
            console.error('Error subiendo CV:', err)
            alert(`Error al subir el archivo: ${err instanceof Error ? err.message : 'Error desconocido'}`)
        } finally {
            setUploadingCv(false)
            if (e.target) {
                e.target.value = ''
            }
        }
    }

    const getCvTypeIcon = () => {
        switch (form.cvType) {
            case 'pdf': return <FileText size={16} className="text-red-400" />
            case 'image': return <Upload size={16} className="text-green-400" />
            case 'word': return <File size={16} className="text-blue-400" />
            case 'drive': return <Link size={16} className="text-yellow-400" />
            default: return <Link size={16} className="text-indigo-400" />
        }
    }

    const getCvTypeLabel = () => {
        switch (form.cvType) {
            case 'pdf': return 'PDF'
            case 'image': return 'Imagen'
            case 'word': return 'Word'
            case 'drive': return 'Google Drive'
            default: return 'URL'
        }
    }

    const getCvPlaceholder = () => {
        switch (form.cvType) {
            case 'pdf': return 'https://ejemplo.com/cv.pdf'
            case 'image': return 'https://ejemplo.com/cv.png'
            case 'word': return 'https://ejemplo.com/cv.docx'
            case 'drive': return 'https://drive.google.com/file/d/...'
            default: return 'https://ejemplo.com/cv.pdf'
        }
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            await updateSection('hero', form)
            setSuccess(true)
            setTimeout(() => setSuccess(false), 3000)
        } catch (err) {
            console.error('Error saving:', err)
            alert('Error al guardar: ' + (err instanceof Error ? err.message : 'Error desconocido'))
        } finally {
            setSaving(false)
        }
    }

    const handleReset = async () => {
        await refresh()
        const fresh = content?.hero
        if (fresh) {
            setForm({
                title: fresh.title || '',
                subtitle: fresh.subtitle || '',
                description: fresh.description || '',
                photo: fresh.photo || '',
                available: fresh.available ?? true,
                cvUrl: fresh.cvUrl || '',
                cvType: fresh.cvType || 'url',
                cvLabel: fresh.cvLabel || 'Descargar CV',
                socialLinks: {
                    linkedin: fresh.socialLinks?.linkedin || '',
                    github: fresh.socialLinks?.github || '',
                    twitter: fresh.socialLinks?.twitter || ''
                }
            })
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Editar Hero</h2>
                <div className="flex gap-3">
                    <button
                        onClick={handleReset}
                        className="px-4 py-2 rounded-xl glass text-slate-300 hover:text-white transition-colors flex items-center gap-2"
                    >
                        <RefreshCw size={16} />
                        Resetear
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="px-6 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold hover:from-indigo-400 hover:to-violet-500 transition-all flex items-center gap-2 disabled:opacity-60"
                    >
                        {saving ? (
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : success ? (
                            'Guardado'
                        ) : (
                            <>
                                <Save size={16} />
                                Guardar
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">
                            Título
                        </label>
                        <input
                            type="text"
                            value={form.title}
                            onChange={(e) => handleChange('title', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500/60"
                            placeholder="Hola, soy Yuri Carrasco"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">
                            Subtítulo
                        </label>
                        <input
                            type="text"
                            value={form.subtitle}
                            onChange={(e) => handleChange('subtitle', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500/60"
                            placeholder="Full Stack Developer"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">
                            Descripción (WYSIWYG)
                        </label>
                        <WysiwygEditor
                            value={form.description}
                            onChange={(html) => handleChange('description', html)}
                            minHeight="120px"
                        />
                    </div>

                    {/* CAMPO CV MEJORADO */}
                    <div className="border-t border-white/10 pt-4">
                        <label className="block text-sm font-medium text-slate-300 mb-3">
                            CV / Documento
                        </label>

                        <div className="space-y-3">
                            {/* Selector de tipo */}
                            <div className="flex flex-wrap gap-2">
                                {[
                                    { value: 'url', label: 'URL' },
                                    { value: 'pdf', label: 'PDF' },
                                    { value: 'image', label: 'Imagen' },
                                    { value: 'word', label: 'Word' },
                                    { value: 'drive', label: 'Google Drive' }
                                ].map((type) => (
                                    <button
                                        key={type.value}
                                        onClick={() => handleChange('cvType', type.value)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${form.cvType === type.value
                                            ? 'bg-indigo-500/30 text-indigo-400 border border-indigo-500/30'
                                            : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                                            }`}
                                    >
                                        {type.label}
                                    </button>
                                ))}
                            </div>

                            {/* URL del CV */}
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={form.cvUrl}
                                    onChange={(e) => handleChange('cvUrl', e.target.value)}
                                    className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500/60 text-sm"
                                    placeholder={getCvPlaceholder()}
                                />
                                {form.cvUrl && (
                                    <a
                                        href={form.cvUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-3 py-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 transition-colors flex items-center gap-1 text-sm whitespace-nowrap"
                                    >
                                        {getCvTypeIcon()}
                                        <span className="hidden sm:inline">{getCvTypeLabel()}</span>
                                    </a>
                                )}
                            </div>

                            {/* Subir archivo local */}
                            <div className="flex items-center gap-3">
                                <label className="flex-1 cursor-pointer">
                                    <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed transition-colors text-sm ${uploadingCv
                                        ? 'border-indigo-500/50 text-indigo-400 bg-indigo-500/10'
                                        : 'border-white/20 text-slate-400 hover:border-indigo-500/50 hover:text-indigo-400'
                                        }`}>
                                        <Upload size={16} className={uploadingCv ? 'animate-pulse' : ''} />
                                        <span>{uploadingCv ? 'Subiendo...' : 'Subir archivo local'}</span>
                                        <span className="text-xs text-slate-500">(PDF, Word, Imagen, hasta 10MB)</span>
                                    </div>
                                    <input
                                        type="file"
                                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp,.svg,.xls,.xlsx"
                                        onChange={handleCvFileUpload}
                                        className="hidden"
                                        disabled={uploadingCv}
                                    />
                                </label>
                            </div>

                            {/* Etiqueta del botón */}
                            <div>
                                <label className="block text-xs text-slate-400 mb-1">
                                    Texto del botón (opcional)
                                </label>
                                <input
                                    type="text"
                                    value={form.cvLabel}
                                    onChange={(e) => handleChange('cvLabel', e.target.value)}
                                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500/60 text-sm"
                                    placeholder="Descargar CV"
                                />
                            </div>

                            {/* Vista previa del archivo */}
                            {form.cvUrl && (
                                <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10">
                                    {getCvTypeIcon()}
                                    <span className="text-sm text-slate-300 truncate flex-1">
                                        {form.cvUrl.split('/').pop() || form.cvUrl}
                                    </span>
                                    <button
                                        onClick={() => {
                                            handleChange('cvUrl', '')
                                            handleChange('cvType', 'url')
                                        }}
                                        className="p-1 rounded hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <label className="block text-sm font-medium text-slate-300">
                            Disponible
                        </label>
                        <button
                            onClick={() => handleChange('available', !form.available)}
                            className={`relative w-12 h-6 rounded-full transition-colors ${form.available ? 'bg-emerald-500' : 'bg-slate-600'
                                }`}
                        >
                            <span
                                className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${form.available ? 'translate-x-6' : ''
                                    }`}
                            />
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    <ImageUpload
                        currentImage={form.photo}
                        onUpload={(url) => handleChange('photo', url)}
                        onRemove={() => handleChange('photo', '')}
                        section="hero"
                        label="Foto de perfil"
                    />

                    <div className="border-t border-white/10 pt-4">
                        <p className="text-sm font-medium text-slate-300 mb-3">Redes sociales</p>
                        <div className="space-y-3">
                            <input
                                type="text"
                                value={form.socialLinks.linkedin}
                                onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500/60"
                                placeholder="LinkedIn URL"
                            />
                            <input
                                type="text"
                                value={form.socialLinks.github}
                                onChange={(e) => handleSocialChange('github', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500/60"
                                placeholder="GitHub URL"
                            />
                            <input
                                type="text"
                                value={form.socialLinks.twitter}
                                onChange={(e) => handleSocialChange('twitter', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500/60"
                                placeholder="Twitter URL"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}