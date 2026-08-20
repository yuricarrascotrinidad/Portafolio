// services/api.ts
const API_URL = 'http://localhost:3001/api';

export const api = {
    // Auth
    login: async (email: string, password: string) => {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        if (!res.ok) throw new Error('Login failed');
        return res.json();
    },

    verify: async (token: string) => {
        const res = await fetch(`${API_URL}/auth/verify`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return res.json();
    },

    // Content
    getContent: async () => {
        const res = await fetch(`${API_URL}/content`);
        return res.json();
    },

    getSection: async (section: string) => {
        const res = await fetch(`${API_URL}/content/${section}`);
        if (!res.ok) throw new Error('Section not found');
        return res.json();
    },

    saveSection: async (section: string, data: any, token: string) => {
        const res = await fetch(`${API_URL}/content/${section}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('Failed to save');
        return res.json();
    },

    // Upload image - AHORA CON SECCION Y SUBCARPETA EN QUERY
    uploadImage: async (file: File, token: string, section: string = 'general', subfolder: string = '') => {
        const formData = new FormData();
        formData.append('image', file);

        // Enviar section y subfolder como query params tambien
        let url = `${API_URL}/upload?section=${encodeURIComponent(section)}`;
        if (subfolder) {
            url += `&subfolder=${encodeURIComponent(subfolder)}`;
        }

        console.log('Subiendo a URL:', url);
        console.log('Section:', section);
        console.log('Subfolder:', subfolder || '(ninguna)');

        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });
        if (!res.ok) throw new Error('Upload failed');
        return res.json();
    },

    // Delete image
    deleteImage: async (section: string, filename: string, token: string) => {
        const res = await fetch(`${API_URL}/upload/${section}/${filename}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!res.ok) throw new Error('Delete failed');
        return res.json();
    },

    // List images by section
    listImages: async (section: string, token: string) => {
        const res = await fetch(`${API_URL}/uploads/${section}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.json();
    }
};