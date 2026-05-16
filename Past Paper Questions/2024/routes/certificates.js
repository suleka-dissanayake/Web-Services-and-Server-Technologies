import express    from 'express';
import Certificate from '../models/Certificate.js';
import Student     from '../models/Student.js';
import Event       from '../models/Event.js';

const router = express.Router();

// Q2 — List all certificates
router.get('/', async (req, res) => {
  try {
    const certs = await Certificate.find();
    res.json(certs);
  } catch (err) {
    res.status(500).json({ error_message: err.message });
  }
});

// Q3 — Get certificate by id, including event name & student full name
//        GET /cert/:id
router.get('/:id', async (req, res) => {
  try {
    const cert = await Certificate.findById(req.params.id)
      .populate('event_id',   'name')
      .populate('student_id', 'first_name last_name');

    if (!cert) return res.status(404).json({ error_message: 'Certificate not found' });

    res.json({
      _id:          cert._id,
      detail:       cert.detail,
      issued_on:    cert.issued_on,
      event_name:   cert.event_id?.name,
      student_name: `${cert.student_id?.first_name} ${cert.student_id?.last_name}`,
    });
  } catch (err) {
    res.status(500).json({ error_message: err.message });
  }
});

// Q6 — Add a new certificate with validation of student_id and event_id
//        POST /cert
router.post('/', async (req, res) => {
  try {
    const { detail, issued_on, event_id, student_id } = req.body;

    // Validate event exists
    const event = await Event.findById(event_id);
    if (!event) return res.status(400).json({ error_message: 'Invalid Event Id' });

    // Validate student exists
    const student = await Student.findById(student_id);
    if (!student) return res.status(400).json({ error_message: 'Student not found' });

    const cert = await Certificate.create({ detail, issued_on, event_id, student_id });

    res.status(201).json(cert);
  } catch (err) {
    res.status(500).json({ error_message: err.message });
  }
});

export default router;
