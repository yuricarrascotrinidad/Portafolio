// admin/components/EditorSkills.tsx
import { useState } from 'react'
import { Save, RefreshCw, Plus, X, GripVertical } from 'lucide-react'
import { useContent } from '../../context/ContentContext'

export default function EditorSkills() {
    const { content, updateSection, refresh } = useContent()
    const skills = content?.skills

    const [form, setForm] = useState({
        title: skills?.title || '',
        categories: skills?.categories || []
    })

    const [saving, setSaving] = useState(false)
    const [success, setSuccess] = useState(false)
    const [activeCategory, setActiveCategory] = useState(0)

    const handleChange = (field: string, value: any) => {
        setForm(prev => ({ ...prev, [field]: value }))
    }

    const handleCategoryChange = (index: number, field: string, value: any) => {
        const newCategories = [...form.categories]
        newCategories[index] = { ...newCategories[index], [field]: value }
        setForm(prev => ({ ...prev, categories: newCategories }))
    }

    const handleSkillChange = (catIndex: number, skillIndex: number, field: string, value: any) => {
        const newCategories = [...form.categories]
        newCategories[catIndex].skills[skillIndex] = {
            ...newCategories[catIndex].skills[skillIndex],
            [field]: value
        }
        setForm(prev => ({ ...prev, categories: newCategories }))
    }

    const addCategory = () => {
        setForm(prev => ({
            ...prev,
            categories: [...prev.categories, { label: 'Nueva Categoría', skills: [] }]
        }))
        setActiveCategory(form.categories.length)
    }

    const removeCategory = (index: number) => {
        if (form.categories.length <= 1) return
        const newCategories = form.categories.filter((_, i) => i !== index)
        setForm(prev => ({ ...prev, categories: newCategories }))
        if (activeCategory >= newCategories.length) {
            setActiveCategory(newCategories.length - 1)
        }
    }

    const addSkill = (catIndex: number) => {
        const newCategories = [...form.categories]
        newCategories[catIndex].skills.push({
            name: 'Nueva Habilidad',
            level: 50,
            color: '#6366f1',
            icon: 'SiJavascript'
        })
        setForm(prev => ({ ...prev, categories: newCategories }))
    }

    const removeSkill = (catIndex: number, skillIndex: number) => {
        const newCategories = [...form.categories]
        newCategories[catIndex].skills = newCategories[catIndex].skills.filter((_, i) => i !== skillIndex)
        setForm(prev => ({ ...prev, categories: newCategories }))
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            await updateSection('skills', form)
            setSuccess(true)
            setTimeout(() => setSuccess(false), 3000)
        } catch (err) {
            console.error('Error saving:', err)
        } finally {
            setSaving(false)
        }
    }

    const colorOptions = [
        '#f7df1e', '#3178c6', '#61dafb', '#ffffff', '#dd0031',
        '#38bdf8', '#7952B3', '#EE6E73', '#bd34fe', '#68a063',
        '#777bb4', '#f89820', '#00599C', '#ffd343', '#ff2d20',
        '#092e20', '#336791', '#4479A1', '#003B57', '#DC382D',
        '#5a67d8', '#f05032', '#2496ed', '#fcc624', '#f24e1e',
        '#00539A', '#00A651', '#F2C811'
    ]

    const iconOptions = [
        'SiJavascript', 'SiTypescript', 'SiReact', 'SiNextdotjs', 'SiAngular',
        'SiTailwindcss', 'SiBootstrap', 'DiMaterializecss', 'SiVite', 'SiNodedotjs',
        'SiPhp', 'FaJava', 'SiCplusplus', 'SiPython', 'SiLaravel',
        'SiDjango', 'SiFlask', 'SiLivewire', 'SiPostgresql', 'SiMysql',
        'SiSqlite', 'SiRedis', 'SiPrisma', 'SiGithub', 'SiLinux',
        'SiFigma', 'FaProjectDiagram', 'FaCogs', 'FaChartBar'
    ]

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Editar Skills</h2>
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

            <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                    Título
                </label>
                <input
                    type="text"
                    value={form.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500/60"
                    placeholder="Mi stack tecnológico"
                />
            </div>

            <div className="border-t border-white/10 pt-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Categorías</h3>
                    <button
                        onClick={addCategory}
                        className="px-4 py-2 rounded-xl bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 transition-colors flex items-center gap-2 text-sm"
                    >
                        <Plus size={16} />
                        Agregar Categoría
                    </button>
                </div>

                <div className="flex gap-2 mb-4 flex-wrap">
                    {form.categories.map((cat, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveCategory(i)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeCategory === i
                                ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                                : 'glass text-slate-400 hover:text-white'
                                }`}
                        >
                            {cat.label}
                            {form.categories.length > 1 && (
                                <button
                                    onClick={(e) => { e.stopPropagation(); removeCategory(i) }}
                                    className="ml-2 text-slate-500 hover:text-red-400 transition-colors"
                                >
                                    <X size={14} />
                                </button>
                            )}
                        </button>
                    ))}
                </div>

                {form.categories.length > 0 && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">
                                Nombre de la categoría
                            </label>
                            <input
                                type="text"
                                value={form.categories[activeCategory]?.label || ''}
                                onChange={(e) => handleCategoryChange(activeCategory, 'label', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500/60"
                                placeholder="Frontend"
                            />
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-sm font-medium text-slate-300">Habilidades</p>
                                <button
                                    onClick={() => addSkill(activeCategory)}
                                    className="px-3 py-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 transition-colors flex items-center gap-1 text-xs"
                                >
                                    <Plus size={14} />
                                    Agregar
                                </button>
                            </div>

                            <div className="space-y-3">
                                {form.categories[activeCategory]?.skills.map((skill, idx) => (
                                    <div key={idx} className="glass rounded-xl p-4 border border-white/10">
                                        <div className="flex items-start gap-3">
                                            <div className="mt-2 cursor-move">
                                                <GripVertical size={16} className="text-slate-500" />
                                            </div>
                                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                <input
                                                    type="text"
                                                    value={skill.name}
                                                    onChange={(e) => handleSkillChange(activeCategory, idx, 'name', e.target.value)}
                                                    className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500/60 text-sm"
                                                    placeholder="Nombre de la habilidad"
                                                />
                                                <div className="flex gap-2">
                                                    <input
                                                        type="number"
                                                        value={skill.level}
                                                        onChange={(e) => handleSkillChange(activeCategory, idx, 'level', Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
                                                        className="w-20 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500/60 text-sm"
                                                        min="0"
                                                        max="100"
                                                    />
                                                    <select
                                                        value={skill.color}
                                                        onChange={(e) => handleSkillChange(activeCategory, idx, 'color', e.target.value)}
                                                        className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500/60 text-sm"
                                                    >
                                                        {colorOptions.map(color => (
                                                            <option key={color} value={color} style={{ backgroundColor: '#1a1a2e' }}>
                                                                {color}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <select
                                                        value={skill.icon}
                                                        onChange={(e) => handleSkillChange(activeCategory, idx, 'icon', e.target.value)}
                                                        className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500/60 text-sm"
                                                    >
                                                        {iconOptions.map(icon => (
                                                            <option key={icon} value={icon} style={{ backgroundColor: '#1a1a2e' }}>
                                                                {icon}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => removeSkill(activeCategory, idx)}
                                                className="mt-2 text-slate-500 hover:text-red-400 transition-colors"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                        <div className="mt-2">
                                            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full rounded-full transition-all"
                                                    style={{
                                                        width: `${skill.level}%`,
                                                        backgroundColor: skill.color
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {form.categories[activeCategory]?.skills.length === 0 && (
                                    <p className="text-slate-500 text-sm text-center py-4">
                                        No hay habilidades en esta categoría. Haz clic en "Agregar" para crear una.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}