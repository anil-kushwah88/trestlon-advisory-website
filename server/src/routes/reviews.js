import { Router } from 'express';
import { db } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Public: approved reviews only, newest first.
router.get('/', (req, res) => {
  const rows = db
    .prepare("SELECT id, name, company, rating, message, created_at FROM reviews WHERE status = 'approved' ORDER BY created_at DESC")
    .all();
  res.json(rows);
});

// Public: submit a new review (goes into "pending" until an admin approves it).
router.post('/', (req, res) => {
  const { name, company, rating, message } = req.body || {};
  const errors = [];

  if (!name || !String(name).trim()) errors.push({ field: 'name', message: 'Name is required' });
  if (!message || !String(message).trim()) errors.push({ field: 'message', message: 'Review message is required' });
  const ratingNum = Number(rating);
  if (!Number.isInteger(ratingNum) || ratingNum < 1 || ratingNum > 5) {
    errors.push({ field: 'rating', message: 'Rating must be a whole number between 1 and 5' });
  }
  if (errors.length) return res.status(400).json({ errors });

  const info = db
    .prepare('INSERT INTO reviews (name, company, rating, message, status) VALUES (?, ?, ?, ?, ?)')
    .run(String(name).trim(), company ? String(company).trim() : null, ratingNum, String(message).trim(), 'pending');

  res.status(201).json({ id: info.lastInsertRowid, message: 'Thank you! Your review will appear once it is approved.' });
});

// Admin: list every review regardless of status.
router.get('/admin/all', requireAuth, (req, res) => {
  const rows = db.prepare('SELECT * FROM reviews ORDER BY created_at DESC').all();
  res.json(rows);
});

// Admin: update a review's status (approve / reject) or edit its text.
router.patch('/admin/:id', requireAuth, (req, res) => {
  const { id } = req.params;
  const existing = db.prepare('SELECT * FROM reviews WHERE id = ?').get(id);
  if (!existing) return res.status(404).json({ message: 'Review not found' });

  const { status, name, company, rating, message } = req.body || {};
  const next = {
    status: status ?? existing.status,
    name: name ?? existing.name,
    company: company ?? existing.company,
    rating: rating ?? existing.rating,
    message: message ?? existing.message,
  };

  if (!['pending', 'approved', 'rejected'].includes(next.status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  db.prepare('UPDATE reviews SET status = ?, name = ?, company = ?, rating = ?, message = ? WHERE id = ?')
    .run(next.status, next.name, next.company, next.rating, next.message, id);

  res.json({ message: 'Updated' });
});

// Admin: delete a review permanently.
router.delete('/admin/:id', requireAuth, (req, res) => {
  const info = db.prepare('DELETE FROM reviews WHERE id = ?').run(req.params.id);
  if (info.changes === 0) return res.status(404).json({ message: 'Review not found' });
  res.json({ message: 'Deleted' });
});

export default router;
