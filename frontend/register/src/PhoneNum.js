import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';



import "./Common.css";


export default function FaceReco() {
  const navigate = useNavigate(); // useNavigate hook to get the navigate function
    const location = useLocation();
    const photos = location.state.photos;
    const inputValue = location.state.inputValue;
    const [PhoneNumber, setInputValue] = useState('');
    //PhoneNum페이지로 input된 정보를 넘겨준다.
    const handleChange = (event) => {
      // '-'를 입력할 경우
      if (!/^[0-9]*$/.test(event.target.value)) {
        alert('0~9 이외의 값은 입력할 수 없습니다.');
      } else {
        setInputValue(event.target.value);
      }
    }

    const handleNext = () => {
      if (PhoneNumber.length !== 11) {
        alert("핸드폰 번호는 11글자를 입력해야 합니다.");
        return;
      }
      navigate('/vegancheck', { state: { inputValue, PhoneNumber, photos } });
    };

  const goback = () => {
    navigate('/username', { state: { inputValue: null } });
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
              <div className="middle_count_text">3/5</div>
            </div>
            <div className="middle_title">
              <div className="middle_title_text">휴대폰번호 등록하기</div>
            </div>
            <div className="middle_camera">
              <input className="input-des" type="text" value={PhoneNumber} onChange={handleChange} placeholder="휴대폰 번호를 입력해 주세요" />
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
                console.log(photos); // photos를 출력
                console.log(inputValue); // 이름 출력
                console.log(PhoneNumber); // 번호 출력
                handleNext(); // 다음 페이지로 이동
              }}>
              <div className="button_text"> 다음으로 </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


