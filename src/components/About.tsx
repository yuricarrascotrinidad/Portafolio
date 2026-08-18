// ─── About Section ───────────────────────────────────────────────────────────
import { GraduationCap, School, MapPin, Clock } from 'lucide-react'

const stats = [
  { icon: GraduationCap, value: 'Grado de estudio', label: 'Bachiller en Ingeniería de Sistemas' },
  { icon: School, value: 'Universidad', label: 'Universidad nacional José Maria Arguedas' },
  { icon: MapPin, value: 'Locación', label: 'Lima/Perú' },
  { icon: Clock, value: 'Disponibilidad', label: 'Remoto/Presencial' },
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
                    src="/perfil.png"
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
            <p className="text-slate-400 leading-relaxed mb-5">
              Soy un <span className="text-indigo-400 font-medium">Ingeniero de Sistemas y Desarrollador Full Stack</span> apasionado
              por crear ecosistemas digitales modernos y escalables. Cuento con experiencia liderando
              arquitecturas robustas, automatización de procesos y modelado de bases de datos eficientes.
            </p>
            <p className="text-slate-400 leading-relaxed mb-8">
              Me enfoco en escribir código limpio, optimizar el rendimiento y aplicar metodologías ágiles.
              Combino habilidades técnicas y de gestión para entregar soluciones integrales de alto valor.
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
