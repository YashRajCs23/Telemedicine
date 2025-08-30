import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { io } from "socket.io-client";
import { Mic, MicOff, Video, VideoOff, PhoneOff, User, Clock } from 'lucide-react';

// Initialize the socket connection
const socket = io("http://localhost:3000");

const VideoCall = () => {
    const { roomId } = useParams();
    const navigate = useNavigate();
    
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const [isMuted, setIsMuted] = useState(false);
    const [isCameraOff, setIsCameraOff] = useState(false);
    const [callStatus, setCallStatus] = useState('Connecting...');
    const [callDuration, setCallDuration] = useState(0);

    const pcRef = useRef(null);
    const localVideoRef = useRef();
    const remoteVideoRef = useRef();
    const durationIntervalRef = useRef();

    useEffect(() => {
        // --- 1. Initialize Peer Connection ---
        const servers = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
        pcRef.current = new RTCPeerConnection(servers);

        // --- 2. Get User Media ---
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                setLocalStream(stream);
                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = stream;
                }
                stream.getTracks().forEach(track => {
                    if (pcRef.current && pcRef.current.signalingState !== 'closed') {
                        pcRef.current.addTrack(track, stream);
                    }
                });
            })
            .catch(error => {
                console.error("Error accessing media devices.", error);
                setCallStatus("Error: Could not access camera or microphone.");
            });

        // --- 3. Set up Peer Connection Event Handlers ---
        pcRef.current.ontrack = (event) => {
            setRemoteStream(event.streams[0]);
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = event.streams[0];
            }
        };

        pcRef.current.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit('ice-candidate', roomId, event.candidate);
            }
        };

        // --- 4. Socket Signaling Setup ---
        const userId = localStorage.getItem('userId') || localStorage.getItem('doctorId') || 'user_' + Math.random();
        socket.emit('join-room', roomId, userId);

        const handleUserConnected = async () => {
            setCallStatus('Creating connection...');
            const offer = await pcRef.current.createOffer();
            await pcRef.current.setLocalDescription(offer);
            socket.emit('offer', roomId, offer);
        };

        const handleOffer = async (offer) => {
            await pcRef.current.setRemoteDescription(new RTCSessionDescription(offer));
            const answer = await pcRef.current.createAnswer();
            await pcRef.current.setLocalDescription(answer);
            socket.emit('answer', roomId, answer);
            setCallStatus('Connected');
            startDurationTimer();
        };

        const handleAnswer = async (answer) => {
            await pcRef.current.setRemoteDescription(new RTCSessionDescription(answer));
            setCallStatus('Connected');
            startDurationTimer();
        };

        const handleIceCandidate = async (candidate) => {
            try {
                if (candidate) {
                    await pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
                }
            } catch (e) {
                console.error('Error adding received ice candidate', e);
            }
        };

        const handleCallEnded = () => {
             setCallStatus("Call ended.");
             endCall(false);
        };

        socket.on('user-connected', handleUserConnected);
        socket.on('offer', handleOffer);
        socket.on('answer', handleAnswer);
        socket.on('ice-candidate', handleIceCandidate);
        socket.on('call-ended', handleCallEnded);

        // --- 5. Cleanup ---
        return () => {
            if(pcRef.current) {
                pcRef.current.close();
            }
            if (localStream) {
                localStream.getTracks().forEach(track => track.stop());
            }
            socket.off('user-connected', handleUserConnected);
            socket.off('offer', handleOffer);
            socket.off('answer', handleAnswer);
            socket.off('ice-candidate', handleIceCandidate);
            socket.off('call-ended', handleCallEnded);
        };
    }, [roomId]);

    const startDurationTimer = () => {
        if(durationIntervalRef.current) clearInterval(durationIntervalRef.current);
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
        if (localStream) {
            localStream.getAudioTracks().forEach(track => track.enabled = !track.enabled);
            setIsMuted(!isMuted);
        }
    };

    const toggleCamera = () => {
        if (localStream) {
            localStream.getVideoTracks().forEach(track => track.enabled = !track.enabled);
            setIsCameraOff(!isCameraOff);
        }
    };

    const endCall = (emitEvent = true) => {
        if (pcRef.current) pcRef.current.close();
        if (localStream) localStream.getTracks().forEach(track => track.stop());
        if (durationIntervalRef.current) clearInterval(durationIntervalRef.current);
        if (emitEvent) socket.emit('end-call', roomId);
        
        if (localStorage.getItem('doctorId')) {
            navigate('/doctor/dashboard');
        } else {
            navigate('/user/dashboard');
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-white">
            <div className="flex-1 flex items-center justify-center p-4 relative">
                <div className="w-full h-full bg-black rounded-lg overflow-hidden">
                    {remoteStream ? <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" /> : 
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                             <User size={64} className="mb-4"/>
                             <p className="text-lg font-semibold">{callStatus}</p>
                             {callStatus === 'Connecting...' && <p>Please wait for the other participant to join.</p>}
                        </div>
                    }
                </div>
                <div className="absolute bottom-6 right-6 w-48 h-32 bg-black rounded-lg overflow-hidden border-2 border-gray-600 shadow-lg">
                    {localStream && <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-full object-cover" />}
                </div>
                <div className="absolute top-4 left-4 bg-black bg-opacity-50 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    <Clock size={14}/>
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

