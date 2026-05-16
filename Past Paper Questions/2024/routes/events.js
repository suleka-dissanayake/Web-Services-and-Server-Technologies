import express    from 'express';
import Event       from '../models/Event.js';
import Certificate from '../models/Certificate.js';

const router = express.Router();

// Q2 — List all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error_message: err.message });
  }
});

// Q5 — Count certificates for a given event id  →  GET /event/:id/certs
router.get('/:id/certs', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error_message: 'Event not found' });

    const count = await Certificate.countDocuments({ event_id: req.params.id });

    res.json({
      certificate_count: count,
      event_name:        event.name,
    });
  } catch (err) {
    res.status(500).json({ error_message: err.message });
  }
});

export default router;
