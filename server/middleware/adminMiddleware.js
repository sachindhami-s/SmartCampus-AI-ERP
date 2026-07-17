const Student = require("../models/Student");

const admin = async (req, res, next) => {
    try {

        const student = await Student.findById(req.student.id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });
        }

        if (student.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Access Denied. Admin Only"
            });
        }

        next();

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = admin;