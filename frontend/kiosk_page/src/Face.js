import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import "./Face.css";

export default function Face(props) {
    const BASE_URL = 'https://kioskknu2023.run.goorm.site';

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

            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { width: 720, height: 720 } });

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
            axios.post(`${BASE_URL}/login/face/`, { imageData: photos })
                .then(response => {
                    //사용자의 얼굴 정보를 DB와 대조하여 회원 여부를 본다.
                    //이후 DB에 있는 사용자라면 -> phone_number를 보내준다.
                    console.log(response);
                    const phone_number = response.data.phone_number;
    
                    if (!phone_number) {  // phoneNumber가 없다면 -> 얼굴인식 실패.
                        alert('얼굴인식 실패! 휴대전화로 로그인 해주세요.');
                        //navigate('/PhoneNum');  // PhoneNum.js 페이지로 이동

                        // 휴대폰 번호 입력창 띄우기
                        props.setGotoPhoneNUm(true);
                        props.setSlide(true);
                    } else {
                        alert("로그인 성공");
                        navigate('/MainMenu', { state: { phone_number }});
                    }
                })
                .catch(error => console.error(error));
        }
    }, [remainingPhotos, photos, navigate]);



    useEffect(() => {
        startVideo();
    }, []);

    return (
        <div id = "video-container">
            <video ref={videoRef} id="video-element"></video>
            {/* Display remaining photos count */}
            <p style={{ color: 'black', fontSize: '32px', marginTop: '20px' }}>{remainingPhotos}</p>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
    );
}