import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
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
        default: "phy@123"
    },
    department: {
        type: String,
        required: false
    },
    age: {
        type: Number,
        required: false
    }
});

export default mongoose.model("students", studentSchema);
