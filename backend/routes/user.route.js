const express = require('express');
const router = express.Router();
const User = require('../models/user.model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Helper function to generate token
function generateToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
}

// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { name, phoneNumber, email, password, locality } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ 
            $or: [{ phoneNumber }, { email }] 
        });
        
        if (existingUser) {
            return res.status(400).json({ 
                message: existingUser.email === email ? 
                    'Email already registered' : 
                    'Phone number already registered' 
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create new user
        const user = new User({
            name,
            phoneNumber,
            email,
            password: hashedPassword,
            locality,
            isActive: true // User is active by default now
        });

        await user.save();

        // Generate token for immediate login
        const token = generateToken({ userId: user._id });

        // Remove password from response
        user.password = undefined;

        res.status(201).json({ 
            message: 'Registration successful',
            token,
            user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Login with email and password
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user by email
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = generateToken({ userId: user._id });

        // Remove password from response
        user.password = undefined;

        res.status(200).json({
            message: 'Login successful',
            token,
            user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;