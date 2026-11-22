import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import pino from 'pino-http';

const logger = pino();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger);

// GET /notes
app.get('/notes', (req, res) => {
  res.json({ message: 'Retrieved all notes' });
});

// GET /notes/:noteId
app.get('/notes/:noteId', (req, res) => {
  const { noteId } = req.params;

  res.json({ message: `Retrieved note with ID: ${noteId}` });
});

// GET /test-error
app.get('/test-error', (req, res, next) => {
  next(new Error('Simulated server error'));
});

// 404 Middleware
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
  });
});

// Error Middleware
app.use((err, req, res, _next) => {
  console.error(err);

  res.status(500).json({
    message: 'Something went wrong',
  });
});

// Start server
const PORT = process.env.PORT ?? 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
