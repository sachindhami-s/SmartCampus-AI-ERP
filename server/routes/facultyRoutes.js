const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
    registerFaculty,
    loginFaculty,
    getAllFaculty,
    getFacultyById,
    updateFaculty,
    deleteFaculty
} = require("../controllers/facultyController");

// Register Faculty
router.post("/register", registerFaculty);

// Login Faculty
router.post("/login", loginFaculty);

// Get All Faculty
router.get("/", auth,  getAllFaculty);

// Get Faculty By ID
router.get("/:id", auth, getFacultyById);

// Update Faculty
router.put("/:id", auth, updateFaculty);

// Delete Faculty
router.delete("/:id", auth, admin, deleteFaculty);

module.exports = router;