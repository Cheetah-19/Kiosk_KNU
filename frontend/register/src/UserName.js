import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import "./Common.css";

export default function FaceReco({ showAlert }) {
  const navigate = useNavigate(); // useNavigate hook to get the navigate function
  const location = useLocation();
  const photos = location.state.photos;

  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    if (/^\d+$/.test(event.target.value)) {
      showAlert('숫자는 입력할 수 없습니다.');
    } else if (event.target.value.split(' ').join('') !== event.target.value) {
      showAlert('공백은 입력할 수 없습니다.');
    } else {
      setInputValue(event.target.value);
    }
  }

  const handleNext = () => {
    if (inputValue.trim().length === 0) {
      showAlert('이름을 입력해주세요.');
    } else {
      navigate('/PhoneNum', { state: { inputValue, photos } });
    }
  };

  const goback = () => {
    navigate('/', { state: { photos: [] } });
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
              <div className="middle_count_text">2/5</div>
            </div>
            <div className="middle_title">
              <div className="middle_title_text">이름 등록하기</div>
            </div>
            <div className="middle_camera">
              <input className="input-des" type="text" value={inputValue} onChange={handleChange} placeholder="이름을 입력해주세요" />
            </div>

          </div>
        </div>
        <div className="Bottom_button">
          <div className="left_section">
            <div id="left_button" onClick={goback}>
              <div className="button_text" > 이전으로 </div>
            </div>
          </div>
          <div className="right_section">
            <div id="right_button" onClick={() => {
                console.log(inputValue);
                
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

