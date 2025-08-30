const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointment.model.js');

const appointmentController = {
    // Create appointment by user
    createAppointment: async (req, res) => {
        try {
            const { userId, doctorId, appointmentDate, timeSlot, reason } = req.body;
            
            // Check if slot is available
            const isAvailable = await Appointment.isSlotAvailable(
                doctorId,
                new Date(appointmentDate),
                timeSlot
            );

            if (!isAvailable) {
                return res.status(400).json({ 
                    success: false, // ADDED
                    message: 'Time slot is not available' 
                });
            }

            const appointment = new Appointment({
                user: userId,
                doctor: doctorId,
                appointmentDate,
                timeSlot,
                reason
            });

            await appointment.save();

            // --- Real-time Notification Logic ---
            // Populate user's name to send a personalized notification
            const newAppointment = await Appointment.findById(appointment._id).populate('user', 'name');

            if (newAppointment) {
              // Use req.io to emit an event to the specific doctor's room
              req.io.to(`doctor_${doctorId}`).emit('new-appointment', {
                message: 'You have a new appointment request.',
                patientName: newAppointment.user.name || 'A new patient'
              });
            }
            // --- End of Notification Logic ---

            res.status(201).json({ 
                success: true, // ADDED
                message: 'Appointment booked successfully', // ADDED
                appointment // WRAPPED IN OBJECT
            });
        } catch (error) {
            res.status(400).json({ 
                success: false, // ADDED
                message: error.message 
            });
        }
    },

    // Update appointment status (for doctors)
    updateAppointmentStatus: async (req, res) => {
        try {
            const { id } = req.params;
            const { status } = req.body;

            if (!['accepted', 'rejected', 'completed', 'pending'].includes(status)) {
                return res.status(400).json({ 
                    success: false, // ADDED
                    message: 'Invalid status' 
                });
            }

            const appointment = await Appointment.findByIdAndUpdate(
                id,
                { status },
                { new: true }
            ).populate('user', 'name phoneNumber')
             .populate('doctor', 'name speciality');

            if (!appointment) {
                return res.status(404).json({ 
                    success: false, // ADDED
                    message: 'Appointment not found' 
                });
            }

            res.json({ 
                success: true, // ADDED
                message: 'Appointment status updated successfully', // ADDED
                appointment // WRAPPED IN OBJECT
            });
        } catch (error) {
            res.status(400).json({ 
                success: false, // ADDED
                message: error.message 
            });
        }
    },

    // Get user's appointments
    getUserAppointments: async (req, res) => {
        try {
            const { userId } = req.params;
            const appointments = await Appointment.find({ user: userId })
                .populate('doctor', 'name speciality')
                .sort({ appointmentDate: -1 });
            res.json(appointments);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get doctor's appointments
    getDoctorAppointments: async (req, res) => {
        try {
            const { doctorId } = req.params;
            const appointments = await Appointment.find({ doctor: doctorId })
                .populate('user', 'name phoneNumber')
                .sort({ appointmentDate: -1 });
            res.json(appointments);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Check slot availability
    checkSlotAvailability: async (req, res) => {
        try {
            const { doctorId, appointmentDate, timeSlot } = req.body;
            const isAvailable = await Appointment.isSlotAvailable(
                doctorId,
                new Date(appointmentDate),
                timeSlot
            );
            res.json({ available: isAvailable });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

// --- Routes ---
router.post('/', appointmentController.createAppointment);
router.put('/:id/status', appointmentController.updateAppointmentStatus);
router.get('/user/:userId', appointmentController.getUserAppointments);
router.get('/doctor/:doctorId', appointmentController.getDoctorAppointments);
router.post('/check-slot', appointmentController.checkSlotAvailability);

module.exports = router;