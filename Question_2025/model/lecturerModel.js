import mongoose from "mongoose";

const lecturerSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        default: "abc@123"
    },
    jobTitle: {
        type: String,
        required: false
    }
});

export default mongoose.model("lecturers", lecturerSchema);
