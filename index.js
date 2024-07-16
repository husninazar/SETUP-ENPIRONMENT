// Import dependencies
const express = require('express');
const app = express();
const port = 3000;

// Middleware untuk parsing JSON dan logging
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});

// Data sementara untuk simulasi database
let resources = [];

// GET method - Mengambil semua resource
app.get('/api/resources', (req, res) => {
  res.status(200).json(resources);
});

// POST method - Menambahkan resource baru
app.post('/api/resources', (req, res) => {
  const { name, value } = req.body;
  if (!name || !value) {
    return res.status(400).send('Name and value are required');
  }
  const newResource = { id: resources.length + 1, name, value };
  resources.push(newResource);
  res.status(201).json(newResource);
});

// PUT method - Memperbarui resource yang ada
app.put('/api/resources/:id', (req, res) => {
  const { id } = req.params;
  const { name, value } = req.body;
  const resource = resources.find(r => r.id == id);
  
  if (!resource) {
    return res.status(404).send('Resource not found');
  }

  if (!name || !value) {
    return res.status(400).send('Name and value are required');
  }

  resource.name = name;
  resource.value = value;
  res.status(200).json(resource);
});

// DELETE method - Menghapus resource
app.delete('/api/resources/:id', (req, res) => {
  const { id } = req.params;
  const resourceIndex = resources.findIndex(r => r.id == id);
  
  if (resourceIndex === -1) {
    return res.status(404).send('Resource not found');
  }

  resources.splice(resourceIndex, 1);
  res.status(204).send();
});

// PATCH method - Memperbarui sebagian dari resource
app.patch('/api/resources/:id', (req, res) => {
  const { id } = req.params;
  const { name, value } = req.body;
  const resource = resources.find(r => r.id == id);
  
  if (!resource) {
    return res.status(404).send('Resource not found');
  }

  if (name) resource.name = name;
  if (value) resource.value = value;

  res.status(200).json(resource);
});

// HEAD method - Memeriksa keberadaan endpoint
app.head('/api/resources', (req, res) => {
  res.status(200).end();
});

// Menjalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
