require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const notesRouter = require('./routes/notes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const clientUrl = process.env.CLIENT_URL ? process.env.CLIENT_URL.replace(/\/$/, '') : 'http://localhost:5173';
app.use(cors({ origin: clientUrl }));
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/notes', notesRouter);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Note App API with Authentication' });
});

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('MongoDB connection error:', err));