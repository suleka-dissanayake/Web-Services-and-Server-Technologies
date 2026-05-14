import express from "express";
import {studentLogin,getStudentMarks,getSubjectDetails} from "../controller/studentController.js";
import { verifyStudent } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", studentLogin);
router.get("/marks", verifyStudent, getStudentMarks);
router.get("/sub/:subjectId", verifyStudent, getSubjectDetails);

export default router;