import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';



import "./Common.css";


export default function FaceReco() {
  const navigate = useNavigate(); // useNavigate hook to get the navigate function
    const location = useLocation();

    const photos = location.state.photos;
    const PhoneNumber = location.state.PhoneNumber;
    const inputValue = location.state.inputValue;

    const handleNext = () => {
      if (inputValue.trim().length === 0) {
        alert('숫자 또는 공백을 입력할 수 없습니다.');
      } else {
        navigate("/religioncheck", { state: { inputValue, PhoneNumber, photos } });
      }
    };

  const resetPhotos = () => {
    navigate('/PhoneNum', { state: { PhoneNumber: null } });
  };

  

  return (
    <div>
      <div>
        <header>Easy KIOSK</header>
      </div>
      <div>
        <div className="Top_text">
          <div className="title"> 내 정보 등록하기 </div>
        </div>
        <div className="Middle_Menu">
          <div id="inner-bg">
            <div className="middle_count">
              <div className="middle_count_text">4/5</div>
            </div>
            <div className="middle_title">
              <div className="middle_title_text">기타 정보 등록하기</div>
            </div>
            <div className="middle_camera">

            </div>
          </div>
        </div>
        <div className="Bottom_button">
          <div className="left_section">
            <div id="left_button" onClick={resetPhotos}>
              <div className="button_text" > 이전으로 </div>
            </div>
          </div>
          <div className="right_section">
            <div id="right_button" onClick={() => {
                console.log(photos); // photos를 출력
                handleNext(); // 다음 페이지로 이동
              }}>
              <div className="button_text" > 다음으로 </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


