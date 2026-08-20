// ─── Skills Section ──────────────────────────────────────────────────────────
import { useState } from 'react'
import { useContent } from '../context/ContentContext'

// Mapa de iconos (importados dinámicamente)
import * as Icons from 'react-icons/si'
import * as FaIcons from 'react-icons/fa'
import { DiMaterializecss } from 'react-icons/di'

const iconMap: Record<string, any> = {
  ...Icons,
  ...FaIcons,
  DiMaterializecss
}

export default function Skills() {
  const { content, loading } = useContent()
  const skills = content?.skills
  const [active, setActive] = useState(0)

  if (loading) {
    return (
      <section id="skills" className="py-28 px-6 relative">
        <div className="max-w-4xl mx-auto flex justify-center">
          <div className="w-8 h-8 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
        </div>
      </section>
    )
  }

  const categories = skills?.categories || []

  return (
    <section id="skills" className="py-28 px-6 relative">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-700/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">
            — Habilidades
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-white"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {skills?.title || 'Mi stack tecnológico'}
          </h2>
        </div>

        {/* Category tabs */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {categories.map((cat, i) => (
            <button
              key={cat.label}
              onClick={() => setActive(i)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${active === i
                  ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/30'
                  : 'glass text-slate-400 hover:text-white'
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories[active]?.skills.map((skill) => {
            const Icon = iconMap[skill.icon] || Icons.SiJavascript

            return (
              <div
                key={skill.name}
                className="glass rounded-2xl p-4 text-center hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 group cursor-default"
              >
                <div
                  className="w-14 h-14 mx-auto rounded-xl flex items-center justify-center mb-3 transition-all duration-300 group-hover:rotate-6"
                  style={{
                    background: `linear-gradient(135deg, ${skill.color}20, ${skill.color}10)`,
                    border: `1px solid ${skill.color}30`
                  }}
                >
                  <Icon
                    className="text-3xl transition-all duration-300 group-hover:scale-110"
                    style={{ color: skill.color }}
                  />
                </div>

                <p className="text-xs font-medium text-slate-300 mb-1 truncate">
                  {skill.name}
                </p>

                <div className="flex items-center justify-center gap-1">
                  <div className="h-1.5 w-12 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${skill.level}%`,
                        background: `linear-gradient(90deg, ${skill.color}99, ${skill.color})`,
                      }}
                    />
                  </div>
                  <span className="text-[10px] font-bold" style={{ color: skill.color }}>
                    {skill.level}%
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}