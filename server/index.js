const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Habilitar CORS
app.use(cors());

// Rota de exemplo
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});