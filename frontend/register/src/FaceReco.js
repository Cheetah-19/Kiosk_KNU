import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Face from "./Face"; // Face 컴포넌트 import

import PhoneNum from "./PhoneNum";

import "./Common.css";
import "./FaceReco.css";

import face from './img/face.png';

export default function FaceReco() {
  const navigate = useNavigate(); // useNavigate hook to get the navigate function
  const [alert, setAlert] = useState(false);

  const [gotoPhoneNUm, setGotoPhoneNUm] = useState(false);
  const [slide, setSlide] = useState(false);

  const [photos, setPhotos] = useState([]); // photos 상태 추가

  useEffect(() => {
    setTimeout(() => { setAlert(true) }, 2200);
  });

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
              <div className="middle_count_text">1/5</div>
            </div>
            <div className="middle_title">
              <div className="middle_title_text">얼굴정보 등록하기</div>
            </div>
            <div className="middle_camera">
              {
              alert ===  true ?
              <Face setPhotos={setPhotos} />
              :
              <div id='face-img-container'>
                <img src={face} style={{ width: '30%', margin: '0px 0px 40px 0px' }} />
                <div>
                  <span id='face-contents'>아이콘을 터치해</span><br />얼굴 정보를 등록해주세요.
                </div>
              </div>
              }
            </div>
          </div>
        </div>
        <div className="Bottom_button">
          <div className="right_section">
            <div className="right_section">
              <div id="right_button" onClick={() => {
                  console.log(photos); // photos를 출력
                  navigate("/username", { state: { photos } }); // 다음 페이지로 이동
                }}>
                <div className="button_text" > 다음으로 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
