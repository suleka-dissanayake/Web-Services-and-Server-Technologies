import Student from "../model/studentModel.js";
import Marks from "../model/marksModel.js";
import Subject from "../model/subjectModel.js";
import { generateToken } from "../middleware/authMiddleware.js";

export const studentLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const student = await Student.findOne({ username });
        if (!student) {
            return res.status(404).json({ message: "Student not found!" });
        }

        if (student.password !== password) {
            return res.status(401).json({ message: "Invalid password!" });
        }

        const token = generateToken({
            id: student._id,
            username: student.username,
            role: "student"
        });

        res.status(200).json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getStudentMarks = async (req, res) => {
    try {
        const studentId = req.user.id;

        const marksList = await Marks.find({ student: studentId });
        if (marksList.length === 0) {
            return res.status(404).json({ message: "No marks found for this student!" });
        }

        res.status(200).json(marksList);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getSubjectDetails = async (req, res) => {
    try {
        const studentId = req.user.id;
        const subjectId = req.params.subjectId;

        const subject = await Subject.findById(subjectId);
        if (!subject) {
            return res.status(404).json({ message: "Subject not found!" });
        }

        const marksRecord = await Marks.findOne({ student: studentId, subject: subjectId });
        if (!marksRecord) {
            return res.status(404).json({ message: "No marks record found for this subject!" });
        }

        const student = await Student.findById(studentId);
        const icaeMarks = [marksRecord.ICAE01, marksRecord.ICAE02, marksRecord.ICAE03];
        const sortedMarks = [...icaeMarks].sort((a, b) => b - a);
        const bestTwo = sortedMarks.slice(0, 2);
        const average = parseFloat(((bestTwo[0] + bestTwo[1]) / 2).toFixed(1));
        const fortyPercent = parseFloat((average * 0.4).toFixed(1));

        res.status(200).json({
            "Student Name": student.name,
            "Subject Name": subject.name,
            "Attendance": `${marksRecord.attendance}%`,
            "ICAE01 marks": marksRecord.ICAE01,
            "ICAE02 marks": marksRecord.ICAE02,
            "ICAE03 marks": marksRecord.ICAE03,
            "best marks": bestTwo,
            "Average": average,
            "40% of mark": fortyPercent
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
