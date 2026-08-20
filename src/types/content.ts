// types/content.ts
export interface HeroContent {
    title: string;           // "Hola, soy Yuri Carrasco"
    subtitle: string;        // "Full Stack Developer"
    description: string;     // WYSIWYG: "Creo experiencias digitales..."
    photo: string;           // URL de la imagen
    available: boolean;
    socialLinks: {
        linkedin: string;
        github: string;
        twitter: string;
    };
    cvUrl: string;          // URL del CV
}

export interface AboutContent {
    title: string;           // "Mi historia"
    description: string;     // WYSIWYG: Biografía completa
    stats: {
        degree: string;
        university: string;
        location: string;
        availability: string;
    };
    photo: string;
}

export interface SkillsContent {
    title: string;
    categories: {
        name: string;
        skills: {
            name: string;
            level: number;
            color: string;
            icon: string;      // Nombre del icono (ej: "SiReact")
        }[];
    }[];
}

export interface ProjectContent {
    id: string;
    title: string;
    description: string;    // WYSIWYG
    tags: string[];
    gradient: string;
    github: string;
    demo: string;
    images: string[];       // URLs de imágenes
}

export interface ContactContent {
    title: string;
    subtitle: string;
    email: string;
    phone: string;
    whatsapp: string;
    location: string;
}