import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import "./Face.css";

export default function Face(props) {
    const navigate = useNavigate(); // useNavigate hook to get the navigate function
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    // Add ref for timer id
    const timerIdRef = useRef(null);

    // Add state for remaining photos
    const [remainingPhotos, setRemainingPhotos] = useState(4); // 10장으로 설정
    let remainingPhotosValue = 5;

    const startVideo = async () => {
        console.log('start video');
        try {
          if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            throw new Error('Camera not available on this browser');
          }
          const timer = ()=>{
            setTimeout(() => {
              timerIdRef.current = setInterval(captureFrame, 100,10);
            }, 2000);

            return () => {clearInterval(timerIdRef.current);}
          }
    
          if (!videoRef.current.srcObject) {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { width: 720, height: 720 } });
    
            if (videoRef.current) {
              videoRef.current.srcObject = mediaStream;
            }
          }
    
          if (!videoRef.current.paused && !videoRef.current.ended) {
            // Already playing - do nothing
          } else {
            await videoRef.current.play();
            timer();
          }


          
          
    
        } catch (error) {
          console.log("Something went wrong!", error);
        }
      };
    
      const captureFrame = async () => {
        if (remainingPhotosValue <= 0) return;
    
        if (videoRef.current && canvasRef.current) {
          const context = canvasRef.current.getContext('2d');
    
          canvasRef.current.width = videoRef.current.videoWidth;
          canvasRef.current.height = videoRef.current.videoHeight;
    
          context.drawImage(videoRef.current, 0, 0, videoRef.current.videoWidth, videoRef.current.videoHeight);
    
          const imgDataUrl = canvasRef.current.toDataURL('image/jpeg');
    
          props.setPhotos(prevPhotos => [...prevPhotos, imgDataUrl]);
    
          setRemainingPhotos(prevCount => prevCount - 1);
          remainingPhotosValue -= 1;
        }
      };

    
      useEffect(() => {
        startVideo();
      }, []);

    return (
        <div id="video-container">
            <video ref={videoRef} id="video-element"></video>
            {/* Display remaining photos count */}
            <p style={{ color: 'black', fontSize: '32px', marginTop: '20px' }}>{remainingPhotos+1}</p>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
    );
}
