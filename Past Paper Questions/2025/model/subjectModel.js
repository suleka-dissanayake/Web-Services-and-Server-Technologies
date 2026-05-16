import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    credits: {
        type: Number,
        required: true
    },
    lecturer: {
        type: String,
        ref: "lecturers",
        required: false
    }
});

export default mongoose.model("subjects", subjectSchema);
