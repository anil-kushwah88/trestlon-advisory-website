import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.js';
import contentRoutes from './routes/content.js';
import reviewRoutes from './routes/reviews.js';
import contactRoutes from './routes/contact.js';

const app = express();
const PORT = process.env.PORT || 9999;

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://trestlon-advisory-website.vercel.app',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header
      // (health checks, server-to-server requests, etc.)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log('Blocked CORS origin:', origin);
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: '1mb' }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    service: 'trustlon-server',
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/contact', contactRoutes);

// Fallback error handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    message: err.message || 'Server error',
  });
});

// Local development only
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`Trustlon API listening on http://localhost:${PORT}`);
  });
}

export default app;
