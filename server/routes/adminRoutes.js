const express = require("express");
const router = express.Router();

const {
    registerAdmin
} = require("../controllers/adminController");

// Register Admin
router.post("/register", registerAdmin);

module.exports = router;