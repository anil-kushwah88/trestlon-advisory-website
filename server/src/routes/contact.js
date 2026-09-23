import { Router } from 'express';
import { db } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post('/', (req, res) => {
  const { name, email, phone, subject, message } = req.body || {};
  const errors = [];

  if (!name || !String(name).trim()) errors.push({ field: 'name', message: 'Name is required' });
  if (!email || !EMAIL_RE.test(String(email).trim())) errors.push({ field: 'email', message: 'Valid email is required' });
  if (!message || !String(message).trim()) errors.push({ field: 'message', message: 'Message is required' });
  if (errors.length) return res.status(400).json({ errors });

  const info = db
    .prepare('INSERT INTO messages (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)')
    .run(
      String(name).trim(),
      String(email).trim(),
      phone ? String(phone).trim() : null,
      subject ? String(subject).trim() : null,
      String(message).trim()
    );

  res.status(201).json({ id: info.lastInsertRowid, message: 'Thanks for reaching out — we will get back to you shortly.' });
});

router.get('/admin/all', requireAuth, (req, res) => {
  const rows = db.prepare('SELECT * FROM messages ORDER BY created_at DESC').all();
  res.json(rows);
});

router.patch('/admin/:id/read', requireAuth, (req, res) => {
  const info = db.prepare('UPDATE messages SET is_read = 1 WHERE id = ?').run(req.params.id);
  if (info.changes === 0) return res.status(404).json({ message: 'Message not found' });
  res.json({ message: 'Marked as read' });
});

router.delete('/admin/:id', requireAuth, (req, res) => {
  const info = db.prepare('DELETE FROM messages WHERE id = ?').run(req.params.id);
  if (info.changes === 0) return res.status(404).json({ message: 'Message not found' });
  res.json({ message: 'Deleted' });
});

export default router;
