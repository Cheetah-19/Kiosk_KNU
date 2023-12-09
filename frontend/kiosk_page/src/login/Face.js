import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants/Url';
import "./logincss/Face.css";

export default function Face(props) {

    const navigate = useNavigate(); // useNavigate hook to get the navigate function
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    // Add ref for timer id
    const setTimeRef = useRef(null);
    const setIntRef = useRef(null);

    // Add state for storing photos
    const [photos, setPhotos] = useState([]);

    // Add state for remaining photos
    const [remainingPhotos, setRemainingPhotos] = useState(5); // 5장으로 설정
    let remainingPhotosValue = 5;
    
    const [dashoffset, setDashoffset] = useState(2*Math.PI*54);

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
                setTimeRef.current = setTimeout(() => {
                    setIntRef.current = setInterval(captureFrame, 300, 5); // 2초후 0.3초 간격으로 5장 촬영
                }, 2000);
            }

        } catch (error) {

        }
    };


    // Capture a frame and add it to the photos array
    const captureFrame = async () => {
        if (remainingPhotosValue <= 0) return; // Stop capturing after reaching limit

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
            remainingPhotosValue -= 1;
            setDashoffset(2 * Math.PI * 54 * (1 - (5-remainingPhotosValue)*20/100))
        }
    };

    // Send photos to the server when remainingPhotos becomes 0
    useEffect(() => {
        if (remainingPhotos === 0) {
            clearTimeout(setTimeRef.current);
            clearInterval(setIntRef.current);
            axios.post(`${BASE_URL}/login/face/`, { imageData: photos })
                .then(response => {
                    // 사용자의 얼굴 정보를 DB와 대조하여 회원 여부를 본다.
                    // 이후 DB에 있는 사용자라면 -> phone_number를 보내준다.
                    const phone_number = response.data.phone_number;
                    if (!phone_number) {  // phoneNumber가 없다면 -> 얼굴인식 실패.
                        props.showAlert('얼굴인식 실패! 휴대폰 번호로 로그인 해주세요.');

                        // 휴대폰 번호 입력창 띄우기
                        props.setGotoPhoneNUm(true);
                        props.setSlide(true);
                    } else {
                        props.showAlert(response.data.name + '님 안녕하세요');
                        navigate('/MealOption', { state: { phone_number }});
                    }
                    stopVideo();
                })
                .catch(error => console.error(error));
        }
    }, [remainingPhotos, photos, navigate]);


    useEffect(() => {
        startVideo();   

        return () => {
            clearTimeout(setTimeRef.current);
            clearInterval(setIntRef.current);
        };
    }, []);

    return (
        <div id = "video-container">
            <video ref={videoRef} id="video-element"></video>
            <div class="circle_progress_wrap">
                <svg class="circle_progress" width="360" height="360" viewBox="3 3 114 114">
                    <circle class="frame" cx="60" cy="60" r="54" stroke-width="5" />
                    <circle class="bar" cx="60" cy="60" r="54" stroke-width="5" style={{strokeDashoffset: dashoffset, transition: 'stroke-dashoffset 0.5s ease-in-out'}}/>
                </svg>
            </div>
            {/* Display remaining photos count */}
            <p style={{ color: 'black', fontSize: '32px', marginTop: '20px', visibility: 'hidden'}}>{remainingPhotos}</p>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
    );
}

export const stopVideo = () => {
    // 웹캠 요소 가져오기
    const videoElement = document.querySelector('video');

    // 웹캠 정지
    if (videoElement && videoElement.srcObject) {
        const stream = videoElement.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        videoElement.srcObject = null;
    }
}