import mongoose from "mongoose";
import dotenv from "dotenv";
import Student from "./model/studentModel.js";
import Lecturer from "./model/lecturerModel.js";
import Subject from "./model/subjectModel.js";
import Marks from "./model/marksModel.js";

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected successfully");

        await Student.deleteMany({});
        await Lecturer.deleteMany({});
        await Subject.deleteMany({});
        await Marks.deleteMany({});

        const lecturers = await Lecturer.insertMany([
            {
                _id: "lect1",
                name: "Prof. Bob Stone",
                email: "bstone@uni.ac.lk",
                username: "bstone",
                password: "abc@123",
                jobTitle: "Senior Lecturer"
            },
            {
                _id: "lect2",
                name: "Dr. Jane Smith",
                email: "jsmith@uni.ac.lk",
                username: "jsmith",
                password: "abc@123",
                jobTitle: "Lecturer"
            }
        ]);
        console.log("Lecturers seeded");

        await Subject.insertMany([
            {
                _id: "MATH101",
                name: "Calculus I",
                description: "Differentiation and Integration.",
                credits: 3,
                lecturer: "lect2"
            },
            {
                _id: "PHYS101",
                name: "Physics I",
                description: "Classical mechanics and waves.",
                credits: 3,
                lecturer: "lect2"
            },
            {
                _id: "CS101",
                name: "Introduction to CS",
                description: "Fundamentals of Computer Science.",
                credits: 3,
                lecturer: "lect1"
            }
        ]);
        console.log("Subjects seeded");

        await Student.insertMany([
            {
                _id: "stu1",
                name: "Tom White",
                email: "twhite@student.ac.lk",
                username: "tomw",
                password: "phy@123",
                department: "IT",
                age: 21
            },
            {
                _id: "stu2",
                name: "Alice Green",
                email: "agreen@student.ac.lk",
                username: "aliceg",
                password: "phy@123",
                department: "IT",
                age: 22
            },
            {
                _id: "stu3",
                name: "Bob Brown",
                email: "bbrown@student.ac.lk",
                username: "bobb",
                password: "phy@123",
                department: "IT",
                age: 20
            }
        ]);
        console.log("Students seeded");

        await Marks.insertMany([
            {
                student: "stu1",
                subject: "MATH101",
                ICAE01: 82,
                ICAE02: 79,
                ICAE03: 84,
                attendance: 91,
                eligibility: true
            },
            {
                student: "stu1",
                subject: "PHYS101",
                ICAE01: 62,
                ICAE02: 55,
                ICAE03: 70,
                attendance: 88,
                eligibility: true
            },
            {
                student: "stu2",
                subject: "MATH101",
                ICAE01: 78,
                ICAE02: 72,
                ICAE03: 76,
                attendance: 88,
                eligibility: true
            },
            {
                student: "stu3",
                subject: "MATH101",
                ICAE01: 66,
                ICAE02: 60,
                ICAE03: 78,
                attendance: 70,
                eligibility: false
            }
        ]);
        console.log("Marks seeded");

        console.log("All data seeded successfully!");
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

seedData();
