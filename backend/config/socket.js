const socketIo = require('socket.io');

const initializeSocket = (server) => {
    const io = socketIo(server, {
        cors: {
            origin: "*", // Adjust for production
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);

        // --- Notification Rooms ---
        socket.on('join-doctor-room', (doctorId) => {
            socket.join(`doctor_${doctorId}`);
            console.log(`Socket ${socket.id} joined notification room for doctor ${doctorId}`);
        });
        
        socket.on('join-user-room', (userId) => {
            socket.join(`user_${userId}`);
            console.log(`Socket ${socket.id} joined notification room for user ${userId}`);
        });

        // --- Video Call Signaling ---
        socket.on('join-room', (roomId, userId) => {
            socket.join(roomId);
            console.log(`User ${userId} (${socket.id}) joined video room ${roomId}`);
            // Notify others in the room that a new user has connected
            socket.to(roomId).emit('user-connected', userId);
        });

        socket.on('offer', (roomId, offer) => {
            socket.to(roomId).emit('offer', offer);
        });

        socket.on('answer', (roomId, answer) => {
            socket.to(roomId).emit('answer', answer);
        });

        socket.on('ice-candidate', (roomId, candidate) => {
            socket.to(roomId).emit('ice-candidate', candidate);
        });
        
        socket.on('end-call', (roomId) => {
             console.log(`Call ended in room ${roomId}`);
             io.to(roomId).emit('call-ended');
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
            // You can add logic here to notify users in a room about disconnection if needed
        });
    });

    return io;
};

module.exports = initializeSocket;

