import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
};

export const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            return res.status(401).json({ message: "No token provided" });
        }

        const token = authHeader.startsWith("Bearer ")
            ? authHeader.slice(7)
            : authHeader;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

export const verifyStudent = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role !== "student") {
            return res.status(403).json({ message: "Access denied. Students only." });
        }
        next();
    });
};

export const verifyLecturer = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role !== "lecturer") {
            return res.status(403).json({ message: "Access denied. Lecturers only." });
        }
        next();
    });
};
