import Lecturer from "../model/lecturerModel.js";
import Subject from "../model/subjectModel.js";
import Marks from "../model/marksModel.js";
import { generateToken } from "../middleware/authMiddleware.js";

export const lecturerLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const lecturer = await Lecturer.findOne({ username });
        if (!lecturer) {
            return res.status(404).json({ message: "Lecturer not found!" });
        }

        if (lecturer.password !== password) {
            return res.status(401).json({ message: "Invalid password!" });
        }

        const token = generateToken({
            id: lecturer._id,
            username: lecturer.username,
            role: "lecturer"
        });

        res.status(200).json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getLecturerSubjects = async (req, res) => {
    try {
        const lecturerId = req.user.id;

        const subjects = await Subject.find({ lecturer: lecturerId });
        if (subjects.length === 0) {
            return res.status(404).json({ message: "No subjects found for this lecturer!" });
        }

        res.status(200).json(subjects);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getSubjectMarks = async (req, res) => {
    try {
        const lecturerId = req.user.id;
        const subjectId = req.params.subjectId;

        const subject = await Subject.findOne({ _id: subjectId, lecturer: lecturerId });
        if (!subject) {
            return res.status(403).json({ message: "You don't have access to this subject" });
        }

        const marksList = await Marks.find({ subject: subjectId });
        if (marksList.length === 0) {
            return res.status(404).json({ message: "No marks found for this subject!" });
        }

        res.status(200).json(marksList);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getLecturerSummary = async (req, res) => {
    try {
        const lecturerId = req.user.id;

        const subjects = await Subject.find({ lecturer: lecturerId });
        if (subjects.length === 0) {
            return res.status(404).json({ message: "No subjects found for this lecturer!" });
        }

        const summary = await Promise.all(
            subjects.map(async (subject) => {
                const allMarks = await Marks.find({ subject: subject._id });

                const eligibleCount = allMarks.filter((m) => m.eligibility === true).length;
                const ineligibleCount = allMarks.filter((m) => m.eligibility === false).length;

                return {
                    "subject name": subject.name,
                    "no of students eligible for exam": eligibleCount,
                    "no of students not eligible for exam": ineligibleCount
                };
            })
        );

        res.status(200).json(summary);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
