// admin/Admin.tsx
import { useState, useEffect } from 'react'
import {
    User, Code2, FolderGit2, Mail, LogOut,
    Menu, X, Home, Shield
} from 'lucide-react'
import { useAdminAuth } from './hooks/useAdminAuth'
import EditorHero from './components/EditorHero'
import EditorAbout from './components/EditorAbout'
import EditorSkills from './components/EditorSkills'
import EditorProjects from './components/EditorProjects'
import EditorContact from './components/EditorContact'

const sections = [
    { id: 'hero', label: 'Hero', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'skills', label: 'Skills', icon: Code2 },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'contact', label: 'Contact', icon: Mail },
]

export default function Admin() {
    const { logout } = useAdminAuth()
    const [activeSection, setActiveSection] = useState('hero')
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    useEffect(() => {
        if (isMobile) setSidebarOpen(false)
    }, [isMobile])

    const renderEditor = () => {
        switch (activeSection) {
            case 'hero': return <EditorHero />
            case 'about': return <EditorAbout />
            case 'skills': return <EditorSkills />
            case 'projects': return <EditorProjects />
            case 'contact': return <EditorContact />
            default: return null
        }
    }

    return (
        <div className="min-h-screen bg-slate-900">
            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full bg-slate-800/95 backdrop-blur-xl border-r border-white/10 z-50 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-0 md:w-20'
                    } overflow-hidden`}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className={`p-4 border-b border-white/10 flex items-center ${sidebarOpen ? 'justify-between' : 'justify-center'}`}>
                        {sidebarOpen ? (
                            <>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
                                        <Shield size={16} className="text-white" />
                                    </div>
                                    <span className="text-white font-bold text-sm">Admin Panel</span>
                                </div>
                                <button
                                    onClick={() => setSidebarOpen(false)}
                                    className="md:hidden p-1 rounded-lg hover:bg-white/10 text-slate-400"
                                >
                                    <X size={18} />
                                </button>
                            </>
                        ) : (
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
                                <Shield size={16} className="text-white" />
                            </div>
                        )}
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                        {sections.map(({ id, label, icon: Icon }) => (
                            <button
                                key={id}
                                onClick={() => setActiveSection(id)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${activeSection === id
                                    ? 'bg-indigo-500/20 text-indigo-400'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                                    } ${!sidebarOpen && 'justify-center'}`}
                            >
                                <Icon size={18} />
                                {sidebarOpen && <span className="text-sm font-medium">{label}</span>}
                            </button>
                        ))}
                    </nav>

                    {/* Footer */}
                    <div className="p-3 border-t border-white/10">
                        <button
                            onClick={logout}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 transition-all ${!sidebarOpen && 'justify-center'
                                }`}
                        >
                            <LogOut size={18} />
                            {sidebarOpen && <span className="text-sm font-medium">Cerrar sesión</span>}
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <main className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0 md:ml-20'}`}>
                {/* Header */}
                <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-white/10 px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 rounded-lg hover:bg-white/10 text-slate-400 transition-colors"
                        >
                            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                        <div>
                            <h1 className="text-lg font-bold text-white">
                                {sections.find(s => s.id === activeSection)?.label || 'Dashboard'}
                            </h1>
                            <p className="text-xs text-slate-500">Panel de administración</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => window.location.href = '/'}
                            className="px-4 py-2 rounded-xl glass text-slate-300 hover:text-white transition-colors flex items-center gap-2 text-sm"
                        >
                            <Home size={16} />
                            Ver portafolio
                        </button>
                    </div>
                </header>

                {/* Content */}
                <div className="p-6 max-w-6xl mx-auto">
                    {renderEditor()}
                </div>
            </main>

            {/* Overlay para móvil */}
            {isMobile && sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    )
}