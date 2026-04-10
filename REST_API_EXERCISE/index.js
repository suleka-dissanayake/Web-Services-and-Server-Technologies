const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());

const PORT = 3000;

let students = {};

app.post('/students', (req, res) => {
    const id = uuidv4();
    const { name, roomNumber, course, checkInDate } = req.body;

    const newStudent = { id, name, roomNumber, course, checkInDate };
    students[id] = newStudent;

    res.status(201).json(newStudent);
});

app.get('/students', (req, res) => {
    res.json(Object.values(students));
});

app.get('/students/:id', (req, res) => {
    const student = students[req.params.id];

    if (!student) {
        return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student);
});

app.put('/students/:id', (req, res) => {
    const student = students[req.params.id];

    if (!student) {
        return res.status(404).json({ message: 'Student not found' });
    }

    const { name, roomNumber, course, checkInDate } = req.body;

    students[req.params.id] = {
        ...student,
        name: name || student.name,
        roomNumber: roomNumber || student.roomNumber,
        course: course || student.course,
        checkInDate: checkInDate || student.checkInDate
    };

    res.json(students[req.params.id]);
});

app.delete('/students/:id', (req, res) => {
    const student = students[req.params.id];

    if (!student) {
        return res.status(404).json({ message: 'Student not found' });
    }

    delete students[req.params.id];

    res.json({ message: 'Student deleted' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});