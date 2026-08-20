// context/ContentContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { api } from '../services/api';

// Tipos de contenido
export interface HeroContent {
    title: string;
    subtitle: string;
    description: string;
    photo: string;
    available: boolean;
    cvUrl: string;
    cvType: 'url' | 'pdf' | 'image' | 'word' | 'drive';  // NUEVO
    cvLabel: string;  // NUEVO
    socialLinks: {
        linkedin: string;
        github: string;
        twitter: string;
    };
}

export interface AboutContent {
    title: string;
    description: string;
    photo: string;
    stats: {
        degree: string;
        university: string;
        location: string;
        availability: string;
    };
}

export interface SkillItem {
    name: string;
    level: number;
    color: string;
    icon: string;
}

export interface SkillCategory {
    label: string;
    skills: SkillItem[];
}

export interface SkillsContent {
    title: string;
    categories: SkillCategory[];
}

export interface ProjectContent {
    id: string;
    title: string;
    description: string;
    tags: string[];
    gradient: string;
    github: string;
    demo: string;
    images: string[];
}

export interface ContactContent {
    title: string;
    subtitle: string;
    email: string;
    phone: string;
    whatsapp: string;
    location: string;
}

interface ContentData {
    hero: HeroContent;
    about: AboutContent;
    skills: SkillsContent;
    projects: ProjectContent[];
    contact: ContactContent;
}

interface ContentContextType {
    content: ContentData | null;
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
    updateSection: <T>(section: keyof ContentData, data: T) => Promise<void>;
}

