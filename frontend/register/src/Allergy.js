import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';



import "./Common.css";


export default function FaceReco() {
  const navigate = useNavigate(); // useNavigate hook to get the navigate function
  const location = useLocation();
  const photos = location.state.photos;
  const inputValue = location.state.inputValue;
  const PhoneNumber = location.state.PhoneNumber;
  const selectedItemId = location.state.selectedItemId;
  const selectedReligion = location.state.selectedReligion;

  const resetPhotos = () => {
    navigate('/VeganCheck', { state: { inputValue, PhoneNumber, photos } });
  };

  const handleNext = () => {
    navigate("/complete", { state: { inputValue, PhoneNumber, photos, selectedItemId, selectedReligion } });
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
              <div className="middle_count_text">5/5</div>
            </div>
            <div className="middle_title">
              <div className="middle_title_text">알러지 정보 등록하기</div>
            </div>
            <div className="middle_camera">
            <div className="top_section">
                해당되는 항목에 체크해주세요
            </div>
            <div className = "row_2_button_area">

            </div>
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
              <div className="button_text" > 등록하기 </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



