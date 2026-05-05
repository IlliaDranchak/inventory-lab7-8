import express from 'express';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Створюємо папку uploads якщо немає
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Налаштування multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Зчитуємо дані з db.json
let db = { inventory: [] };
try {
  const dbPath = path.join(__dirname, 'db.json');
  const data = fs.readFileSync(dbPath, 'utf8');
  db = JSON.parse(data);
  console.log('✅ Data loaded from db.json');
} catch (err) {
  console.log('⚠️  Using empty inventory (db.json not found)');
}

// Збереження в db.json
const saveDb = () => {
  const dbPath = path.join(__dirname, 'db.json');
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
};

// GET /inventory
app.get('/inventory', (req, res) => {
  res.json(db.inventory);
});

// GET /inventory/:id
app.get('/inventory/:id', (req, res) => {
  const item = db.inventory.find(i => i.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

// POST /register
app.post('/register', upload.single('photo'), (req, res) => {
  const { inventory_name, description } = req.body;
  const newItem = {
    id: Date.now().toString(),
    inventory_name,
    description: description || '',
    photo_url: req.file ? `/uploads/${req.file.filename}` : null
  };
  db.inventory.push(newItem);
  saveDb();
  res.status(201).json(newItem);
});

// PUT /inventory/:id
app.put('/inventory/:id', (req, res) => {
  const { inventory_name, description } = req.body;
  const index = db.inventory.findIndex(i => i.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  
  if (inventory_name) db.inventory[index].inventory_name = inventory_name;
  if (description !== undefined) db.inventory[index].description = description;
  
  saveDb();
  res.json(db.inventory[index]);
});

// PUT /inventory/:id/photo
app.put('/inventory/:id/photo', upload.single('photo'), (req, res) => {
  const index = db.inventory.findIndex(i => i.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  
  if (req.file) {
    db.inventory[index].photo_url = `/uploads/${req.file.filename}`;
    saveDb();
  }
  res.json(db.inventory[index]);
});

// DELETE /inventory/:id
app.delete('/inventory/:id', (req, res) => {
  const index = db.inventory.findIndex(i => i.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  
  db.inventory.splice(index, 1);
  saveDb();
  res.json({ message: 'Deleted' });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📦 Total items: ${db.inventory.length}`);
});