import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./Common.css";

export default function Religion() {
    const navigate = useNavigate(); // useNavigate hook to get the navigate function
    const location = useLocation();
    const PhoneNumber = location.state.PhoneNumber;
    const inputValue = location.state.inputValue;
    const VegancheckboxValue = location.state.checkedBox;

    // 체크박스 초기화
    const [checkboxes, setCheckboxes] = useState({
      one: false,
      two: false,
      three: false,
      four: false,
      five: false,
      six: false
  });

    // 체크박스 변경사항 있을시
  const handleCheckboxChange = (event) => {
    setCheckboxes({ ...checkboxes, [event.target.id]: event.target.checked });
  };

  // 체크박스 클릭시
  const handleButtonClick = () => {
    const checkedCount = Object.values(checkboxes).filter(Boolean).length;
    if (checkedCount === 0) {
        alert("1개의 체크박스를 선택해주세요");
    } else if (checkedCount > 1) {
        alert("1개의 체크박스만 선택해주세요");
    } else {
      const checkedId = Object.keys(checkboxes).find(id => checkboxes[id]);
      navigate('/Allergy', { state: { inputValue, PhoneNumber, VegancheckboxValue, checkedBox: checkedId } });
    }
};

    return (
      <div>
        <set>
          <header>Easy KIOSK</header>
          <body>사용자명 : {inputValue} <br /> 전화번호 : {PhoneNumber} <br /> 비건 체크박스 : {VegancheckboxValue} 
          {/* Checkbox inputs */}
          <div classname = "check-box-out">
                <div>
                  <input type="checkbox" id="one" name="number" value="1" onChange={handleCheckboxChange} />
                  <label htmlFor="one">프루테리언</label>
                </div>
                <div>
                  <input type="checkbox" id="two" name="number" value="2" onChange={handleCheckboxChange} />
                  <label htmlFor="two">비건</label>
                </div>
                <div>
                  <input type="checkbox" id ="three"name ="number"value ="3" onChange={handleCheckboxChange} />
                  <label htmlFor ="three">락토</label>
                </div>
                <div>
                  <input type="checkbox" id="four" name="number" value="4" onChange={handleCheckboxChange} />
                  <label htmlFor="one">오보</label>
                </div>
                <div>
                  <input type="checkbox" id="five" name="number" value="5" onChange={handleCheckboxChange} />
                  <label htmlFor="two">락토오보</label>
                </div>
                <div>
                  <input type="checkbox" id ="six"name ="number"value ="6" onChange={handleCheckboxChange} />
                  <label htmlFor ="three">페스코</label>
                </div>
                <div>
                  <input type="checkbox" id ="seven"name ="number"value ="7" onChange={handleCheckboxChange} />
                  <label htmlFor ="three">폴로</label>
                </div>
                <div>
                  <input type="checkbox" id ="eight"name ="number"value ="8" onChange={handleCheckboxChange} />
                  <label htmlFor ="three">해당없음</label>
                </div>
            </div>
          </body>
          <footer>
          <div className="blinking-text">나의 정보를 등록하세요 5/6</div>
            <button className = "next-button" onClick={(handleButtonClick)}>종교관련페이지</button> {/* Button to navigate to the next page */}
          </footer>
        </set>        
        {/* Religion content... */}
      </div>
    );
}