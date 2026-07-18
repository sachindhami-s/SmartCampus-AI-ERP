const express = require("express");
const router = express.Router();

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
router.get("/", getAllFaculty);

// Get Faculty By ID
router.get("/:id", getFacultyById);

// Update Faculty
router.put("/:id", updateFaculty);

// Delete Faculty
router.delete("/:id", deleteFaculty);

module.exports = router;