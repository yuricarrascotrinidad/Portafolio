// ─── About Section ───────────────────────────────────────────────────────────
import { User, MapPin, Briefcase, Coffee } from 'lucide-react'

const stats = [
  { icon: Briefcase, value: '1+', label: 'Años de experiencia' },
  { icon: Coffee, value: '4+', label: 'Proyectos completados' },
  { icon: User, value: '4+', label: 'Clientes satisfechos' },
  { icon: MapPin, value: 'Remoto/Presencial', label: 'Disponibilidad' },
]

export default function About() {
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
            Mi <span className="gradient-text">historia</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-14 items-center">
          {/* Avatar / visual side */}
          <div className="relative flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 rounded-3xl bg-gradient-to-br from-indigo-500 via-violet-600 to-cyan-500 p-1 animate-pulse-glow">
                <div className="w-full h-full rounded-3xl bg-slate-900 flex items-center justify-center overflow-hidden">
                  {/* Replace with real photo */}
                  <div className="w-full h-full bg-gradient-to-br from-indigo-900/60 to-violet-900/60 flex items-center justify-center">
                    <User size={80} className="text-indigo-400/60" />
                  </div>
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
            <p className="text-slate-400 leading-relaxed mb-5">
              Soy un desarrollador full stack apasionado por crear soluciones digitales
              modernas y escalables. Con más de 3 años de experiencia, me especializo en
              construir aplicaciones web con tecnologías de vanguardia como{' '}
              <span className="text-indigo-400 font-medium">React, TypeScript y Node.js</span>.
            </p>
            <p className="text-slate-400 leading-relaxed mb-8">
              Me enfoco en escribir código limpio, crear interfaces intuitivas y optimizar
              el rendimiento de las aplicaciones. Siempre estoy aprendiendo nuevas
              tecnologías para entregar las mejores soluciones a mis clientes.
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="glass rounded-2xl p-4 hover:border-indigo-500/30 transition-all duration-300 hover:-translate-y-1 group"
                >
                  <Icon size={20} className="text-indigo-400 mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>{value}</div>
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
