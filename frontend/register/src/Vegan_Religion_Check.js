import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "./Common.css";

export default function FaceReco() {
  const navigate = useNavigate();
  const location = useLocation();

  const photos = location.state.photos;
  const PhoneNumber = location.state.PhoneNumber;
  const inputValue = location.state.inputValue;

  const [selectedItemId, setSelectedItemId] = useState("");
  const [isUnchecked, setIsUnchecked] = useState(true); // uncheck 상태 여부를 추적하는 상태 추가
  const [selectedReligion, setSelectedReligion] = useState(""); // 'None'으로 초기화


  const handleNext = () => {
      navigate("/Allergy", { state: { inputValue, PhoneNumber, photos, selectedItemId, selectedReligion } });
  };

  //이전으로
  const resetPhotos = () => {
    navigate('/PhoneNum', { state: { PhoneNumber: null } });
  };

  //비건 체크 박스
  const handleUncheck = () => {
    setIsUnchecked((prevValue) => {
      if (prevValue) {
        setSelectedItemId(""); // uncheck 상태이면 selectedItemId를 'None'으로 설정
      }
      return !prevValue; // 상태를 토글하여 변경
    });
  };


  //드롭다운
  const handleDropdownSelect = (selectedItemId) => {
    setSelectedItemId(selectedItemId);
    setIsUnchecked(false); // 드롭다운 선택 시 상태 변경
  };

  //종교 선택
  const handleClickReligion = (religion) => {
    if (selectedReligion === religion) {
      setSelectedReligion(null);
    } else {
      setSelectedReligion(religion);
    }
  };

  const dropdownItems = [
    { id: 'Fruiterian', label: '프루테리언' },
    { id: 'Vegan', label: '비건' },
    { id: 'Lacto', label: '락토' },
    { id: 'Ovo', label: '오보' },
    { id: 'LactoOvo', label: '락토오보' },
    { id: 'Pesco', label: '페스코' },
    { id: 'Pollo', label: '폴로' },
  ];


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
              <div className="top_section">
                해당되는 항목에 체크해주세요
              </div>
              <div className="middle_section">
                <div className="row">
                  <div className="left">
                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 4 4">
                      <circle cx="2" cy="2" r="2" fill="#FF7A00" />
                    </svg>
                  </div>
                  <div className="center">비건 여부</div>
                  <div className="right">
                    <div
                      id={`${isUnchecked ? 'uncheck' : 'check'}`}
                      onClick={handleUncheck}
                    ></div>
                  </div>
                </div>
                <div className="row">
                  <div className="left">
                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 4 4">
                      <circle cx="2" cy="2" r="2" fill={isUnchecked ? '#D9D9D9' : '#FF7A00'} />
                    </svg>
                  </div>
                  <div className="center_2" style={{ color: isUnchecked ? '#D9D9D9' : '#000000' }}>비건 유형</div>
                  <div className="right_2">
                    {/* 드롭다운 활성/비활성 상태에 따라 disabled 속성 추가 */}
                    <select
                      className="select-wrapper"
                      onChange={(e) => handleDropdownSelect(e.target.value)}
                      disabled={isUnchecked}
                    >
                      <option className="drop_text" value="">
                        유형선택하기
                      </option>
                      {dropdownItems.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="bottom_section">
                <div className="row_2">
                  <div className="left">
                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 4 4">
                      <circle cx="2" cy="2" r="2" fill="#FF7A00" />
                    </svg>
                  </div>
                  <div className="center">종교</div>
                  <div className="right"></div>
                </div>
                <div className="row_2_button_area">
                  <div className="line">
                    <div
                      className={`row_2_button_1 ${selectedReligion === "" ? 'selected' : ""}`}
                      onClick={() => handleClickReligion("")}
                    >
                      해당없음
                    </div>
                    <div
                      className={`row_2_button_1 ${selectedReligion === 'Islam' ? 'selected' : ''}`}
                      id="Islam"
                      onClick={() => handleClickReligion('Islam')}
                    >
                      이슬람교
                    </div>
                  </div>
                  <div className="line">
                    <div
                      className={`row_2_button_1 ${selectedReligion === 'Hinduism' ? 'selected' : ''}`}
                      id="Hinduism"
                      onClick={() => handleClickReligion('Hinduism')}
                    >
                      힌두교
                    </div>
                    <div
                      className={`row_2_button_1 ${selectedReligion === 'Buddhism' ? 'selected' : ''}`}
                      id="Buddhism"
                      onClick={() => handleClickReligion('Buddhism')}
                    >
                      불교
                    </div>
                  </div>
                  <div className="line">
                    <div
                      className={`row_2_button_1 ${selectedReligion === 'Judaism' ? 'selected' : ''}`}
                      id="Judaism"
                      onClick={() => handleClickReligion('Judaism')}
                    >
                      유대교
                    </div>
                    <div
                      className={`row_2_button_1 ${selectedReligion === 'Christian' ? 'selected' : ''}`}
                      id="Christian"
                      onClick={() => handleClickReligion('Christian')}
                    >
                      기독교
                    </div>
                  </div>
                  <div className="line">
                    <div
                      className={`row_2_button_1 ${selectedReligion === 'Protestant' ? 'selected' : ''}`}
                      id="Protestant"
                      onClick={() => handleClickReligion('Protestant')}
                    >
                      개신교
                    </div>
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
              console.log(selectedItemId);
              console.log(selectedReligion);

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


