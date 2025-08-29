const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    roomId: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ['waiting', 'ongoing', 'completed'],
        default: 'waiting'
    },
    startTime: Date,
    endTime: Date,
    duration: Number // in minutes
}, {
    timestamps: true
});

const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;