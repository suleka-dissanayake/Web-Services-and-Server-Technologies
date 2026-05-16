import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  date:        { type: Date,   required: true },
  description: { type: String },
  organizer:   { type: String, required: true },
});

export default mongoose.model('Event', eventSchema);
