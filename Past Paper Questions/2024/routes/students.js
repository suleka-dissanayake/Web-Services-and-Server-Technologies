import express      from 'express';
import Student       from '../models/Student.js';
import Certificate   from '../models/Certificate.js';

const router = express.Router();

// Q2 — List all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error_message: err.message });
  }
});

// Q4 — Get all certificates for a student (by registration number),
//        including event name  →  GET /student/:reg_no/certs
router.get('/:reg_no/certs', async (req, res) => {
  try {
    const student = await Student.findOne({ registration_number: req.params.reg_no });
    if (!student) return res.status(404).json({ error_message: 'Student not found' });

    const certs = await Certificate.find({ student_id: student._id })
      .populate('event_id', 'name');

    const result = certs.map(c => ({
      _id:            c._id,
      certificate_id: c._id,
      issued_on:      c.issued_on,
      detail:         c.detail,
      event:          c.event_id?.name,
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error_message: err.message });
  }
});

export default router;
