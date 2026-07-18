const Faculty = require("../models/Faculty");
const bcrypt = require("bcrypt");

// Register Faculty
const registerFaculty = async (req, res) => {
    try {
        const { name, email, password, department } = req.body;
        if (!name || !email || !password || !department) {
    return res.status(400).json({
        success: false,
        message: "All fields are required"
    });
}

const existingFaculty = await Faculty.findOne({ email });

if (existingFaculty) {
    return res.status(400).json({
        success: false,
        message: "Faculty already exists with this email"
    });
}

const hashedPassword = await bcrypt.hash(password, 10);

const faculty = new Faculty({
    name,
    email,
    password: hashedPassword,
    department
});

await faculty.save();

return res.status(201).json({
    success: true,
    message: "Faculty registered successfully",
    data: {
        _id: faculty._id,
        name: faculty.name,
        email: faculty.email,
        department: faculty.department,
        role: faculty.role,
        createdAt: faculty.createdAt
    }
});

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

// Login Faculty
const loginFaculty = async (req, res) => {

};

// Get All Faculty
const getAllFaculty = async (req, res) => {

};

// Get Faculty By ID
const getFacultyById = async (req, res) => {

};

// Update Faculty
const updateFaculty = async (req, res) => {

};

// Delete Faculty
const deleteFaculty = async (req, res) => {

};

module.exports = {
    registerFaculty,
    loginFaculty,
    getAllFaculty,
    getFacultyById,
    updateFaculty,
    deleteFaculty
};