const express = require('express');
const router = express.Router();
const Session = require('../models/session.model');
const Appointment = require('../models/appointment.model');
const { v4: uuidv4 } = require('uuid');

// Create a new session
router.post('/create', async (req, res) => {
    try {
        const { appointmentId } = req.body;
        
        // Get appointment details
        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ 
                success: false, 
                message: 'Appointment not found' 
            });
        }

        // Check if session already exists for this appointment
        const existingSession = await Session.findOne({ appointmentId });
        if (existingSession) {
            // If session exists, just notify participants to join
            req.io.to(`user_${appointment.user}`).emit('session-created', {
                roomId: existingSession.roomId,
                appointmentId
            });
            req.io.to(`doctor_${appointment.doctor}`).emit('session-created', {
                roomId: existingSession.roomId,
                appointmentId
            });
            return res.status(200).json({ 
                success: true, 
                session: existingSession 
            });
        }

        // Create new session if one doesn't exist
        const session = new Session({
            appointmentId,
            doctor: appointment.doctor,
            user: appointment.user,
            roomId: uuidv4(),
            startTime: new Date()
        });

        await session.save();

        // Notify participants through Socket.IO that a new session is ready
        req.io.to(`user_${appointment.user}`).emit('session-created', {
            roomId: session.roomId,
            appointmentId
        });
        req.io.to(`doctor_${appointment.doctor}`).emit('session-created', {
            roomId: session.roomId,
            appointmentId
        });

        res.status(201).json({ 
            success: true, 
            session 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
});

// Join session
router.post('/join/:roomId', async (req, res) => {
    try {
        const { roomId } = req.params;
        const session = await Session.findOne({ roomId })
            .populate('doctor', 'name')
            .populate('user', 'name');

        if (!session) {
            return res.status(404).json({
                success: false,
                message: 'Session not found'
            });
        }

        if (session.status === 'completed') {
            return res.status(400).json({
                success: false,
                message: 'This session has already ended'
            });
        }

        // Set status to ongoing when the first person joins
        if (session.status === 'waiting') {
            session.status = 'ongoing';
            await session.save();
        }

        res.json({ 
            success: true, 
            session 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
});

// End session
router.post('/end/:roomId', async (req, res) => {
    try {
        const { roomId } = req.params;
        const session = await Session.findOne({ roomId });

        if (!session) {
            return res.status(404).json({
                success: false,
                message: 'Session not found'
            });
        }

        // Check if the session is already completed to avoid redundant updates
        if (session.status !== 'completed') {
            session.status = 'completed';
            session.endTime = new Date();
            session.duration = Math.round(
                (session.endTime - session.startTime) / (1000 * 60)
            );
            await session.save();

            // Find the related appointment and update its status to 'completed'
            await Appointment.findByIdAndUpdate(session.appointmentId, {
                status: 'completed'
            });

            // Notify participants that the call has officially ended
            req.io.to(roomId).emit('call-ended', {
                roomId,
                duration: session.duration
            });
        }

        res.json({ 
            success: true, 
            session 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
});

module.exports = router;

