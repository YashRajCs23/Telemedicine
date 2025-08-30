const socketIo = require('socket.io');

// This is the user management logic from your first file
// You would need a 'users.js' file to support this
// For this example, we'll assume it's defined here for clarity.
const users = new Map();

function create(socket) {
    const id = socket.id;
    users.set(id, socket);
    return id;
}

function get(id) {
    return users.get(id);
}

function remove(id) {
    users.delete(id);
}

const initializeSocket = (server) => {
    const io = socketIo(server, {
        cors: {
            origin: "*", // Adjust for production
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);

        // --- User Management (from the GitHub file) ---
        let userId = socket.id; // Or you can use your custom `users.create` logic
        // If you're using the 'users' module, you should have an 'init' event
        // to register the user, but for now, we'll use the socket's own ID.
        
        // This is a simplified version of the GitHub 'init' logic
        socket.emit('init', { id: userId });

        // --- Notification Rooms ---
        socket.on('join-doctor-room', (doctorId) => {
            socket.join(`doctor_${doctorId}`);
            console.log(`Socket ${socket.id} joined notification room for doctor ${doctorId}`);
        });

        socket.on('join-user-room', (userId) => {
            socket.join(`user_${userId}`);
            console.log(`Socket ${socket.id} joined notification room for user ${userId}`);
        });

        // --- Video Call Signaling (Your current code) ---
        socket.on('join-room', (roomId, clientUserId) => {
            socket.join(roomId);
            console.log(`User ${clientUserId} (${socket.id}) joined video room ${roomId}`);
            
            // Send the iceServers configuration to the client
            socket.emit('ice-servers', {
                iceServers: [
                    { urls: 'stun:stun.l.google.com:19302' },
                    { urls: 'stun:stun1.l.google.com:19302' },
                    { urls: 'stun:stun2.l.google.com:19302' },
                    // You can add more STUN or your own TURN server URLs here
                ]
            });

            // The 'to' event here targets everyone in the room except the sender
            socket.to(roomId).emit('user-connected', clientUserId);
        });

        socket.on('offer', (roomId, offer) => {
            // Forward the offer to the other peer in the room
            
            socket.to(roomId).emit('offer', offer);
        });

        socket.on('answer', (roomId, answer) => {
            // Forward the answer to the other peer in the room
            socket.to(roomId).emit('answer', answer);
        });

        socket.on('ice-candidate', (roomId, candidate) => {
            // Forward the ICE candidate to the other peer in the room
            socket.to(roomId).emit('ice-candidate', candidate);
        });

        socket.on('end-call', (roomId) => {
            console.log(`Call ended in room ${roomId}`);
            io.to(roomId).emit('call-ended');
        });

        socket.on('disconnect', () => {
            // This assumes the user management logic is in a separate file
            // If you use the in-line version above, you'd call remove(userId) here
            // users.remove(userId);
            console.log('Client disconnected:', socket.id);
        });
    });

    return io;
};

module.exports = initializeSocket;