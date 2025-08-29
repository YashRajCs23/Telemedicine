const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters long'],
        maxlength: [50, 'Name cannot exceed 50 characters']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
        unique: true,
        trim: true,
        validate: {
            validator: function(v) {
                return /^[0-9]{10}$/.test(v);
            },
            message: 'Please enter a valid 10-digit phone number'
        }
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'],
        select: false // Won't include password in query results by default
    },
    locality: {  // Fixed spelling from 'localty'
        type: String,
        trim: true,
        required: [true, 'Locality is required']
    },
    language: {
        type: String,
        required: [true, 'Language preference is required'],
        enum: {
            values: ['english', 'hindi'],
            message: '{VALUE} is not supported. Only English and Hindi are available'
        },
        default: 'english',
        lowercase: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Index for faster queries
userSchema.index({ phoneNumber: 1, email: 1 });
userSchema.index({ language: 1 }); // Add index for language queries

const User = mongoose.model('User', userSchema);

module.exports = User;