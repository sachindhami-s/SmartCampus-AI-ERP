const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

// Register Admin
const registerAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const existingAdmin = await Admin.findOne({ email });

        if (existingAdmin) {
            return res.status(400).json({
                success: false,
                message: "Admin already exists with this email"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = new Admin({
            name,
            email,
            password: hashedPassword
        });

        await admin.save();

        return res.status(201).json({
            success: true,
            message: "Admin registered successfully",
            data: {
                _id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
                createdAt: admin.createdAt
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

module.exports = {
    registerAdmin
};