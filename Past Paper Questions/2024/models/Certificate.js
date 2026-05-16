import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
  detail:     { type: String, required: true },
  event_id:   { type: mongoose.Schema.Types.ObjectId, ref: 'Event',   required: true },
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  issued_on:  { type: Date, default: Date.now },
});

export default mongoose.model('Certificate', certificateSchema);
