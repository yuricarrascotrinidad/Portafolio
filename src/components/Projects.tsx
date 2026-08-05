// ─── Projects Section ─────────────────────────────────────────────────────────
import { ExternalLink, GitBranch, Tag } from 'lucide-react'

type Project = {
  title: string
  description: string
  tags: string[]
  gradient: string
  github?: string
  demo?: string
}

const PROJECTS: Project[] = [
  {
    title: 'Academia Pre',
    description:
      'Plataforma de gestión academica con Laravel, Javascript Ajax, Html,Css,Sql Server.',
    tags: ['Laravel', 'Javascript', 'Ajax', 'Html', 'Css', 'Sql Server'],
    gradient: 'from-indigo-500 to-violet-600',

  },
  {
    title: 'Tienda Online',
    description:
      'Plataforma de comercio electrónico completa con PHP, Mysql y panel de administración.',
    tags: ['PHP', 'Mysql', 'Html', 'Css', 'Javascrip'],
    gradient: 'from-cyan-500 to-blue-600',

  },
  {
    title: 'Florería Dulce Encanto',
    description:
      'Plataforma de comercio electrónico completa con React, Nodejs, Mysql y panel de administración.',
    tags: ['React', 'Nodejs', 'Mysql', 'Html', 'Css', 'Javascrip'],
    gradient: 'from-violet-500 to-pink-600',
    github: '#',
    demo: 'https://dulce-encanto.netlify.app/',
  },
  {
    title: 'Monitoreo Soc',
    description:
      'Sisrtema de monitorio realizado con Flask, python Postresql, redis, Html, Css, Javascrip. Muestra las alarmas, acceso a camaras de videovigilancia y controlos PTZ',
    tags: ['Flask', 'Python', 'Postgresql', 'Javascrip', 'Html', 'Css'],
    gradient: 'from-orange-500 to-rose-600',
    github: '#',
    demo: '#',
  },
  {
    title: 'Residencia Grow',
    description:
      'Sistema de gestión para residencias con control de pagos, usuarios, inventario y módulo de lavandería.',
    tags: ['Next.js', 'Prisma', 'NextAuth', 'PostgreSQL'],
    gradient: 'from-emerald-500 to-teal-600',
    demo: 'https://grow-residencial.com/',
  },

  /* {
     title: 'Audio Transcriber',
     description:
       'Aplicación de transcripción de audio en tiempo real usando Python + Whisper con interfaz web React.',
     tags: ['Python', 'Whisper', 'FastAPI', 'React'],
     gradient: 'from-pink-500 to-rose-600',
     github: '#',
   },*/
]

export default function Projects() {
  return (
    <section id="projects" className="py-28 px-6 relative">
      <div className="absolute right-1/4 bottom-0 w-80 h-80 bg-cyan-700/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-3">
            — Proyectos
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold text-white"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Trabajo <span className="gradient-text">destacado</span>
          </h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">
            Una selección de proyectos que demuestran mis habilidades técnicas y creatividad.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project) => (
            <article
              key={project.title}
              className="glass rounded-2xl overflow-hidden group hover:-translate-y-2 transition-all duration-400 hover:shadow-xl hover:shadow-indigo-500/10 flex flex-col"
            >
              {/* Project image / gradient header */}
              <div className={`h-36 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.1)_10px,rgba(0,0,0,0.1)_20px)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="text-2xl font-bold text-white/80"
                    style={{ fontFamily: 'Space Grotesk' }}
                  >
                    {project.title.split(' ')[0]}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-white font-semibold text-lg mb-2" style={{ fontFamily: 'Space Grotesk' }}>
                  {project.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-1">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 text-slate-400 text-xs font-medium"
                    >
                      <Tag size={10} />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      <GitBranch size={14} /> Código
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      <ExternalLink size={14} /> Demo
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
