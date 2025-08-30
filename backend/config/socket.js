const socketIo = require('socket.io');

const initializeSocket = (server) => {
    const io = socketIo(server, {
        cors: {
            origin: "*", // For development, you might want to restrict this in production
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);

        // --- Listener for Doctor-specific notifications ---
        // When the doctor's dashboard connects, it joins a private room.
        socket.on('join-doctor-room', (doctorId) => {
            socket.join(`doctor_${doctorId}`);
            console.log(`Socket ${socket.id} joined room for doctor ${doctorId}`);
        });
        
        // --- Listener for User-specific notifications ---
        // When a user's dashboard connects, it joins this private room.
        socket.on('join-user-room', (userId) => {
            socket.join(`user_${userId}`);
            console.log(`Socket ${socket.id} joined room for user ${userId}`);
        });

        // --- WebRTC signaling for the video call room ---
        socket.on('join-room', (roomId, userId) => {
            socket.join(roomId);
            socket.to(roomId).emit('user-connected', userId);

            // Handle WebRTC signaling
            socket.on('offer', (offer) => {
                socket.to(roomId).emit('offer', offer, userId);
            });

            socket.on('answer', (answer) => {
                socket.to(roomId).emit('answer', answer, userId);
            });

            socket.on('ice-candidate', (candidate) => {
                socket.to(roomId).emit('ice-candidate', candidate, userId);
            });

            // Handle disconnection from the video room
            socket.on('disconnect', () => {
                console.log(`User ${userId} disconnected from room ${roomId}`);
                socket.to(roomId).emit('user-disconnected', userId);
            });

            // Handle end call event
            socket.on('end-call', () => {
                console.log(`Call ended in room ${roomId}`);
                io.to(roomId).emit('call-ended');
            });
        });
    });

    return io;
};

module.exports = initializeSocket;

