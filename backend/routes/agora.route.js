const express = require('express');
const router = express.Router();
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');

// Load environment variables
require('dotenv').config();

const APP_ID = process.env.AGORA_APP_ID;
const APP_CERTIFICATE = process.env.AGORA_CERTIFICATE;

// Build a token generation endpoint
router.post('/token', (req, res) => {
    // get channel name from the request body
    const { channelName } = req.body;
    if (!channelName) {
        return res.status(500).json({ 'error': 'channel is required' });
    }

    // Set expiration time for token
    const expirationTimeInSeconds = 3600; // 1 hour
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
    
    // Build token
    const token = RtcTokenBuilder.buildTokenWithUid(
        APP_ID,
        APP_CERTIFICATE,
        channelName,
        0, // Use 0 for a random UID, or pass a specific user ID if needed
        RtcRole.PUBLISHER,
        privilegeExpiredTs
    );
    
    // Return the token to the client
    res.json({ token });
});

module.exports = router;