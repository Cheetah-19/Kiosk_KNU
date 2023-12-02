import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Common.css";

export default function AllergyCheck() {
  // const BASE_URL = 'https://kioskknu2023.run.goorm.site';
  const BASE_URL = 'http://127.0.0.1:8000';

    const navigate = useNavigate(); // useNavigate hook to get the navigate function
    const location = useLocation();
    const photos = location.state.photos;
    const PhoneNumber = location.state.PhoneNumber;
    const inputValue = location.state.inputValue;
    
    let ReligioncheckboxValue = location.state.ReligionCheckBox;
    let VegancheckboxValue = location.state.VeganCheckBox;

    if (typeof ReligioncheckboxValue === 'undefined') {
        ReligioncheckboxValue = 0;
    }

    if (typeof VegancheckboxValue === 'undefined') {
        VegancheckboxValue = 0;
    }

    //서버로 사용자의 입력값을 보내준다. 등록버튼 클릭 시 호출.
    const handleButtonClick = () => {

      console.log(ReligioncheckboxValue); // 종교 체크박스 값 확인
      console.log(VegancheckboxValue); // 비건 체크박스 값 확인
      // 서버로 데이터 전송
      const postData = {
          user_name: inputValue,
          user_phonenum: PhoneNumber,
          user_face_info: photos.join('||') 
          // user_face_info : photos.join(',')            // 배열을 문자열로 변환해서 저장. 
      };
      
      if (VegancheckboxValue !== 0) {
        postData.user_vegetarian = VegancheckboxValue;
      }

      if (ReligioncheckboxValue !== 0) {
        postData.religion = ReligioncheckboxValue;
      }

      axios.post(`${BASE_URL}/signup/`, postData)  // '서버 URL' 부분에 테스트할 서버 주소 넣어주면 됨.
          .then(response => {
              console.log(postData);  
              console.log(response.data);  // 요청 성공시 alert 하나 해줄 예정.
              alert("사용자 등록이 완료되었습니다");
          })
          .catch(error => {
              console.log(postData);
              console.error(error);
              alert("사용자 등록이 실패했습니다. 다시 시도해주세요.");
          });
    };
    return (
      <div>
        <set>
          <header>Easy KIOSK</header>
          <body>
            <div className="upper-t">알러지가 있으신가요?</div>
            <br/>
            <button className = "next-button" onClick= {() => navigate('/Allergy', { state: { inputValue, PhoneNumber, ReligionCheckBox: ReligioncheckboxValue, VeganCheckBox: VegancheckboxValue,photos } })}>네</button>
            <br/>
            <br/>
            {/*알러지 해당없으면 바로 등록 모달창으로 보내주기.*/}
            <button className = "next-button" onClick={(handleButtonClick)}>등록</button> {/* Button to navigate to the next page */}
          </body>
          <footer>
          </footer>
        </set>
        {/* Face recognition content... */}
      </div>
    );
}