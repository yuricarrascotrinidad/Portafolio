// ─── Hero Section ─────────────────────────────────────────────────────────────
import { useEffect, useState } from 'react'
import { ArrowDown, GitBranch, Link2, AtSign, Download } from 'lucide-react'

const ROLES = ['Full Stack Developer', 'UI/UX Designer', 'React Specialist', 'Open Source Contributor']
const PHOTO_RADIUS = 200

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    const current = ROLES[roleIndex]
    let timer: ReturnType<typeof setTimeout>
    if (!deleting && charIndex < current.length) {
      timer = setTimeout(() => { setDisplayed(current.slice(0, charIndex + 1)); setCharIndex(c => c + 1) }, 80)
    } else if (!deleting && charIndex === current.length) {
      timer = setTimeout(() => setDeleting(true), 2200)
    } else if (deleting && charIndex > 0) {
      timer = setTimeout(() => { setDisplayed(current.slice(0, charIndex - 1)); setCharIndex(c => c - 1) }, 40)
    } else {
      setDeleting(false)
      setRoleIndex(i => (i + 1) % ROLES.length)
    }
    return () => clearTimeout(timer)
  }, [charIndex, deleting, roleIndex])

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-violet-600/8 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: 'linear-gradient(rgba(99,102,241,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.5) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
      </div>

      <div className="max-w-6xl mx-auto w-full px-8 pt-24 pb-16 grid md:grid-cols-2 gap-16 lg:gap-24 items-center">

        {/* ── LEFT: Photo + glow ── */}
        <div className="flex justify-center order-2 md:order-1">
          <div className="relative flex items-center justify-center">

            {/* Diffused blue glow — sits behind the photo */}
            <div className="absolute rounded-full photo-glow" style={{ width: PHOTO_RADIUS * 2 + 100, height: PHOTO_RADIUS * 2 + 100 }} />

            {/* Photo */}
            <div
              className="relative rounded-full overflow-hidden z-10 photo-border-glow"
              style={{
                width: PHOTO_RADIUS * 2,
                height: PHOTO_RADIUS * 2,
              }}
            >
              <img
                src="/carnet.png"
                alt="Yuri Carrasco"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>

        {/* ── RIGHT: Text ── */}
        <div className="order-1 md:order-2 flex flex-col gap-5 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-indigo-400 font-medium animate-fade-in-up self-center md:self-start">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Disponible para trabajar
          </div>

          <h1
            className="text-4xl md:text-6xl font-extrabold tracking-tight animate-fade-in-up theme-text-primary leading-tight"
            style={{ fontFamily: 'Space Grotesk, sans-serif', animationDelay: '0.1s', opacity: 0 }}
          >
            Hola, soy{' '}
            <span className="gradient-text">Yuri Carrasco</span>
          </h1>

          <p className="text-xl md:text-2xl font-medium h-8 animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
            <span className="text-indigo-400">{displayed}</span>
            <span className="animate-blink text-indigo-300">|</span>
          </p>

          <p className="theme-text-muted max-w-md leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
            Creo experiencias digitales que combinan diseño elegante con código limpio.
            Apasionado por construir productos que marquen la diferencia.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up justify-center md:justify-start" style={{ animationDelay: '0.4s', opacity: 0 }}>
            <a href="#projects" className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold hover:from-indigo-400 hover:to-violet-500 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-1 text-center">
              Ver proyectos
            </a>
            <a href="#" className="px-8 py-3.5 rounded-2xl glass font-semibold theme-text-secondary hover:text-white transition-all duration-300 flex items-center gap-2 justify-center">
              <Download size={16} />Descargar CV
            </a>
          </div>

          <div className="flex items-center gap-3 animate-fade-in-up justify-center md:justify-start" style={{ animationDelay: '0.5s', opacity: 0 }}>
            {[
              { icon: GitBranch, href: 'https://github.com', label: 'GitHub' },
              { icon: Link2, href: 'https://linkedin.com', label: 'LinkedIn' },
              { icon: AtSign, href: 'https://twitter.com', label: 'Twitter' },
            ].map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                className="w-11 h-11 rounded-xl glass flex items-center justify-center theme-text-muted hover:text-indigo-400 hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-1">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
        <span className="text-xs tracking-widest uppercase theme-text-muted">Scroll</span>
        <ArrowDown size={14} className="animate-bounce theme-text-muted" />
      </div>
    </section>
  )
}
