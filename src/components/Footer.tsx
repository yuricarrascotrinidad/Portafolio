// ─── Footer ──────────────────────────────────────────────────────────────────
import { GitBranch, Link2, AtSign, Heart, Code2 } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
            <Code2 size={14} className="text-white" />
          </div>
          <span className="text-slate-400 text-sm">
            © {new Date().getFullYear()}{' '}
            <span className="text-white font-medium">Yuri Carrasco</span>. Todos los derechos reservados.
          </span>
        </div>

        <p className="text-slate-600 text-xs flex items-center gap-1">
          Hecho con <Heart size={11} className="text-rose-400 fill-rose-400" /> y mucho café
        </p>

        <div className="flex items-center gap-3">
          {[
            { icon: GitBranch, href: 'https://github.com', label: 'GitHub' },
            { icon: Link2, href: 'https://linkedin.com', label: 'LinkedIn' },
            { icon: AtSign, href: 'https://twitter.com', label: 'Twitter' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-8 h-8 rounded-lg glass flex items-center justify-center text-slate-500 hover:text-indigo-400 transition-all duration-300 hover:-translate-y-0.5"
            >
              <Icon size={15} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
