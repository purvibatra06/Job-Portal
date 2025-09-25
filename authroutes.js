const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const nodemailer=require('nodemailer');
const JWT_SECRET = "your_jwt_secret_key";

const User = require('../dblayer/models/user.js');
router.post('/signup', async (req, res) => {
    console.log(req,'kjaksja')
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }
//hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save the new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

//login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "Login successful!",
            token
             });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// FORGOT PASSWORD Send reset link through SMTP
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required." });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found." });

    // Generate reset token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "15m",
    });

    // Save token and expiry in DB
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 mins
    await user.save();

    // Setup nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      auth: {
        user: process.env.MY_GMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.MY_GMAIL,
      to: email,
      subject: "Password Reset Request",
      html: `
        <p>Hi ${user.name},</p>
        <p>You requested to reset your password. Click the link below to reset it:</p>
        <a href="${process.env.CLIENT_URL}/reset-password?token=${token}">Reset Password</a>
        <p>This link will expire in 15 minutes.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Password reset link sent to your email." });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return res.status(500).json({ message: "Server error. Try again later." });
  }
});

// RESET PASSWORD - Use token to reset password
router.post("/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ message: "Token and new password are required." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findOne({
      _id: decoded.id,
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();

    res.status(200).json({ message: "Password has been reset successfully." });
  } catch (err) {
    console.error("Reset Password Error:", err);
    res.status(500).json({ message: "Unable to reset password. Try again." });
  }
});

// reset password
router.post("/reset-password", async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({ message: "Token and new password are required." });
        }

        
        const users = await User.find({ resetTokenExpiry: { $gt: Date.now() } });

        let matchedUser = null;
        for (const user of users) {
            const isMatch = await bcrypt.compare(user.resetTokenExpiry.toString(), token);
            if (isMatch) {
                matchedUser = user;
                break;
            }
        }

        if (!matchedUser) {
            return res.status(400).json({ message: "Invalid or expired token." });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        matchedUser.password = hashedPassword;
        matchedUser.resetToken = undefined;
        matchedUser.resetTokenExpiry = undefined;
        await matchedUser.save();

        res.status(200).json({ message: "Password has been reset successfully." });

    } catch (err) {
        console.error("Reset Password Error:", err);
        res.status(500).json({ message: "Server error." });
    }
});

module.exports = router;
