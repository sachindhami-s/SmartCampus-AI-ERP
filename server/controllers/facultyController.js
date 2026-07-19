const Faculty = require("../models/Faculty");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    try {

        const { email, password } = req.body;

        if (!email || !password) {
    return res.status(400).json({
        success: false,
        message: "Email and Password are required"
    });
}

const faculty = await Faculty.findOne({ email });

if (!faculty) {
    return res.status(401).json({
        success: false,
        message: "Invalid Email or Password"
    });
}

const isPasswordMatch = await bcrypt.compare(password, faculty.password);

if (!isPasswordMatch) {
    return res.status(401).json({
        success: false,
        message: "Invalid Email or Password"
    });
}

const token = jwt.sign(
    {
        id: faculty._id,
        role: faculty.role
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "7d"
    }
);

return res.status(200).json({
    success: true,
    message: "Faculty login successful",
    token,
    faculty: {
        _id: faculty._id,
        name: faculty.name,
        email: faculty.email,
        department: faculty.department,
        role: faculty.role
    }
});

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

// Get All Faculty
const getAllFaculty = async (req, res) => {
    try {
        const faculties = await Faculty.find().select("-password");
        return res.status(200).json({
            success: true,
            count: faculties.length,
            data: faculties
});
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

// Get Faculty By ID
const getFacultyById = async (req, res) => {
    try {

        const { id } = req.params;

        const faculty = await Faculty.findById(id).select("-password");

        if (!faculty) {
            return res.status(404).json({
                success: false,
                message: "Faculty not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: faculty
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
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