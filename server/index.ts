import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize SQLite database
const dbPath = path.join(__dirname, 'portfolio.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to SQLite:', err.message);
  } else {
    console.log('Connected to SQLite database.');
    
    // Create tables if they don't exist
    db.run(`
      CREATE TABLE IF NOT EXISTS content (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        section TEXT UNIQUE,
        data TEXT
      )
    `);
  }
});

// Routes
app.get('/api/content/:section', (req, res) => {
  const { section } = req.params;
  db.get('SELECT data FROM content WHERE section = ?', [section], (err, row: any) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (row) {
      res.json(JSON.parse(row.data));
    } else {
      res.status(404).json({ error: 'Section not found' });
    }
  });
});

app.post('/api/content/:section', (req, res) => {
  const { section } = req.params;
  const data = JSON.stringify(req.body);
  
  db.run(
    'INSERT INTO content (section, data) VALUES (?, ?) ON CONFLICT(section) DO UPDATE SET data = excluded.data',
    [section, data],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: 'Success', section });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
