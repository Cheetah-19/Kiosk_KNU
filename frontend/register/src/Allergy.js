import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';


import "./Common.css";


export default function FaceReco() {

  // const BASE_URL = 'https://kioskknu2023.run.goorm.site';
  const BASE_URL = 'http://127.0.0.1:8000';

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
                    className={`row_2_button ${selectedAllergy.includes('Buckwheat') ? 'selected' : ''}`}
                    id="Buckwheat"
                    onClick={() => handleClickAllergy('Buckwheat')}
                  >
                    메밀
                  </div>
                </div>

                <div className="button_pair">
                  <div
                    className={`row_2_button ${selectedAllergy.includes('Wheat') ? 'selected' : ''}`}
                    id="Wheat"
                    onClick={() => handleClickAllergy('Wheat')}
                  >
                    밀
                  </div>
                  <div
                    className={`row_2_button ${selectedAllergy.includes('Soybean') ? 'selected' : ''}`}
                    id="Soybean"
                    onClick={() => handleClickAllergy('Soybean')}
                  >
                    대두
                  </div>

                </div>

                <div className="button_pair">
                  <div
                    className={`row_2_button ${selectedAllergy.includes('Walnut') ? 'selected' : ''}`}
                    id="Walnut"
                    onClick={() => handleClickAllergy('Walnut')}
                  >
                    호두
                  </div>
                  <div
                    className={`row_2_button ${selectedAllergy.includes('Peanut') ? 'selected' : ''}`}
                    id="Peanut"
                    onClick={() => handleClickAllergy('Peanut')}
                  >
                    땅콩
                  </div>

                </div>

                <div className="button_pair">
                  <div
                    className={`row_2_button ${selectedAllergy.includes('Peach') ? 'selected' : ''}`}
                    id="Peach"
                    onClick={() => handleClickAllergy('Peach')}
                  >
                    복숭아
                  </div>
                  <div
                    className={`row_2_button ${selectedAllergy.includes('Tomato') ? 'selected' : ''}`}
                    id="Tomato"
                    onClick={() => handleClickAllergy('Tomato')}
                  >
                    토마토
                  </div>

                </div>

                <div className="button_pair">
                  <div
                    className={`row_2_button ${selectedAllergy.includes('Pork') ? 'selected' : ''}`}
                    id="Pork"
                    onClick={() => handleClickAllergy('Pork')}
                  >
                    돼지고기
                  </div>
                  <div
                    className={`row_2_button ${selectedAllergy.includes('Egg') ? 'selected' : ''}`}
                    id="Egg"
                    onClick={() => handleClickAllergy('Egg')}
                  >
                    난류
                  </div>

                </div>

                <div className="button_pair">
                  <div
                    className={`row_2_button ${selectedAllergy.includes('Milk') ? 'selected' : ''}`}
                    id="Milk"
                    onClick={() => handleClickAllergy('Milk')}
                  >
                    우유
                  </div>
                  <div
                    className={`row_2_button ${selectedAllergy.includes('Chicken') ? 'selected' : ''}`}
                    id="Chicken"
                    onClick={() => handleClickAllergy('Chicken')}
                  >
                    닭고기
                  </div>

                </div>

                <div className="button_pair">
                  <div
                    className={`row_2_button ${selectedAllergy.includes('Beef') ? 'selected' : ''}`}
                    id="Beef"
                    onClick={() => handleClickAllergy('Beef')}
                  >
                    쇠고기
                  </div>
                  <div
                    className={`row_2_button ${selectedAllergy.includes('Shrimp') ? 'selected' : ''}`}
                    id="Shrimp"
                    onClick={() => handleClickAllergy('Shrimp')}
                  >
                    새우
                  </div>

                </div>

                <div className="button_pair">
                  <div
                    className={`row_2_button ${selectedAllergy.includes('Mackerel') ? 'selected' : ''}`}
                    id="Mackerel"
                    onClick={() => handleClickAllergy('Mackerel')}
                  >
                    고등어
                  </div>
                  <div
                    className={`row_2_button ${selectedAllergy.includes('Mussels') ? 'selected' : ''}`}
                    id="Mussels"
                    onClick={() => handleClickAllergy('Mussels')}
                  >
                    홍합
                  </div>

                </div>

                <div className="button_pair">
                  <div
                    className={`row_2_button ${selectedAllergy.includes('Abalone') ? 'selected' : ''}`}
                    id="Abalone"
                    onClick={() => handleClickAllergy('Abalone')}
                  >
                    전복
                  </div>
                  <div
                    className={`row_2_button ${selectedAllergy.includes('Oyster') ? 'selected' : ''}`}
                    id="Oyster"
                    onClick={() => handleClickAllergy('Oyster')}
                  >
                    귤
                  </div>

                </div>

                <div className="button_pair">
                  <div
                    className={`row_2_button ${selectedAllergy.includes('shellfish') ? 'selected' : ''}`}
                    id="shellfish"
                    onClick={() => handleClickAllergy('shellfish')}
                  >
                    조개류
                  </div>
                  <div
                    className={`row_2_button ${selectedAllergy.includes('Crab') ? 'selected' : ''}`}
                    id="Crab"
                    onClick={() => handleClickAllergy('Crab')}
                  >
                    게
                  </div>

                </div>

                <div className="button_pair">
                  <div
                    className={`row_2_button ${selectedAllergy.includes('Squid') ? 'selected' : ''}`}
                    id="Squid"
                    onClick={() => handleClickAllergy('Squid')}
                  >
                    오징어
                  </div>
                  <div
                    className={`row_2_button ${selectedAllergy.includes('food_containing_Sulfite') ? 'selected' : ''}`}
                    id="food_containing_Sulfite"
                    onClick={() => handleClickAllergy('food_containing_Sulfite')}
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