const defaultContent: ContentData = {
    hero: {
        title: 'Hola, soy Yuri Carrasco',
        subtitle: 'Full Stack Developer',
        description: 'Creo experiencias digitales que combinan diseño elegante con código limpio. Apasionado por construir productos que marquen la diferencia.',
        photo: '/carnet.png',
        available: true,
        socialLinks: {
            linkedin: 'https://www.linkedin.com/in/yuri-carrasco-t',
            github: 'https://github.com',
            twitter: 'https://twitter.com'
        },
        cvUrl: '#',
        cvType: 'url' as const,
        cvLabel: 'Descargar CV',
    },
    about: {
        title: 'Mi historia',
        description: 'Soy un <strong>Ingeniero de Sistemas y Desarrollador Full Stack</strong> apasionado por crear ecosistemas digitales modernos y escalables. Cuento con experiencia liderando arquitecturas robustas, automatización de procesos y modelado de bases de datos eficientes.<br/><br/>Me enfoco en escribir código limpio, optimizar el rendimiento y aplicar metodologías ágiles. Combino habilidades técnicas y de gestión para entregar soluciones integrales de alto valor.',
        photo: '/perfil.png',
        stats: {
            degree: 'Bachiller en Ingeniería de Sistemas',
            university: 'Universidad nacional José Maria Arguedas',
            location: 'Lima/Perú',
            availability: 'Remoto/Presencial'
        }
    },
    skills: {
        title: 'Mi stack tecnológico',
        categories: [
            {
                label: 'Frontend',
                skills: [
                    { name: 'JavaScript', level: 50, color: '#f7df1e', icon: 'SiJavascript' },
                    { name: 'TypeScript', level: 30, color: '#3178c6', icon: 'SiTypescript' },
                    { name: 'React', level: 50, color: '#61dafb', icon: 'SiReact' },
                    { name: 'Next.js', level: 50, color: '#ffffff', icon: 'SiNextdotjs' },
                    { name: 'Angular', level: 30, color: '#dd0031', icon: 'SiAngular' },
                    { name: 'Tailwind', level: 60, color: '#38bdf8', icon: 'SiTailwindcss' },
                    { name: 'Bootstrap', level: 70, color: '#7952B3', icon: 'SiBootstrap' },
                    { name: 'Materialize', level: 70, color: '#EE6E73', icon: 'DiMaterializecss' },
                    { name: 'Vite', level: 40, color: '#bd34fe', icon: 'SiVite' }
                ]
            },
            {
                label: 'Backend',
                skills: [
                    { name: 'Node.js', level: 40, color: '#68a063', icon: 'SiNodedotjs' },
                    { name: 'PHP', level: 60, color: '#777bb4', icon: 'SiPhp' },
                    { name: 'Java', level: 30, color: '#f89820', icon: 'FaJava' },
                    { name: 'C++', level: 40, color: '#00599C', icon: 'SiCplusplus' },
                    { name: 'Python', level: 75, color: '#ffd343', icon: 'SiPython' },
                    { name: 'Laravel', level: 70, color: '#ff2d20', icon: 'SiLaravel' },
                    { name: 'Django', level: 60, color: '#092e20', icon: 'SiDjango' },
                    { name: 'Flask', level: 75, color: '#ffffff', icon: 'SiFlask' },
                    { name: 'Livewire', level: 60, color: '#FB70A9', icon: 'SiLivewire' },
                    { name: 'PostgreSQL', level: 70, color: '#336791', icon: 'SiPostgresql' },
                    { name: 'MySQL', level: 70, color: '#4479A1', icon: 'SiMysql' },
                    { name: 'SQLite', level: 60, color: '#003B57', icon: 'SiSqlite' },
                    { name: 'Redis', level: 50, color: '#DC382D', icon: 'SiRedis' },
                    { name: 'Prisma', level: 50, color: '#5a67d8', icon: 'SiPrisma' }
                ]
            },
            {
                label: 'DevOps & Tools',
                skills: [
                    { name: 'GitHub', level: 70, color: '#ffffff', icon: 'SiGithub' },
                    { name: 'Linux', level: 35, color: '#fcc624', icon: 'SiLinux' },
                    { name: 'Figma', level: 70, color: '#f24e1e', icon: 'SiFigma' },
                    { name: 'Bizagi', level: 75, color: '#00539A', icon: 'FaProjectDiagram' },
                    { name: 'Promodel', level: 70, color: '#00A651', icon: 'FaCogs' },
                    { name: 'Power BI', level: 60, color: '#F2C811', icon: 'FaChartBar' }
                ]
            }
        ]
    },
    projects: [
        {
            id: '1',
            title: 'Residencia Grow',
            description: 'Plataforma inmobiliaria multi-rol responsiva con lógica para contratos de coliving, pasarela de pagos y marketplace interno.',
            tags: ['Next.js', 'TypeScript', 'Prisma', 'NextAuth', 'PostgreSQL'],
            gradient: 'from-emerald-500 to-teal-600',
            github: '',
            demo: 'https://grow-residencial.com/',
            images: ['/project/grow/imagen_1.png', '/project/grow/imagen_2.png', '/project/grow/imagen_3.png']
        },
        {
            id: '2',
            title: 'Monitoreo Soc',
            description: 'Ecosistema web de seguridad para la centralización de telemetría, automatización de alertas críticas y control PTZ.',
            tags: ['Flask', 'Python', 'PostgreSQL', 'JavaScript', 'HTML', 'CSS'],
            gradient: 'from-orange-500 to-rose-600',
            github: '#',
            demo: '#',
            images: []
        },
        {
            id: '3',
            title: 'Tienda Online',
            description: 'E-commerce intuitivo con arquitectura enfocada en el usuario y sistema integrado para el control de inventarios en tiempo real.',
            tags: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
            gradient: 'from-cyan-500 to-blue-600',
            github: '',
            demo: '',
            images: []
        },
        {
            id: '4',
            title: 'Academia Pre',
            description: 'Sistema de gestión administrativa y seguimiento estudiantil que optimizó un 50% la eficiencia operativa.',
            tags: ['Laravel', 'JavaScript', 'Ajax', 'HTML', 'CSS', 'SQL Server', 'Figma', 'Bootstrap', 'PHP'],
            gradient: 'from-indigo-500 to-violet-600',
            github: '',
            demo: '',
            images: []
        }
    ],
    contact: {
        title: 'Hablemos juntos',
        subtitle: '¿Tienes un proyecto en mente? Estoy disponible para trabajar en nuevas ideas y colaboraciones.',
        email: 'carrascoyuri841@gmail.com',
        phone: '+51 989 766 318',
        whatsapp: '+51 989 766 318',
        location: 'Perú (Remoto/Presencial)'
    }
};

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
    const [content, setContent] = useState<ContentData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadContent = async () => {
        try {
            setLoading(true);
            const data = await api.getContent();
            // Si no hay datos en la API, usar defaults
            if (Object.keys(data).length === 0) {
                setContent(defaultContent);
            } else {
                setContent({
                    hero: data.hero || defaultContent.hero,
                    about: data.about || defaultContent.about,
                    skills: data.skills || defaultContent.skills,
                    projects: data.projects || defaultContent.projects,
                    contact: data.contact || defaultContent.contact
                });
            }
            setError(null);
        } catch (err) {
            console.error('Error loading content:', err);
            setContent(defaultContent);
            setError('Error al cargar el contenido');
        } finally {
            setLoading(false);
        }
    };

    const updateSection = async <T,>(section: keyof ContentData, data: T) => {
        if (!content) return;

        // Actualizar localmente
        setContent({ ...content, [section]: data });

        // Guardar en el backend
        const token = localStorage.getItem('adminToken');
        if (token) {
            try {
                await api.saveSection(section, data, token);
            } catch (err) {
                console.error('Error saving section:', err);
                // Revertir si falla
                await loadContent();
            }
        }
    };

    const refresh = loadContent;

    useEffect(() => {
        loadContent();
    }, []);

    return (
        <ContentContext.Provider value={{ content, loading, error, refresh, updateSection }}>
            {children}
        </ContentContext.Provider>
    );
}

export function useContent() {
    const context = useContext(ContentContext);
    if (!context) {
        throw new Error('useContent must be used within ContentProvider');
    }
    return context;
}