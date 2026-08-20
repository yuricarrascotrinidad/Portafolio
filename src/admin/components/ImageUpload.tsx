// admin/components/ImageUpload.tsx
import { useState, useRef, useEffect } from 'react'
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react'
import { api } from '../../services/api'

interface ImageUploadProps {
    currentImage: string
    onUpload: (url: string) => void
    onRemove: () => void
    section: string  // 'hero', 'about', 'projects', 'contact'
    subfolder?: string  // para proyectos: 'grow', 'tienda', etc.
    label?: string
    className?: string
}

export default function ImageUpload({
    currentImage,
    onUpload,
    onRemove,
    section,
    subfolder = '',
    label = 'Subir imagen',
    className = ''
}: ImageUploadProps) {
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [preview, setPreview] = useState<string>(currentImage)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Actualizar preview cuando cambia currentImage
    useEffect(() => {
        setPreview(currentImage)
    }, [currentImage])

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        if (file.size > 5 * 1024 * 1024) {
            setError('La imagen es demasiado grande (máx. 5MB)')
            return
        }

        setUploading(true)
        setError(null)

        try {
            const token = localStorage.getItem('adminToken')
            if (!token) throw new Error('No autenticado')

            // 🔥 Asegurar que section y subfolder se pasan correctamente
            console.log('📤 Subiendo imagen a:', section, subfolder || 'sin subcarpeta')

            const result = await api.uploadImage(file, token, section, subfolder)

            console.log('✅ Imagen subida:', result.url)

            setPreview(result.url)
            onUpload(result.url)

            if (fileInputRef.current) fileInputRef.current.value = ''

        } catch (err) {
            console.error('❌ Error al subir:', err)
            setError('Error al subir la imagen')
        } finally {
            setUploading(false)
        }
    }

    const handleRemove = async () => {
        try {
            const token = localStorage.getItem('adminToken')
            if (!token) throw new Error('No autenticado')

            // Extraer el nombre del archivo de la URL
            const filename = preview.split('/').pop()
            if (filename) {
                await api.deleteImage(section, filename, token)
            }

            setPreview('')
            onRemove()
            if (fileInputRef.current) fileInputRef.current.value = ''

        } catch (err) {
            console.error('❌ Error al eliminar:', err)
            setError('Error al eliminar la imagen')
        }
    }

    return (
        <div className={`space-y-3 ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-slate-300">
                    {label}
                </label>
            )}

            {preview ? (
                <div className="relative group">
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-full max-h-64 object-contain rounded-xl bg-slate-900/50 border border-white/10"
                        onError={(e) => {
                            console.error('❌ Error cargando imagen:', preview)
                            e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="%2364748b" stroke-width="2"%3E%3Crect x="3" y="3" width="18" height="18" rx="2"/%3E%3Ccircle cx="8.5" cy="8.5" r="1.5"/%3E%3Cpath d="M21 15l-5-5L5 21"/%3E%3C/svg%3E'
                        }}
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-3">
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="px-4 py-2 rounded-lg bg-indigo-500/80 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
                        >
                            Cambiar
                        </button>
                        <button
                            onClick={handleRemove}
                            className="px-4 py-2 rounded-lg bg-red-500/80 hover:bg-red-500 text-white text-sm font-medium transition-colors"
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            ) : (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center cursor-pointer hover:border-indigo-500/50 transition-colors"
                >
                    {uploading ? (
                        <div className="flex flex-col items-center gap-2">
                            <Loader2 size={32} className="animate-spin text-indigo-400" />
                            <p className="text-sm text-slate-400">Subiendo...</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2">
                            <ImageIcon size={32} className="text-slate-500" />
                            <p className="text-sm text-slate-400">
                                Haz clic para seleccionar una imagen
                            </p>
                            <p className="text-xs text-slate-500">
                                JPG, PNG, WEBP o GIF (máx. 5MB)
                            </p>
                            {subfolder && (
                                <p className="text-xs text-indigo-400">
                                    📁 {section}/{subfolder}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            )}

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="hidden"
            />

            {error && (
                <p className="text-sm text-red-400">{error}</p>
            )}
        </div>
    )
}