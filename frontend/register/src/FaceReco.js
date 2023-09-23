import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import "./Common.css";

export default function FaceReco() {
    const navigate = useNavigate(); // useNavigate hook to get the navigate function
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play();
        }
      } catch (error) {
        console.error('카메라 접근에 에러가 발생했습니다:',error);
      }
    };

    return (
      <div>
        <set>
          <header>Easy KIOSK</header>
          <body>
            <video ref={videoRef} autoPlay playsInline style={{ width: '100%', maxWidth: '500px' }} />
          </body>
          <footer>
            <div className="blinking-text">나의 정보를 등록하세요 1/6</div>
            <button className = "next-button" onClick={() => navigate("/username")}>다음으로</button> {/* Button to navigate to the next page */}
          </footer>
        </set>
        {/* Face recognition content... */}
      </div>
    );
}