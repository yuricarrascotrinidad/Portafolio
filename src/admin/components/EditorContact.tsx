// admin/components/EditorContact.tsx
import { useState } from 'react'
import { Save, RefreshCw } from 'lucide-react'
import { useContent } from '../../context/ContentContext'
import WysiwygEditor from './WysiwygEditor'

export default function EditorContact() {
    const { content, updateSection, refresh } = useContent()
    const contact = content?.contact

    const [form, setForm] = useState({
        title: contact?.title || '',
        subtitle: contact?.subtitle || '',
        email: contact?.email || '',
        phone: contact?.phone || '',
        whatsapp: contact?.whatsapp || '',
        location: contact?.location || ''
    })

    const [saving, setSaving] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleChange = (field: string, value: any) => {
        setForm(prev => ({ ...prev, [field]: value }))
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            await updateSection('contact', form)
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
                <h2 className="text-2xl font-bold text-white">Editar Contacto</h2>
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
                            placeholder="Hablemos juntos"
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
                            placeholder="¿Tienes un proyecto en mente?"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">
                            Email
                        </label>
                        <input
                            type="email"
                            value={form.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500/60"
                            placeholder="tu@email.com"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">
                            Teléfono
                        </label>
                        <input
                            type="text"
                            value={form.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500/60"
                            placeholder="+51 989 766 318"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">
                            WhatsApp
                        </label>
                        <input
                            type="text"
                            value={form.whatsapp}
                            onChange={(e) => handleChange('whatsapp', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500/60"
                            placeholder="+51 989 766 318"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">
                            Ubicación
                        </label>
                        <input
                            type="text"
                            value={form.location}
                            onChange={(e) => handleChange('location', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500/60"
                            placeholder="Perú (Remoto/Presencial)"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}