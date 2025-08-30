import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AgoraRTC from 'agora-rtc-sdk-ng'; // AGORA SDK IMPORT
import { Mic, MicOff, Video, VideoOff, PhoneOff, User, Clock } from 'lucide-react';

// Agora SDK initialization
const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

const VideoCall = () => {
    const { roomId } = useParams();
    const navigate = useNavigate();

    const [isMuted, setIsMuted] = useState(false);
    const [isCameraOff, setIsCameraOff] = useState(false);
    const [callStatus, setCallStatus] = useState('Connecting...');
    const [callDuration, setCallDuration] = useState(0);

    const localVideoRef = useRef();
    const remoteVideoRef = useRef();
    const durationIntervalRef = useRef();

    // Agora-specific state
    const localAudioTrack = useRef(null);
    const localVideoTrack = useRef(null);

    useEffect(() => {
        let isMounted = true;
        let isRemoteUserJoined = false;
        // Add this line to confirm the value is being read
console.log('Client App ID:', import.meta.env.VITE_AGORA_APP_ID);

        const startAgoraCall = async () => {
            setCallStatus('Fetching token...');
            
            // 1. Fetch Agora Token from backend
            const tokenResponse = await fetch('http://localhost:3000/agora/token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ channelName: roomId }),
            });
            const { token } = await tokenResponse.json();

            if (!isMounted) return;

            setCallStatus('Joining call...');

            // 2. Join the Agora Channel
            const uid = localStorage.getItem('userId') || localStorage.getItem('doctorId');
            await client.join(import.meta.env.VITE_AGORA_APP_ID, roomId, token, uid);

            // 3. Create local media tracks
            localAudioTrack.current = await AgoraRTC.createMicrophoneAudioTrack();
            localVideoTrack.current = await AgoraRTC.createCameraVideoTrack();
            
            // Play local video in the local video element
            localVideoTrack.current.play(localVideoRef.current);

            // 4. Publish local tracks to the channel
            await client.publish([localAudioTrack.current, localVideoTrack.current]);

            // Set up a listener for remote users
            client.on("user-published", async (user, mediaType) => {
                isRemoteUserJoined = true;
                await client.subscribe(user, mediaType);
                if (mediaType === "video" && user.videoTrack) {
                    user.videoTrack.play(remoteVideoRef.current);
                }
                if (mediaType === "audio" && user.audioTrack) {
                    user.audioTrack.play();
                }
                if (isMounted && remoteVideoRef.current.srcObject) {
                    setCallStatus('Connected');
                    startDurationTimer();
                }
            });

            client.on("user-unpublished", (user) => {
                isRemoteUserJoined = false;
                setCallStatus("Other user disconnected.");
            });

            // If a user is already in the channel when we join, update status
            client.on("user-joined", (user) => {
                isRemoteUserJoined = true;
                setCallStatus('Connected');
                startDurationTimer();
            });

            // Initial status check
            if (isRemoteUserJoined) {
                 setCallStatus('Connected');
                 startDurationTimer();
            }
        };

        startAgoraCall();

        // --- Cleanup ---
        return () => {
            isMounted = false;
            // Leave the Agora channel and stop all tracks
            if (localAudioTrack.current) {
                localAudioTrack.current.stop();
                localAudioTrack.current.close();
            }
            if (localVideoTrack.current) {
                localVideoTrack.current.stop();
                localVideoTrack.current.close();
            }
            client.leave();
            if (durationIntervalRef.current) {
                clearInterval(durationIntervalRef.current);
            }
        };
    }, [roomId]);

    const startDurationTimer = () => {
        if (durationIntervalRef.current) clearInterval(durationIntervalRef.current);
        durationIntervalRef.current = setInterval(() => {
            setCallDuration(prev => prev + 1);
        }, 1000);
    };

    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };

    const toggleMute = () => {
        if (localAudioTrack.current) {
            localAudioTrack.current.setEnabled(isMuted);
            setIsMuted(!isMuted);
        }
    };

    const toggleCamera = () => {
        if (localVideoTrack.current) {
            localVideoTrack.current.setEnabled(isCameraOff);
            setIsCameraOff(!isCameraOff);
        }
    };

    const endCall = async (emitEvent = true) => {
        try {
            if (localAudioTrack.current) await localAudioTrack.current.close();
            if (localVideoTrack.current) await localVideoTrack.current.close();
            await client.leave();
            if (durationIntervalRef.current) clearInterval(durationIntervalRef.current);
            if (emitEvent) {
                await fetch(`http://localhost:3000/sessions/end/${roomId}`, {
                    method: 'POST'
                });
            }
            
            if (localStorage.getItem('doctorId')) {
                navigate('/doctor/dashboard');
            } else {
                navigate('/user/dashboard');
            }
        } catch (error) {
            console.error("Error during call end:", error);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-white">
            <div className="flex-1 flex items-center justify-center p-4 relative">
                <div className="w-full h-full bg-black rounded-lg overflow-hidden">
                    {/* The remote video element will be updated directly by Agora */}
                    <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" />
                    {callStatus === 'Connecting...' && (
                        <div className="w-full h-full absolute top-0 left-0 flex flex-col items-center justify-center text-gray-400">
                            <User size={64} className="mb-4" />
                            <p className="text-lg font-semibold">{callStatus}</p>
                            <p>Please wait for the other participant to join.</p>
                        </div>
                    )}
                </div>
                <div className="absolute bottom-6 right-6 w-48 h-32 bg-black rounded-lg overflow-hidden border-2 border-gray-600 shadow-lg">
                    {/* The local video element is updated by Agora */}
                    <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                </div>
                <div className="absolute top-4 left-4 bg-black bg-opacity-50 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    <Clock size={14} />
                    <span>{formatDuration(callDuration)}</span>
                </div>
            </div>
            <div className="bg-gray-800 p-4 flex justify-center items-center gap-4">
                <button onClick={toggleMute} className={`p-3 rounded-full transition-colors ${isMuted ? 'bg-red-500' : 'bg-gray-600 hover:bg-gray-500'}`}>
                    {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
                </button>
                <button onClick={toggleCamera} className={`p-3 rounded-full transition-colors ${isCameraOff ? 'bg-red-500' : 'bg-gray-600 hover:bg-gray-500'}`}>
                    {isCameraOff ? <VideoOff size={24} /> : <Video size={24} />}
                </button>
                <button onClick={() => endCall(true)} className="p-3 rounded-full bg-red-600 hover:bg-red-700">
                    <PhoneOff size={24} />
                </button>
            </div>
        </div>
    );
};

export default VideoCall;