import express from "express";
import {lecturerLogin,getLecturerSubjects,getSubjectMarks,getLecturerSummary} from "../controller/lecturerController.js";
import { verifyLecturer } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", lecturerLogin);
router.get("/sub", verifyLecturer, getLecturerSubjects);
router.get("/ms/:subjectId", verifyLecturer, getSubjectMarks);
router.get("/summary", verifyLecturer, getLecturerSummary);

export default router;