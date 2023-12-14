import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from './constants/Url';

import "./Common.css";


export default function FaceReco() {

  const navigate = useNavigate(); // useNavigate hook to get the navigate function
  const location = useLocation();
  const photos = location.state.photos;
  const inputValue = location.state.inputValue;
  const PhoneNumber = location.state.PhoneNumber;
  const selectedVeganItemId = location.state.selectedItemId;
  const selectedReligion = location.state.selectedReligion;

  //None 값이면 0으로 변경
  if (typeof selectedReligion === "") {
    selectedReligion = 0;
  }

  if (typeof selectedVeganItemId === "") {
    selectedVeganItemId = 0;
  }

  const [selectedAllergy, setSelectedAllergy] = useState([]); // 'None'으로 초기화

  const resetPhotos = () => {
    navigate('/VeganCheck', { state: { inputValue, PhoneNumber, photos } });
  };

  //알레르기 선택
  const handleClickAllergy = (allergy) => {
    if (allergy === "") {
      setSelectedAllergy([]); // 해당없음을 누르면 selectedAllergy 배열에 "" 값만 남게 함
    } else {
      const index = selectedAllergy.indexOf(allergy);

      if (index !== -1) {
        const updatedAllergy = [...selectedAllergy];
        updatedAllergy.splice(index, 1);
        setSelectedAllergy(updatedAllergy);
      } else {
        // 해당없음 버튼을 선택해제하고 선택된 값들을 제거
        const updatedAllergy = selectedAllergy.filter((item) => item !== "");
        setSelectedAllergy([...updatedAllergy, allergy]);
      }
    }
  };

  //서버로 사용자의 입력값을 보내준다. 등록버튼 클릭 시 호출.
  const handleNext = () => {
    console.log(photos); // photos를 출력
    console.log(PhoneNumber); // 핸드폰 번호 출력
    console.log(inputValue);  // 이름 출력
    console.log(selectedVeganItemId); // 선택된 비건 정보 출력
    console.log(selectedReligion); // 선택된 종교 정보 출력
    console.log(selectedAllergy); // 선택된 알레르기 정보 출력



    // 서버로 데이터 전송
    const postData = {
      user_name: inputValue,
      user_phonenum: PhoneNumber,
      user_allergy: selectedAllergy,
      user_face_info : photos.join('||')
    };

    if (selectedVeganItemId !== 0) {
      postData.user_vegetarian = selectedVeganItemId;
    }

    if (selectedReligion !== 0) {
      postData.religion = selectedReligion;
    }
    
    axios.post(`${BASE_URL}/signup/`, postData)  // '서버 URL' 부분에 테스트할 서버 주소 넣어주면 됨.
      .then(response => {
        console.log(postData);
        console.log(response.data);  // 요청 성공시 alert 하나 해줄 예정.
        alert("사용자 등록이 완료되었습니다");
        navigate("/complete", { state: { inputValue, PhoneNumber, photos, selectedVeganItemId, selectedReligion, selectedAllergy } });

      })
      .catch(error => {
        console.log(postData);
        console.error(error);
        alert("사용자 등록이 실패했습니다. 다시 시도해주세요.");
      });

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
              <div className="row_2_button_area_2">
                <div className="button_pair">
                  <div
                    className={`row_2_button ${selectedAllergy.length === 0 ? 'selected' : ''}`}
                    onClick={() => handleClickAllergy("")}
                  >
                    해당없음
                  </div>

                  <div
                    className={`row_2_button ${selectedAllergy.includes('통밀') ? 'selected' : ''}`}
                    id="통밀"
                    onClick={() => handleClickAllergy('통밀')}
                  >
                    메밀
                  </div>
                </div>

                <div className="button_pair">
                  <div
                    className={`row_2_button ${selectedAllergy.includes('밀') ? 'selected' : ''}`}
                    id="밀"
                    onClick={() => handleClickAllergy('밀')}
                  >
                    밀
                  </div>
                  <div
                    className={`row_2_button ${selectedAllergy.includes('대두') ? 'selected' : ''}`}
                    id="대두"
                    onClick={() => handleClickAllergy('대두')}
                  >
                    대두
                  </div>

                </div>

                <div className="button_pair">
                  <div
                    className={`row_2_button ${selectedAllergy.includes('호두') ? 'selected' : ''}`}
                    id="호두"
                    onClick={() => handleClickAllergy('호두')}
                  >
                    호두
                  </div>
                  <div
                    className={`row_2_button ${selectedAllergy.includes('땅콩') ? 'selected' : ''}`}
                    id="땅콩"
                    onClick={() => handleClickAllergy('땅콩')}
                  >
                    땅콩
                  </div>

                </div>

                <div className="button_pair">
                  <div
                    className={`row_2_button ${selectedAllergy.includes('복숭아') ? 'selected' : ''}`}
                    id="복숭아"
                    onClick={() => handleClickAllergy('복숭아')}
                  >
                    복숭아
                  </div>
                  <div
                    className={`row_2_button ${selectedAllergy.includes('토마토') ? 'selected' : ''}`}
                    id="토마토"
                    onClick={() => handleClickAllergy('토마토')}
                  >
                    토마토
                  </div>

                </div>

                <div className="button_pair">
                  <div
                    className={`row_2_button ${selectedAllergy.includes('돼지고기') ? 'selected' : ''}`}
                    id="돼지고기"
                    onClick={() => handleClickAllergy('돼지고기')}
                  >
                    돼지고기
                  </div>
                  <div
                    className={`row_2_button ${selectedAllergy.includes('계란') ? 'selected' : ''}`}
                    id="계란"
                    onClick={() => handleClickAllergy('계란')}
                  >
                    난류
                  </div>

                </div>

                <div className="button_pair">
                  <div
                    className={`row_2_button ${selectedAllergy.includes('우유') ? 'selected' : ''}`}
                    id="우유"
                    onClick={() => handleClickAllergy('우유')}
                  >
                    우유
                  </div>
                  <div
                    className={`row_2_button ${selectedAllergy.includes('닭고기') ? 'selected' : ''}`}
                    id="닭고기"
                    onClick={() => handleClickAllergy('닭고기')}
                  >
                    닭고기
                  </div>

                </div>

                <div className="button_pair">
                  <div
                    className={`row_2_button ${selectedAllergy.includes('소고기') ? 'selected' : ''}`}
                    id="소고기"
                    onClick={() => handleClickAllergy('소고기')}
                  >
                    쇠고기
                  </div>
                  <div
                    className={`row_2_button ${selectedAllergy.includes('새우') ? 'selected' : ''}`}
                    id="새우"
                    onClick={() => handleClickAllergy('새우')}
                  >
                    새우
                  </div>

                </div>
                <div className="button_pair">
                  <div
                    className={`row_2_button ${selectedAllergy.includes('고등어') ? 'selected' : ''}`}
                    id="고등어"
                    onClick={() => handleClickAllergy('고등어')}
                  >
                    고등어
                  </div>
                  <div
                    className={`row_2_button ${selectedAllergy.includes('홍합') ? 'selected' : ''}`}
                    id="홍합"
                    onClick={() => handleClickAllergy('홍합')}
                  >
                    홍합
                  </div>

                </div>

                <div className="button_pair">
                  <div
                    className={`row_2_button ${selectedAllergy.includes('전복') ? 'selected' : ''}`}
                    id="전복"
                    onClick={() => handleClickAllergy('전복')}
                  >
                    전복
                  </div>
                  <div
                    className={`row_2_button ${selectedAllergy.includes('굴') ? 'selected' : ''}`}
                    id="굴"
                    onClick={() => handleClickAllergy('굴')}
                  >
                    귤
                  </div>

                </div>

                <div className="button_pair">
                  <div
                    className={`row_2_button ${selectedAllergy.includes('조개류') ? 'selected' : ''}`}
                    id="조개류"
                    onClick={() => handleClickAllergy('조개류')}
                  >
                    조개류
                  </div>
                  <div
                    className={`row_2_button ${selectedAllergy.includes('게') ? 'selected' : ''}`}
                    id="게"
                    onClick={() => handleClickAllergy('게')}
                  >
                    게
                  </div>

                </div>

                <div className="button_pair">
                  <div
                    className={`row_2_button ${selectedAllergy.includes('오징어') ? 'selected' : ''}`}
                    id="오징어"
                    onClick={() => handleClickAllergy('오징어')}
                  >
                    오징어
                  </div>
                  <div
                    className={`row_2_button ${selectedAllergy.includes('아황산 포함식품') ? 'selected' : ''}`}
                    id="아황산 포함식품"
                    onClick={() => handleClickAllergy('아황산 포함식품')}
                  >
                    아황산 포함식품
                  </div>
                </div>
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



