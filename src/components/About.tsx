// ─── About Section ───────────────────────────────────────────────────────────
import { GraduationCap, School, MapPin, Clock } from 'lucide-react'
import { useContent } from '../context/ContentContext'

export default function About() {
  const { content, loading } = useContent()
  const about = content?.about

  if (loading) {
    return (
      <section id="about" className="py-28 px-6 relative">
        <div className="max-w-6xl mx-auto flex justify-center">
          <div className="w-8 h-8 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
        </div>
      </section>
    )
  }

  const stats = [
    { icon: GraduationCap, value: 'Grado de estudio', label: about?.stats?.degree || 'Bachiller en Ingeniería de Sistemas' },
    { icon: School, value: 'Universidad', label: about?.stats?.university || 'Universidad nacional José Maria Arguedas' },
    { icon: MapPin, value: 'Locación', label: about?.stats?.location || 'Lima/Perú' },
    { icon: Clock, value: 'Disponibilidad', label: about?.stats?.availability || 'Remoto/Presencial' },
  ]

  return (
    <section id="about" className="py-28 px-6 relative">
      {/* Ambient light */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-72 h-72 bg-violet-700/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <div className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">
            — Sobre mí
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-white"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {about?.title || 'Mi'} <span className="gradient-text">historia</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-14 items-center">
          {/* Avatar / visual side */}
          <div className="relative flex justify-center w-full">
            <div className="relative w-full max-w-sm md:max-w-md">
              <div
                className="w-full aspect-square rounded-3xl bg-gradient-to-br from-indigo-500 via-violet-600 to-cyan-500 p-1 animate-pulse-glow"
                style={{
                  WebkitMaskImage: 'linear-gradient(to bottom, black 55%, transparent 100%)',
                  maskImage: 'linear-gradient(to bottom, black 55%, transparent 100%)'
                }}
              >
                <div className="w-full h-full rounded-3xl bg-slate-900 overflow-hidden">
                  <img
                    src={about?.photo || '/perfil.png'}
                    alt="Perfil de Yuri"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 glass px-4 py-2 rounded-2xl flex items-center gap-2 shadow-xl">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-medium text-white">Disponible ahora</span>
              </div>
            </div>
          </div>

          {/* Text side */}
          <div>
            <div
              className="text-slate-400 leading-relaxed mb-5"
              dangerouslySetInnerHTML={{ __html: about?.description || '' }}
            />
            <div className="text-slate-400 leading-relaxed mb-8">
              {/* Si hay más párrafos, se manejan desde el WYSIWYG */}
            </div>
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="glass rounded-2xl p-4 hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-1 group"
                >
                  <Icon size={20} className="text-indigo-400 mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-sm text-slate-300 font-medium">{value}</div>
                  <div className="text-xs text-slate-500">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}