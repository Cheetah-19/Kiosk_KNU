import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import "./Common.css";

export default function Face() {
    const navigate = useNavigate(); // useNavigate hook to get the navigate function
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    // Add ref for timer id
    const timerIdRef = useRef(null);

    // Add state for remaining photos
    const [remainingPhotos, setRemainingPhotos] = useState(10);

    const startVideo = async () => {
        try {
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                throw new Error('Camera not available on this browser');
            }

            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });

            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
                await videoRef.current.play();
            }

        } catch (error) {
            console.log("Something went wrong!", error);
        }
    };

    // Capture a frame and send it to the server
    const captureFrame = async () => {
        if (remainingPhotos <= 0 || timerIdRef.current) return; // Stop capturing after reaching limit
    
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
    

            //사진 크기 정하는 방법으로, 카메라 크기에 맞춰 조정된다.

            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;

            // Draw the video frame to the canvas
            context.drawImage(videoRef.current, 0, 0, videoRef.current.videoWidth, videoRef.current.videoHeight);
    
            // Convert the canvas image to a base64 string
            const imgDataUrl = canvasRef.current.toDataURL('image/jpeg');
    
            axios.post('/api/save-image', { imageData: imgDataUrl })
                .then(response => console.log(response))
                .catch(error => console.error(error));
    
            // Decrement remaining photos count by one and then check if it's less than or equal to 0
            setRemainingPhotos(prevCount => {
                const newCount = prevCount - 1;
                if (newCount <= 0) {
                    clearTimeout(timerIdRef.current);
                    //navigate('/MealOption');
                    return;
                }
                return newCount;
            });
        }
    
        timerIdRef.current = setTimeout(() => {
            timerIdRef.current = null; // Reset timer ID after execution
            captureFrame();
        }, 500);
    };
    

    useEffect(() => {
        startVideo().then(() => captureFrame());
    }, []);

    return (
        <div>
            <set>
                <header>Easy KIOSK</header>
                <body>
                    <div id="video_container">
                        <video ref={videoRef} id="video_Element"></video>
                        {/* Display remaining photos count */}
                        <p style={{ color: 'black', fontSize: '32px' }}>{remainingPhotos}</p>
                        <canvas ref={canvasRef} style={{ display: 'none' }} />
                    </div>
                </body>
            </set>
            {/* Face recognition content... */}
        </div>
    );
}
