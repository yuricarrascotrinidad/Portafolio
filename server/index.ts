// server/index.ts
import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;
const JWT_SECRET = 'tu-secret-key-muy-segura';

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database
const dbPath = path.join(__dirname, 'portfolio.db');
const db = new sqlite3.Database(dbPath);

// Inicializar tablas
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS content (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      section TEXT UNIQUE,
      data TEXT
    )
  `);

  const defaultPassword = bcrypt.hashSync('admin123', 10);
  db.run(
    'INSERT OR IGNORE INTO users (email, password) VALUES (?, ?)',
    ['admin@portafolio.com', defaultPassword]
  );
});

// MULTER: Configuracion para guardar por seccion
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Obtener la seccion del body o del query (prioridad: query > body > default)
    const section = req.query.section || req.body.section || 'general';
    const subfolder = req.query.subfolder || req.body.subfolder || '';

    console.log('Destination - Section:', section);
    console.log('Destination - Subfolder:', subfolder || '(ninguna)');

    // Construir la ruta
    let uploadPath = path.join(__dirname, 'uploads', section);
    if (subfolder) {
      uploadPath = path.join(uploadPath, subfolder);
    }

    // Crear la carpeta si no existe
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    console.log('Guardando en:', uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Limpiar nombre del archivo
    const originalName = file.originalname;
    const ext = path.extname(originalName);
    const nameWithoutExt = path.basename(originalName, ext);

    const cleanName = nameWithoutExt
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9]/g, '_')
      .toLowerCase();

    const filename = `${cleanName}${ext}`;
    console.log('Nombre del archivo:', filename);
    cb(null, filename);
  }
});

// ============================================================
// 🔥 CAMBIO IMPORTANTE: Aumentar límite y aceptar más tipos
// ============================================================
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024  // Aumentado a 10MB para CVs
  },
  fileFilter: (req, file, cb) => {
    const allowed = [
      // Imágenes
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
      'image/svg+xml',
      // Documentos
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      // Texto
      'text/plain',
      'text/csv'
    ];

    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      console.log('Tipo de archivo no permitido:', file.mimetype);
      cb(new Error(`Tipo de archivo no permitido: ${file.mimetype}`), false);
    }
  }
});

// MIDDLEWARE: Autenticacion
const authenticate = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Token invalido' });
  }
};

// RUTAS

// Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt:', email);

  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user: any) => {
    if (err) {
      console.error('DB Error:', err);
      return res.status(500).json({ error: 'Error interno' });
    }

    if (!user) {
      console.log('User not found:', email);
      return res.status(401).json({ error: 'Credenciales invalidas' });
    }

    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) {
      console.log('Invalid password for:', email);
      return res.status(401).json({ error: 'Credenciales invalidas' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log('Login successful:', email);
    res.json({
      token,
      user: { id: user.id, email: user.email }
    });
  });
});

// Verificar token
app.get('/api/auth/verify', authenticate, (req, res) => {
  res.json({ valid: true, user: req.user });
});

// Obtener todo el contenido
app.get('/api/content', (req, res) => {
  db.all('SELECT section, data FROM content', (err, rows: any[]) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const content: any = {};
    rows.forEach((row) => {
      content[row.section] = JSON.parse(row.data);
    });
    res.json(content);
  });
});

// Obtener una seccion
app.get('/api/content/:section', (req, res) => {
  const { section } = req.params;
  db.get('SELECT data FROM content WHERE section = ?', [section], (err, row: any) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'No encontrado' });
    }
    res.json(JSON.parse(row.data));
  });
});

// Guardar seccion (protegido)
app.post('/api/content/:section', authenticate, (req, res) => {
  const { section } = req.params;
  const data = JSON.stringify(req.body);

  db.run(
    `INSERT INTO content (section, data) VALUES (?, ?)
     ON CONFLICT(section) DO UPDATE SET data = excluded.data`,
    [section, data],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Guardado correctamente', section });
    }
  );
});

// SUBIR IMAGEN (con seccion y subcarpeta desde query o body)
app.post('/api/upload', authenticate, upload.single('image'), (req, res) => {
  // ============================================================
  // 🔥 CAMBIO: Mejor manejo de errores
  // ============================================================
  if (!req.file) {
    console.error('No se recibió ningún archivo');
    return res.status(400).json({ error: 'No se subio ninguna imagen o archivo' });
  }

  // Obtener la seccion y subcarpeta (prioridad: query > body > default)
  const section = req.query.section || req.body.section || 'general';
  const subfolder = req.query.subfolder || req.body.subfolder || '';

  console.log('Upload - Section:', section);
  console.log('Upload - Subfolder:', subfolder || '(ninguna)');
  console.log('Upload - File:', req.file.filename);
  console.log('Upload - Original name:', req.file.originalname);
  console.log('Upload - Mime type:', req.file.mimetype);
  console.log('Upload - Size:', req.file.size);

  // Construir la URL publica
  let url = `/uploads/${section}`;
  if (subfolder) {
    url += `/${subfolder}`;
  }
  url += `/${req.file.filename}`;

  console.log('URL generada:', url);

  res.json({
    url,
    filename: req.file.filename,
    section,
    subfolder,
    originalName: req.file.originalname,
    size: req.file.size
  });
});

// ELIMINAR IMAGEN
app.delete('/api/upload/:section/:filename', authenticate, (req, res) => {
  const { section, filename } = req.params;
  console.log('Eliminando imagen:', section, filename);

  // Buscar en la carpeta de la seccion
  const filepath = path.join(__dirname, 'uploads', section, filename);

  // Tambien buscar en subcarpetas
  const searchInSubfolders = (basePath: string, targetFile: string): string | null => {
    if (!fs.existsSync(basePath)) return null;

    const items = fs.readdirSync(basePath);
    for (const item of items) {
      const itemPath = path.join(basePath, item);
      if (fs.statSync(itemPath).isDirectory()) {
        const result = searchInSubfolders(itemPath, targetFile);
        if (result) return result;
      } else if (item === targetFile) {
        return itemPath;
      }
    }
    return null;
  };

  let fileToDelete = null;
  if (fs.existsSync(filepath)) {
    fileToDelete = filepath;
  } else {
    // Buscar en subcarpetas
    const uploadsPath = path.join(__dirname, 'uploads', section);
    fileToDelete = searchInSubfolders(uploadsPath, filename);
  }

  if (fileToDelete) {
    try {
      fs.unlinkSync(fileToDelete);
      console.log('Imagen eliminada:', fileToDelete);
      res.json({ message: 'Imagen eliminada correctamente' });
    } catch (err) {
      console.error('Error al eliminar:', err);
      res.status(500).json({ error: 'Error al eliminar la imagen' });
    }
  } else {
    console.log('Imagen no encontrada:', filename);
    res.status(404).json({ error: 'Imagen no encontrada' });
  }
});

// LISTAR IMAGENES DE UNA SECCION
app.get('/api/uploads/:section', authenticate, (req, res) => {
  const { section } = req.params;
  const uploadPath = path.join(__dirname, 'uploads', section);

  if (!fs.existsSync(uploadPath)) {
    return res.json({ files: [] });
  }

  const getAllFiles = (dir: string): string[] => {
    const files: string[] = [];
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const itemPath = path.join(dir, item);
      if (fs.statSync(itemPath).isDirectory()) {
        const subFiles = getAllFiles(itemPath);
        files.push(...subFiles);
      } else {
        // Verificar que sea una imagen
        const ext = path.extname(item).toLowerCase();
        if (['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'].includes(ext)) {
          files.push(item);
        }
      }
    }
    return files;
  };

  const files = getAllFiles(uploadPath);
  const baseUrl = `/uploads/${section}`;

  res.json({
    files: files.map(f => ({
      name: f,
      url: `${baseUrl}/${f}`
    }))
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Database: ${dbPath}`);
  console.log(`Admin: admin@portafolio.com / admin123`);
});