const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const registerStudent = async (req, res) => {
    try {

        const {
    name,
    registrationNumber,
    email,
    password,
    role,
    department,
    semester
} = req.body;

        if (
    !name ||
    !registrationNumber ||
    !email ||
    !password ||
    !department ||
    !semester
) {
    return res.status(400).json({
        success: false,
        message: "All fields are required"
    });
}

const existingEmail = await Student.findOne({ email });

if (existingEmail) {
    return res.status(400).json({
        success: false,
        message: "Email already exists"
    });
}

const existingRegistration = await Student.findOne({
    registrationNumber
});

if (existingRegistration) {
    return res.status(400).json({
        success: false,
        message: "Registration Number already exists"
    });
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
    return res.status(400).json({
        success: false,
        message: "Please enter a valid email address"
    });
}

if (password.length < 6) {
    return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long"
    });
}

if (semester < 1 || semester > 8) {
    return res.status(400).json({
        success: false,
        message: "Semester must be between 1 and 8"
    });
}

const validDepartments = [
    "CSE",
    "IT",
    "ECE",
    "EEE",
    "ME",
    "CE"
];

if (!validDepartments.includes(department)) {
    return res.status(400).json({
        success: false,
        message: "Invalid department"
    });
}

const validRoles = [
    "student",
    "faculty",
    "admin"
];

if (role && !validRoles.includes(role)) {
    return res.status(400).json({
        success: false,
        message: "Invalid role"
    });
}

const hashedPassword = await bcrypt.hash(password, 10);

        const student = new Student({
    name,
    registrationNumber,
    email,
    password: hashedPassword,
    role,
    department,
    semester
});


        await student.save();

        res.status(201).json({
            success: true,
            message: "Student Registered Successfully",
            student
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const loginStudent = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
    return res.status(400).json({
        success: false,
        message: "Email and Password are required"
    });
}

const student = await Student.findOne({ email });

if (!student) {
    return res.status(400).json({
        success: false,
        message: "Invalid Email or Password"
    });
}

const isMatch = await bcrypt.compare(password, student.password);

if (!isMatch) {
    return res.status(400).json({
        success: false,
        message: "Invalid Email or Password"
    });
}

const token = generateToken(student._id, student.role);

res.status(200).json({
    success: true,
    message: "Login Successful",
    token
});

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find().select("-password");

        res.status(200).json({
            success: true,
            count: students.length,
            students
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const getStudentById = async (req, res) => {
    try {

        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student Not Found"
            });
        }

        res.status(200).json({
            success: true,
            student
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const updateStudent = async (req, res) => {
    try {

        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Student Updated Successfully",
            student
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const deleteStudent = async (req, res) => {
    try {

        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student Not Found"
            });
        }

        await student.deleteOne();

        res.status(200).json({
            success: true,
            message: "Student Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    registerStudent,
    loginStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent
};

