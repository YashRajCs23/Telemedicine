const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const initializeSocket = require('./config/socket.js');

// Route imports
const userRoutes = require('./routes/user.route.js');
const doctorRoutes = require('./routes/doctor.route.js');
const appointmentRoutes = require('./routes/appointment.route.js');
const sessionRoutes = require('./routes/session.route.js');

// Initialize app and server
dotenv.config();
const app = express();
const server = http.createServer(app);

// Connect to MongoDB
connectDB();

// Initialize Socket.IO with server instance
const io = initializeSocket(server);

// Share io instance with routes that need it
app.set('io', io);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session middleware to access socket.io in routes
app.use((req, res, next) => {
    req.io = io;
    next();
});

// Routes
app.use('/user', userRoutes);
app.use('/doctor', doctorRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/sessions', sessionRoutes);

// Health check route
app.get('/', (req, res) => {
    res.send('Telemedicine API is running');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Handle socket disconnection
process.on('SIGTERM', () => {
    io.close(() => {
        console.log('Socket.IO server closed');
        process.exit(0);
    });
});