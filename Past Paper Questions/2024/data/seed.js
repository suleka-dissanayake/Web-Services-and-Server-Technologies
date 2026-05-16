import mongoose from 'mongoose';
import Student     from '../models/Student.js';
import Event       from '../models/Event.js';
import Certificate from '../models/Certificate.js';

await mongoose.connect('mongodb://127.0.0.1:27017/cert_verification');

// Clear existing data
await Student.deleteMany({});
await Event.deleteMany({});
await Certificate.deleteMany({});

// --- Students ---
const students = await Student.insertMany([
  { registration_number: 'IT/2022/001', first_name: 'Emily',   last_name: 'Jones',    degree: 'BSc IT',  faculty: 'Computing' },
  { registration_number: 'IT/2022/002', first_name: 'James',   last_name: 'Silva',    degree: 'BSc IT',  faculty: 'Computing' },
  { registration_number: 'IT/2022/003', first_name: 'Aisha',   last_name: 'Fernando', degree: 'BSc CS',  faculty: 'Computing' },
  { registration_number: 'IT/2022/004', first_name: 'Michael', last_name: 'Perera',   degree: 'BEng',    faculty: 'Engineering' },
  { registration_number: 'IT/2022/005', first_name: 'Sara',    last_name: 'Kumar',    degree: 'BSc BIT', faculty: 'Computing' },
]);

// --- Events ---
const events = await Event.insertMany([
  { name: 'Mechanical Workshop',        date: new Date('2024-06-19'), description: 'Hands-on mechanical engineering workshop', organizer: 'Engineering Dept' },
  { name: 'Science Fair 2024',          date: new Date('2024-04-10'), description: 'Annual science exhibition',                organizer: 'Science Faculty' },
  { name: 'Physics Symposium 2024',     date: new Date('2024-08-28'), description: 'Physics research symposium',               organizer: 'Physics Dept' },
  { name: 'Business Strategy Seminar',  date: new Date('2024-09-15'), description: 'Entrepreneurship and strategy seminar',    organizer: 'Business School' },
]);

// --- Certificates ---
await Certificate.insertMany([
  // Mechanical Workshop certs (4 — matches Figure 3)
  { detail: 'Participation in Car design Workshop', event_id: events[0]._id, student_id: students[0]._id, issued_on: new Date('2024-06-19') },
  { detail: 'Best Project Award',                   event_id: events[0]._id, student_id: students[1]._id, issued_on: new Date('2024-06-19') },
  { detail: 'Excellence in Mechanics',              event_id: events[0]._id, student_id: students[2]._id, issued_on: new Date('2024-06-20') },
  { detail: 'Workshop Completion',                  event_id: events[0]._id, student_id: students[3]._id, issued_on: new Date('2024-06-20') },

  // Science Fair certs
  { detail: 'Participation in Science Fair 2024',   event_id: events[1]._id, student_id: students[0]._id, issued_on: new Date('2024-04-10') },
  { detail: 'Second Place Award',                   event_id: events[1]._id, student_id: students[2]._id, issued_on: new Date('2024-04-10') },

  // Physics Symposium cert
  { detail: 'Participation in Physics Symposium 2024', event_id: events[2]._id, student_id: students[0]._id, issued_on: new Date('2024-08-28') },

  // Business Strategy Seminar cert
  { detail: 'Top Presenter in Business Strategy Seminar', event_id: events[3]._id, student_id: students[0]._id, issued_on: new Date('2024-09-15') },
]);

console.log('✅ Database seeded successfully!');
console.log('Students :', students.length);
console.log('Events   :', events.length);

// Print IDs for quick reference
console.log('\n--- Event IDs ---');
events.forEach(e => console.log(`${e.name}: ${e._id}`));
console.log('\n--- Student IDs ---');
students.forEach(s => console.log(`${s.registration_number} (${s.first_name} ${s.last_name}): ${s._id}`));

await mongoose.disconnect();
