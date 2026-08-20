// admin/components/EditorAbout.tsx
import { useState } from 'react'
import { Save, RefreshCw } from 'lucide-react'
import { useContent } from '../../context/ContentContext'
import WysiwygEditor from './WysiwygEditor'
import ImageUpload from './ImageUpload'

export default function EditorAbout() {
    const { content, updateSection, refresh } = useContent()
    const about = content?.about

    const [form, setForm] = useState({
        title: about?.title || '',
        description: about?.description || '',
        photo: about?.photo || '',
        stats: {
            degree: about?.stats?.degree || '',
            university: about?.stats?.university || '',
            location: about?.stats?.location || '',
            availability: about?.stats?.availability || ''
        }
    })

    const [saving, setSaving] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleChange = (field: string, value: any) => {
        setForm(prev => ({ ...prev, [field]: value }))
    }

    const handleStatChange = (field: string, value: string) => {
        setForm(prev => ({
            ...prev,
            stats: { ...prev.stats, [field]: value }
        }))
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            await updateSection('about', form)
            setSuccess(true)
            setTimeout(() => setSuccess(false), 3000)
        } catch (err) {
            console.error('Error saving:', err)
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Editar About</h2>
                <div className="flex gap-3">
                    <button
                        onClick={refresh}
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
                            '✅ Guardado'
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
                            placeholder="Mi historia"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">
                            Descripción (WYSIWYG)
                        </label>
                        <WysiwygEditor
                            value={form.description}
                            onChange={(html) => handleChange('description', html)}
                            minHeight="200px"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <ImageUpload
                        currentImage={form.photo}
                        onUpload={(url) => handleChange('photo', url)}
                        onRemove={() => handleChange('photo', '')}
                        section="about"  // <-- ¡IMPORTANTE!
                        label="Foto de perfil (About)"
                    />

                    <div className="border-t border-white/10 pt-4">
                        <p className="text-sm font-medium text-slate-300 mb-3">Estadísticas</p>
                        <div className="space-y-3">
                            <input
                                type="text"
                                value={form.stats.degree}
                                onChange={(e) => handleStatChange('degree', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500/60"
                                placeholder="Grado de estudio"
                            />
                            <input
                                type="text"
                                value={form.stats.university}
                                onChange={(e) => handleStatChange('university', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500/60"
                                placeholder="Universidad"
                            />
                            <input
                                type="text"
                                value={form.stats.location}
                                onChange={(e) => handleStatChange('location', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500/60"
                                placeholder="Ubicación"
                            />
                            <input
                                type="text"
                                value={form.stats.availability}
                                onChange={(e) => handleStatChange('availability', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500/60"
                                placeholder="Disponibilidad"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}