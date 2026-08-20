// admin/components/EditorProjects.tsx
import { useState } from 'react'
import { Save, RefreshCw, Plus, X, GripVertical, ChevronUp, ChevronDown } from 'lucide-react'
import { useContent } from '../../context/ContentContext'
import WysiwygEditor from './WysiwygEditor'
import ImageUpload from './ImageUpload'

export default function EditorProjects() {
    const { content, updateSection, refresh } = useContent()
    const projects = content?.projects || []

    const [form, setForm] = useState(projects)
    const [saving, setSaving] = useState(false)
    const [success, setSuccess] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)

    const gradients = [
        'from-emerald-500 to-teal-600',
        'from-orange-500 to-rose-600',
        'from-cyan-500 to-blue-600',
        'from-indigo-500 to-violet-600',
        'from-violet-500 to-pink-600',
        'from-pink-500 to-rose-600',
        'from-blue-500 to-indigo-600',
        'from-green-500 to-emerald-600'
    ]

    const defaultProject = {
        id: Date.now().toString(),
        title: '',
        description: '',
        tags: [],
        gradient: gradients[0],
        github: '',
        demo: '',
        images: []
    }

    // 🔧 Función para generar el nombre de la carpeta desde el título
    const getProjectFolder = (title: string) => {
        return title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]/g, '_')
            .replace(/_+/g, '_') // Reemplazar múltiples guiones bajos
            .replace(/^_|_$/g, ''); // Eliminar guiones bajos al inicio/final
    }

    const addProject = () => {
        const newProject = { ...defaultProject, id: Date.now().toString() }
        setForm([...form, newProject])
        setEditingId(newProject.id)
    }

    const removeProject = (id: string) => {
        setForm(form.filter(p => p.id !== id))
        if (editingId === id) setEditingId(null)
    }

    const updateProject = (id: string, field: string, value: any) => {
        setForm(form.map(p => p.id === id ? { ...p, [field]: value } : p))
    }

    const addTag = (id: string, tag: string) => {
        if (!tag.trim()) return
        const project = form.find(p => p.id === id)
        if (project && !project.tags.includes(tag.trim())) {
            updateProject(id, 'tags', [...project.tags, tag.trim()])
        }
    }

    const removeTag = (id: string, tag: string) => {
        const project = form.find(p => p.id === id)
        if (project) {
            updateProject(id, 'tags', project.tags.filter(t => t !== tag))
        }
    }

    const addImage = (id: string, url: string) => {
        const project = form.find(p => p.id === id)
        if (project) {
            updateProject(id, 'images', [...project.images, url])
        }
    }

    const removeImage = (id: string, index: number) => {
        const project = form.find(p => p.id === id)
        if (project) {
            updateProject(id, 'images', project.images.filter((_, i) => i !== index))
        }
    }

    const moveProject = (id: string, direction: 'up' | 'down') => {
        const index = form.findIndex(p => p.id === id)
        if (direction === 'up' && index > 0) {
            const newForm = [...form]
                ;[newForm[index], newForm[index - 1]] = [newForm[index - 1], newForm[index]]
            setForm(newForm)
        } else if (direction === 'down' && index < form.length - 1) {
            const newForm = [...form]
                ;[newForm[index], newForm[index + 1]] = [newForm[index + 1], newForm[index]]
            setForm(newForm)
        }
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            await updateSection('projects', form)
            setSuccess(true)
            setTimeout(() => setSuccess(false), 3000)
        } catch (err) {
            console.error('Error saving:', err)
        } finally {
            setSaving(false)
        }
    }

    const handleReset = async () => {
        await refresh()
        const freshProjects = content?.projects || []
        setForm(freshProjects)
        setEditingId(null)
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Editar Proyectos</h2>
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

            <button
                onClick={addProject}
                className="w-full py-4 rounded-xl border-2 border-dashed border-white/20 hover:border-indigo-500/50 transition-colors text-slate-400 hover:text-indigo-400 flex items-center justify-center gap-2"
            >
                <Plus size={20} />
                Agregar Proyecto
            </button>

            <div className="space-y-4">
                {form.map((project, index) => {
                    // 🔧 Generar el nombre de la carpeta para este proyecto
                    const projectFolder = getProjectFolder(project.title || 'proyecto_sin_titulo');

                    return (
                        <div key={project.id} className="glass rounded-xl overflow-hidden border border-white/10">
                            <div
                                className="px-4 py-3 bg-white/5 flex items-center justify-between cursor-pointer hover:bg-white/10 transition-colors"
                                onClick={() => setEditingId(editingId === project.id ? null : project.id)}
                            >
                                <div className="flex items-center gap-3">
                                    <GripVertical size={16} className="text-slate-500" />
                                    <span className="text-white font-medium">
                                        {project.title || 'Proyecto sin título'}
                                    </span>
                                    <span className="text-xs text-slate-500">
                                        {project.tags.length} tags · {project.images.length} imágenes
                                    </span>
                                    <span className="text-xs text-indigo-400">
                                        📁 {projectFolder}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); moveProject(project.id, 'up') }}
                                        className="p-1 rounded hover:bg-white/10 text-slate-500 hover:text-white transition-colors"
                                        disabled={index === 0}
                                    >
                                        <ChevronUp size={16} />
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); moveProject(project.id, 'down') }}
                                        className="p-1 rounded hover:bg-white/10 text-slate-500 hover:text-white transition-colors"
                                        disabled={index === form.length - 1}
                                    >
                                        <ChevronDown size={16} />
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); removeProject(project.id) }}
                                        className="p-1 rounded hover:bg-red-500/20 text-slate-500 hover:text-red-400 transition-colors"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            </div>

                            {editingId === project.id && (
                                <div className="p-4 space-y-4">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-1.5">
                                                Título
                                            </label>
                                            <input
                                                type="text"
                                                value={project.title}
                                                onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500/60"
                                                placeholder="Nombre del proyecto"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-1.5">
                                                Gradiente
                                            </label>
                                            <select
                                                value={project.gradient}
                                                onChange={(e) => updateProject(project.id, 'gradient', e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500/60"
                                            >
                                                {gradients.map(g => (
                                                    <option key={g} value={g} style={{ backgroundColor: '#1a1a2e' }}>
                                                        {g}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1.5">
                                            Descripción (WYSIWYG)
                                        </label>
                                        <WysiwygEditor
                                            value={project.description}
                                            onChange={(html) => updateProject(project.id, 'description', html)}
                                            minHeight="120px"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1.5">
                                            Tags
                                        </label>
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {project.tags.map(tag => (
                                                <span
                                                    key={tag}
                                                    className="flex items-center gap-1 px-3 py-1 rounded-lg bg-indigo-500/20 text-indigo-400 text-sm"
                                                >
                                                    {tag}
                                                    <button
                                                        onClick={() => removeTag(project.id, tag)}
                                                        className="ml-1 hover:text-red-400 transition-colors"
                                                    >
                                                        <X size={12} />
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        addTag(project.id, e.currentTarget.value)
                                                        e.currentTarget.value = ''
                                                    }
                                                }}
                                                className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500/60"
                                                placeholder="Escribe un tag y presiona Enter"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-1.5">
                                                URL GitHub
                                            </label>
                                            <input
                                                type="text"
                                                value={project.github}
                                                onChange={(e) => updateProject(project.id, 'github', e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500/60"
                                                placeholder="https://github.com/..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-300 mb-1.5">
                                                URL Demo
                                            </label>
                                            <input
                                                type="text"
                                                value={project.demo}
                                                onChange={(e) => updateProject(project.id, 'demo', e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500/60"
                                                placeholder="https://..."
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1.5">
                                            Imágenes
                                        </label>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-3">
                                            {project.images.map((img, idx) => (
                                                <div key={idx} className="relative group">
                                                    <img
                                                        src={img}
                                                        alt={`Imagen ${idx + 1}`}
                                                        className="w-full aspect-video object-cover rounded-lg border border-white/10"
                                                        onError={(e) => {
                                                            e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="%2364748b" stroke-width="2"%3E%3Crect x="3" y="3" width="18" height="18" rx="2"/%3E%3Ccircle cx="8.5" cy="8.5" r="1.5"/%3E%3Cpath d="M21 15l-5-5L5 21"/%3E%3C/svg%3E'
                                                        }}
                                                    />
                                                    <button
                                                        onClick={() => removeImage(project.id, idx)}
                                                        className="absolute top-1 right-1 p-1 rounded bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <X size={12} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        <ImageUpload
                                            currentImage=""
                                            onUpload={(url) => addImage(project.id, url)}
                                            onRemove={() => { }}
                                            section="projects"
                                            subfolder={projectFolder}
                                            label="Agregar imagen al proyecto"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                })}

                {form.length === 0 && (
                    <p className="text-slate-500 text-center py-8">
                        No hay proyectos aún. Haz clic en "Agregar Proyecto" para crear uno.
                    </p>
                )}
            </div>
        </div>
    )
}