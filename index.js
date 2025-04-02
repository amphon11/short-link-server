const express = require('express');
const app = express();
const routes = require('./routes');

const cors = require('cors');

// ตั้งค่า CORS
app.use(cors({
  origin: 'http://localhost:5173', // อนุญาตเฉพาะ origin นี้
  methods: ['GET', 'POST'], // อนุญาต method ที่ใช้
  allowedHeaders: ['Content-Type'], // อนุญาต header ที่ใช้
}));

app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`App running on port ${PORT}`));

