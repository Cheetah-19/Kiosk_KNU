import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import "./Common.css";

export default function FaceReco() {
    const navigate = useNavigate(); // useNavigate hook to get the navigate function
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    // Add ref for timer id
    const timerIdRef = useRef(null);

    // Add state for storing photos
    const [photos, setPhotos] = useState([]);

    // Add state for remaining photos
    const [remainingPhotos, setRemainingPhotos] = useState(10); // 10장으로 설정

    const startVideo = async () => {
      try {
          if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
              throw new Error('Camera not available on this browser');
          }

          const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });

          if (videoRef.current) {
              videoRef.current.srcObject = mediaStream;
              await videoRef.current.play();

              // 웹캠이 시작된 후 2초 동안 기다린 후에 사진 촬영을 시작하도록 설정
              setTimeout(() => {
                  timerIdRef.current = setInterval(captureFrame, 100); // 2초후 0.1초 간격으로 10장 촬영
              }, 2000);
          }

      } catch (error) {
          console.log("Something went wrong!", error);
      }
  };

  // Capture a frame and add it to the photos array
  const captureFrame = async () => {
    if (remainingPhotos <= 0) return; // Stop capturing after reaching limit

    if (videoRef.current && canvasRef.current) {
        const context = canvasRef.current.getContext('2d');

        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;

        // Draw the video frame to the canvas
        context.drawImage(videoRef.current, 0, 0, videoRef.current.videoWidth, videoRef.current.videoHeight);

        // Convert the canvas image to a base64 string
        const imgDataUrl = canvasRef.current.toDataURL('image/jpeg');

        // Add the photo to the photos array
        setPhotos(prevPhotos => [...prevPhotos, imgDataUrl]);

        // Decrement remaining photos count by one
        setRemainingPhotos(prevCount => prevCount - 1);
    }
};

// Send photos to the server when remainingPhotos becomes 0
useEffect(() => {
  if (remainingPhotos === 0) {
      clearInterval(timerIdRef.current);
      console.log(photos); // 확인용 로그
  }
});



useEffect(() => {
  startVideo();
}, []);

    return (
      <div>
        <set>
          <header>Easy KIOSK</header>
          <body>
          <div id="video_container">
              <video ref={videoRef} id="video_Element"></video>
                  {/* Display remaining photos count */}
                  <p style={{ color: 'black', fontSize: '32px' }}>
                    {remainingPhotos}
                  </p>
                  <canvas ref={canvasRef} style={{ display: 'none' }}/>
            </div>
          </body>
          <footer>
            <div className="blinking-text">나의 정보를 등록하세요 1/6</div>
            <button className="next-button" onClick={() => navigate("/username", { state: { photos } })}>다음으로</button>
          </footer>
        </set>
        {/* Face recognition content... */}
      </div>
    );
}
