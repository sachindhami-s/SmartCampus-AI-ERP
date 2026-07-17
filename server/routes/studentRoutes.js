const express = require("express");

const router = express.Router();

const {
    registerStudent,
    loginStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent
} = require("../controllers/studentController");

const auth = require("../middleware/authMiddleware");

const admin = require("../middleware/adminMiddleware");

router.post("/register", registerStudent);

router.post("/login", loginStudent);

router.get("/", auth, getAllStudents);

router.get("/:id", auth, getStudentById);

router.put("/:id", auth, updateStudent);

router.delete("/:id", auth, admin, deleteStudent);

module.exports = router;