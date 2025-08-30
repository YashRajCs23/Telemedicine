const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    appointmentDate: {
        type: Date,
        required: [true, 'Appointment date is required']
    },
    timeSlot: {
        type: String,
        required: [true, 'Time slot is required'],
        enum: {
            values: [
                '09:00', '10:00', '11:00', '12:00', 
                '14:00', '15:00', '16:00', '17:00'
            ],
            message: '{VALUE} is not a valid time slot'
        }
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: [true, 'Doctor reference is required']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User reference is required']
    },
    reason: {
        type: String,
        required: [true, 'Reason for appointment is required'],
        trim: true
    },
    status: {
        type: String,
        enum: {
            values: ['pending', 'accepted', 'rejected', 'completed'],
            message: '{VALUE} is not a valid status'
        },
        default: 'pending'
    }
}, {
    timestamps: true
});

// Compound index for checking slot availability
appointmentSchema.index({ doctor: 1, appointmentDate: 1, timeSlot: 1 });

// Method to check if slot is available
appointmentSchema.statics.isSlotAvailable = async function(doctorId, date, timeSlot) {
    const existingAppointment = await this.findOne({
        doctor: doctorId,
        appointmentDate: date,
        timeSlot: timeSlot,
        status: { $in: ['pending', 'accepted'] }
    });
    return !existingAppointment;
};

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;