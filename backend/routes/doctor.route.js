const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctor.model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Helper function to generate token
function generateToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
}

// Register a new doctor
router.post('/register', async (req, res) => {
    try {
        const {
            name,
            phoneNumber,
            email,
            password,
            locality,
            speciality,
            yearsOfExperience
        } = req.body;
        
        // Check if doctor already exists
        const existingDoctor = await Doctor.findOne({ 
            $or: [
                { phoneNumber },
                { email }
            ] 
        });
        
        if (existingDoctor) {
            let message = 'Registration failed. ';
            if (existingDoctor.email === email) message += 'Email already registered.';
            if (existingDoctor.phoneNumber === phoneNumber) message += 'Phone number already registered.';
            return res.status(400).json({ message });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create new doctor
        const doctor = new Doctor({
            name,
            phoneNumber,
            email,
            password: hashedPassword,
            locality,
            speciality,
            yearsOfExperience,
            isActive: true
        });

        await doctor.save();

        // Generate token for immediate login
        const token = generateToken({ doctorId: doctor._id });

        // Remove password from response
        doctor.password = undefined;

        res.status(201).json({ 
            message: 'Registration successful',
            token,
            doctor
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Login with email and password
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find doctor by email
        const doctor = await Doctor.findOne({ email }).select('+password');
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, doctor.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = generateToken({ doctorId: doctor._id });

        // Remove password from response
        doctor.password = undefined;

        res.status(200).json({
            message: 'Login successful',
            token,
            doctor
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get doctor profile
router.get('/profile/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id).select('-password');
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// --- NEW --- GET All Doctors
router.get('/', async (req, res) => {
    try {
        const doctors = await Doctor.find({}).select('-password');
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ message: "Server error fetching doctors list", error: error.message });
    }
});

// --- NEW --- Logout doctor
router.post('/logout', (req, res) => {
    // With JWT, logout is primarily handled on the client-side.
    // This server endpoint is here to formally acknowledge the logout action.
    res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;

