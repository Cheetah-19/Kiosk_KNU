import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from './constants/Url';

import "./Face.css";

import face from './img/face.png';


export default function Face(props) {
  const navigate = useNavigate(); // useNavigate hook to get the navigate function
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Add ref for timer id
  const setTimeRef = useRef(null);
  const setIntRef = useRef(null);

  // Add state for remaining photos
  let remainingPhotosValue = 5;

  const [dashoffset, setDashoffset] = useState(2*Math.PI*54);

  const [isFace, setIsFace] = useState(true);

  const startVideo = async () => {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error('Camera not available on this browser');
        }
        const timer = ()=>{
          setTimeRef.current = setTimeout(() => {
            setIntRef.current = setInterval(captureFrame, 1000, 5);
          }, 2000);
        }
  
        if (!videoRef.current.srcObject) {
          console.log('start video');
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

        // 한장 보내고 테스트하고 마스크 안 끼고 얼굴 추출되면 -1
        // 한 장 서버에 보냄 -> reponse가 정상이다
        axios.post(`${BASE_URL}/signup/facecheck`, { imageData: imgDataUrl })
            .then(response => {
                // 사용자의 얼굴 정보를 DB와 대조하여 회원 여부를 본다.
                // 이후 DB에 있는 사용자라면 -> phone_number를 보내준다.
                console.log(response);
                setIsFace(true);
                
                if (response.data.result) { 
                  props.setPhotos(prevPhotos => [...prevPhotos, imgDataUrl]);
                  remainingPhotosValue -= 1;
                  setDashoffset(2 * Math.PI * 54 * (1 - (5-remainingPhotosValue)*20/100))
                }
            })
            .catch(error => {
              console.error(error);
              setIsFace(false);
            });
      }
    };

    useEffect(() => {
      startVideo();

      return () => {
          clearTimeout(setTimeRef.current);
          clearInterval(setIntRef.current);
      };
    }, []);

  return (
      <div id="video-container">
        <video ref={videoRef} id="video-element"></video>
        <div id="non-face" style={ isFace ? {visibility: 'hidden' }:{visibility:'visible'}}>
          <img id="face" src={face}></img>
        </div>
        <div className="circle_progress_wrap">
            <svg className="circle_progress" width="100%" height="100%" viewBox="3 3 114 114">
                <circle className="frame" cx="60" cy="60" r="54" strokeWidth="5" />
                <circle className="bar" cx="60" cy="60" r="54" strokeWidth="5" style={{strokeDashoffset: dashoffset, transition: 'stroke-dashoffset 0.5s ease-in-out'}}/>
            </svg>
        </div>
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

      console.log('end video');
      tracks.forEach(track => track.stop());

      videoElement.srcObject = null;
  }
}