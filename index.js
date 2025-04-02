const express = require('express');
const app = express();
const routes = require('./routes');
const cors = require('cors');

// Dynamic CORS configuration
const allowedOrigins = [
  'http://localhost:5173', // Local development
  'https://short-link-t9t9.onrender.com', // Deployed frontend (adjust to your actual frontend URL)
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl) or if origin is in allowed list
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());
app.use('/api', routes);


// Basic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`App running on port ${PORT}`));