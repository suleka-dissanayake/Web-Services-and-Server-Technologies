import express  from 'express';
import mongoose from 'mongoose';

import studentRoutes     from './routes/students.js';
import eventRoutes       from './routes/events.js';
import certificateRoutes from './routes/certificates.js';

const app  = express();
const PORT = 8080;
const MONGO_URI = 'mongodb://127.0.0.1:27017/cert_verification';

// ── Middleware ──────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Routes ──────────────────────────────────────────────────
app.use('/student', studentRoutes);
app.use('/event',   eventRoutes);
app.use('/cert',    certificateRoutes);

// ── 404 handler ─────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error_message: 'Route not found' });
});

// ── DB + Start ───────────────────────────────────────────────
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
