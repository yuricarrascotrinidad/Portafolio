// ─── Projects Section ─────────────────────────────────────────────────────────
import { useState, useEffect } from 'react'
import { ExternalLink, GitBranch, Tag, ChevronLeft, ChevronRight } from 'lucide-react'

type Project = {
  title: string
  description: string
  tags: string[]
  gradient: string
  github?: string
  demo?: string
  imagesFolder?: string
  imagesCount?: number
}

const PROJECTS: Project[] = [
  {
    title: 'Residencia Grow',
    description:
      'Plataforma inmobiliaria multi-rol responsiva con lógica para contratos de coliving, pasarela de pagos y marketplace interno.',
    tags: ['Next.js', 'TypeScript', 'Prisma', 'NextAuth', 'PostgreSQL'],
    gradient: 'from-emerald-500 to-teal-600',
    demo: 'https://grow-residencial.com/',
    imagesFolder: '/project/grow',
    imagesCount: 3
  },
  {
    title: 'Monitoreo Soc',
    description:
      'Ecosistema web de seguridad para la centralización de telemetría, automatización de alertas críticas y control PTZ.',
    tags: ['Flask', 'Python', 'PostgreSQL', 'JavaScript', 'HTML', 'CSS'],
    gradient: 'from-orange-500 to-rose-600',
    github: '#',
    demo: '#',
  },
  {
    title: 'Tienda Online',
    description:
      'E-commerce intuitivo con arquitectura enfocada en el usuario y sistema integrado para el control de inventarios en tiempo real.',
    tags: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    title: 'Academia Pre',
    description:
      'Sistema de gestión administrativa y seguimiento estudiantil que optimizó un 50% la eficiencia operativa.',
    tags: ['Laravel', 'JavaScript', 'Ajax', 'HTML', 'CSS', 'SQL Server', 'Figma', 'Bootstrap', 'PHP'],
    gradient: 'from-indigo-500 to-violet-600',
  },

  /* {
     title: 'Florería Dulce Encanto',
     description:
       'Plataforma de comercio electrónico completa provista de un panel de administración dinámico para la gestión de productos.',
     tags: ['React', 'Node.js', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
     gradient: 'from-violet-500 to-pink-600',
     github: '#',
     demo: 'https://dulce-encanto.netlify.app/',
   },*/
  /* {
     title: 'Audio Transcriber',
     description:
       'Aplicación de transcripción de audio en tiempo real usando Python + Whisper con interfaz web React.',
     tags: ['Python', 'Whisper', 'FastAPI', 'React'],
     gradient: 'from-pink-500 to-rose-600',
     github: '#',
   },*/
]

function ProjectCard({ project }: { project: Project }) {
  const [currentImg, setCurrentImg] = useState(1)
  const hasImages = project.imagesFolder && project.imagesCount && project.imagesCount > 0

  useEffect(() => {
    if (!hasImages || project.imagesCount! <= 1) return
    const interval = setInterval(() => {
      setCurrentImg((prev) => (prev < project.imagesCount! ? prev + 1 : 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [hasImages, project.imagesCount])

  const nextImg = (e: React.MouseEvent) => {
    e.preventDefault()
    setCurrentImg((prev) => (prev < project.imagesCount! ? prev + 1 : 1))
  }
  
  const prevImg = (e: React.MouseEvent) => {
    e.preventDefault()
    setCurrentImg((prev) => (prev > 1 ? prev - 1 : project.imagesCount!))
  }

  return (
    <article className="glass rounded-2xl overflow-hidden group hover:-translate-y-2 transition-all duration-400 hover:shadow-xl hover:shadow-indigo-500/10 flex flex-col">
      {/* Project image / gradient header */}
      <div className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden group/carousel`}>
        {hasImages ? (
          <>
            <img
              src={`${project.imagesFolder}/imagen_${currentImg}.png`}
              alt={`${project.title} - imagen ${currentImg}`}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
            {project.imagesCount! > 1 && (
              <>
                <button
                  onClick={prevImg}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/50 text-white rounded-full opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-black/70"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={nextImg}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/50 text-white rounded-full opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-black/70"
                >
                  <ChevronRight size={16} />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {Array.from({ length: project.imagesCount! }).map((_, i) => (
                    <span
                      key={i}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        i + 1 === currentImg ? 'bg-white w-3' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.1)_10px,rgba(0,0,0,0.1)_20px)]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-white/80" style={{ fontFamily: 'Space Grotesk' }}>
                {project.title.split(' ')[0]}
              </span>
            </div>
          </>
        )}
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
        <div className="flex gap-3 mt-auto">
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
  )
}

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
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
