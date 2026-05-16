import mongoose from "mongoose";

const marksSchema = new mongoose.Schema({
    student: {
        type: String,
        ref: "students",
        required: true
    },
    subject: {
        type: String,
        ref: "subjects",
        required: true
    },
    ICAE01: {
        type: Number,
        required: true
    },
    ICAE02: {
        type: Number,
        required: true
    },
    ICAE03: {
        type: Number,
        required: true
    },
    attendance: {
        type: Number,
        required: true
    },
    eligibility: {
        type: Boolean,
        required: true
    }
});

export default mongoose.model("marks", marksSchema);
