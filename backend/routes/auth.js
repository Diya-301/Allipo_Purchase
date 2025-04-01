const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const router = express.Router();

router.post("/admin", (req, res) => {
    const { email, password } = req.body;

    if (
        email === process.env.ADMIN_EMAIL &&
        password === process.env.ADMIN_PASSWORD
    ) {
        const token = jwt.sign({ email }, process.env.JWT_SECRET);
        return res.json({ success: true, message: "Login successful", "token":token});
    } else {
        return res.json({ success: false, message: "Invalid credentials" });
    }
});

module.exports = router;