// ─── Skills Section ──────────────────────────────────────────────────────────
import { useState } from 'react'
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiVite,
  SiWebpack,
  SiNodedotjs,
  SiPython,
  SiPostgresql,
  SiPrisma,
  SiGit,
  SiGithub,
  SiDocker,
  SiLinux,
  SiFigma,
  SiJavascript,
  SiCplusplus,
  SiPhp,
  SiLaravel,
  SiAngular,
  SiDjango,
  SiFlask,
  SiMysql,
  SiRedis,
  SiSqlite,
  SiBootstrap,
  SiLivewire,
  SiGo,
} from 'react-icons/si'
import { FaJava, FaProjectDiagram, FaCogs, FaChartBar } from 'react-icons/fa'
import { DiMaterializecss } from 'react-icons/di'

type Skill = {
  name: string
  level: number
  color: string
  icon: React.ComponentType<{ className?: string }> | null
  isDivider?: boolean
}
type Category = { label: string; skills: Skill[] }

const CATEGORIES: Category[] = [
  {
    label: 'Frontend',
    skills: [
      { name: 'JavaScript', level: 50, color: '#f7df1e', icon: SiJavascript },
      { name: 'TypeScript', level: 30, color: '#3178c6', icon: SiTypescript },
      { name: 'divider-1', level: 0, color: '', icon: null, isDivider: true },
      { name: 'React', level: 50, color: '#61dafb', icon: SiReact },
      { name: 'Next.js', level: 50, color: '#ffffff', icon: SiNextdotjs },
      { name: 'Angular', level: 30, color: '#dd0031', icon: SiAngular },
      { name: 'Tailwind', level: 60, color: '#38bdf8', icon: SiTailwindcss },
      { name: 'Bootstrap', level: 70, color: '#7952B3', icon: SiBootstrap },
      { name: 'Materialize', level: 70, color: '#EE6E73', icon: DiMaterializecss },
      { name: 'Vite', level: 40, color: '#bd34fe', icon: SiVite },
      //{ name: 'Webpack', level: 75, color: '#8dd6f9', icon: SiWebpack },
    ],
  },
  {
    label: 'Backend',
    skills: [
      { name: 'Node.js', level: 40, color: '#68a063', icon: SiNodedotjs },
      { name: 'PHP', level: 60, color: '#777bb4', icon: SiPhp },
      { name: 'Java', level: 30, color: '#f89820', icon: FaJava },
      { name: 'C++', level: 40, color: '#00599C', icon: SiCplusplus },
      { name: 'Python', level: 75, color: '#ffd343', icon: SiPython },
      //{ name: 'Go', level: 70, color: '#00ADD8', icon: SiGo },
      { name: 'divider-2', level: 0, color: '', icon: null, isDivider: true },
      { name: 'Laravel', level: 70, color: '#ff2d20', icon: SiLaravel },
      { name: 'Django', level: 60, color: '#092e20', icon: SiDjango },
      { name: 'Flask', level: 75, color: '#ffffff', icon: SiFlask },
      { name: 'Livewire', level: 60, color: '#FB70A9', icon: SiLivewire },
      { name: 'PostgreSQL', level: 70, color: '#336791', icon: SiPostgresql },
      { name: 'MySQL', level: 70, color: '#4479A1', icon: SiMysql },
      { name: 'SQLite', level: 60, color: '#003B57', icon: SiSqlite },
      { name: 'Redis', level: 50, color: '#DC382D', icon: SiRedis },
      { name: 'Prisma', level: 50, color: '#5a67d8', icon: SiPrisma },
    ],
  },
  {
    label: 'DevOps & Tools',
    skills: [
      //{ name: 'Git', level: 70, color: '#f05032', icon: SiGit },
      { name: 'GitHub', level: 70, color: '#ffffff', icon: SiGithub },
      //{ name: 'Docker', level: 72, color: '#2496ed', icon: SiDocker },
      { name: 'Linux', level: 35, color: '#fcc624', icon: SiLinux },
      { name: 'Figma', level: 70, color: '#f24e1e', icon: SiFigma },
      { name: 'Bizagi', level: 75, color: '#00539A', icon: FaProjectDiagram },
      { name: 'Promodel', level: 70, color: '#00A651', icon: FaCogs },
      { name: 'Power BI', level: 60, color: '#F2C811', icon: FaChartBar },
    ],
  },
]

export default function Skills() {
  const [active, setActive] = useState(0)

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
            Mi <span className="gradient-text">stack tecnológico</span>
          </h2>
        </div>

        {/* Category tabs */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {CATEGORIES.map((cat, i) => (
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

        {/* Skills grid - cuadraditos independientes */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {CATEGORIES[active].skills.map((skill, index) => {
            if (skill.isDivider) {
              return <div key={`divider-${index}`} className="col-span-full h-px bg-slate-700/50 my-2" />
            }

            const Icon = skill.icon!
            return (
              <div
                key={skill.name}
                className="glass rounded-2xl p-4 text-center hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 group cursor-default"
              >
                {/* Icono */}
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

                {/* Nombre */}
                <p className="text-xs font-medium text-slate-300 mb-1 truncate">
                  {skill.name}
                </p>

                {/* Nivel */}
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