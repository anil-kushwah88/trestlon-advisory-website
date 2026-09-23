import { Router } from 'express';
import { db, DEFAULT_CONTENT } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Public: fetch every content section as one object, keyed by section_key.
router.get('/', (req, res) => {
  const rows = db.prepare('SELECT section_key, data FROM content').all();
  const out = {};
  for (const row of rows) {
    try {
      out[row.section_key] = JSON.parse(row.data);
    } catch {
      out[row.section_key] = null;
    }
  }
  res.json(out);
});

// Admin: overwrite one section's data with a new JSON object.
router.put('/:key', requireAuth, (req, res) => {
  const { key } = req.params;
  const value = req.body;

  if (!(key in DEFAULT_CONTENT)) {
    return res.status(400).json({ message: `Unknown content section: ${key}` });
  }
  if (typeof value !== 'object' || value === null) {
    return res.status(400).json({ message: 'Body must be a JSON object' });
  }

  db.prepare(
    `INSERT INTO content (section_key, data, updated_at) VALUES (?, ?, datetime('now'))
     ON CONFLICT(section_key) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at`
  ).run(key, JSON.stringify(value));

  res.json({ message: 'Saved', key });
});

// Admin: reset one section back to the original PDF-derived defaults.
router.post('/:key/reset', requireAuth, (req, res) => {
  const { key } = req.params;
  if (!(key in DEFAULT_CONTENT)) {
    return res.status(400).json({ message: `Unknown content section: ${key}` });
  }
  db.prepare(
    `INSERT INTO content (section_key, data, updated_at) VALUES (?, ?, datetime('now'))
     ON CONFLICT(section_key) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at`
  ).run(key, JSON.stringify(DEFAULT_CONTENT[key]));
  res.json({ message: 'Reset to default', key, data: DEFAULT_CONTENT[key] });
});

export default router;
