import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  registration_number: { type: String, required: true, unique: true },
  first_name:          { type: String, required: true },
  last_name:           { type: String, required: true },
  degree:              { type: String, required: true },
  faculty:             { type: String, required: true },
});

export default mongoose.model('Student', studentSchema);
