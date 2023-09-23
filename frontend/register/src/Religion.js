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
      Judaism: false,
      Islam: false,
      Hinduism: false,
      Buddhism: false,
      Christian: false,
      Protestant: false,
      NoReligion: false
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
          <body> 
          {/* Checkbox inputs */}
          <div className="upper-t">종교가 있으신가요?</div>
          <div classname = "check-box-out">
                <div>
                  <input type="checkbox" id="Judaism" name="number" value="1" onChange={handleCheckboxChange} />
                  <label htmlFor="Judaism">유대교</label>
                </div>
                <div>
                  <input type="checkbox" id="Islam" name="number" value="2" onChange={handleCheckboxChange} />
                  <label htmlFor="two">이슬람교</label>
                </div>
                <div>
                  <input type="checkbox" id ="Hinduism"name ="number"value ="3" onChange={handleCheckboxChange} />
                  <label htmlFor ="three">힌두교</label>
                </div>
                <div>
                  <input type="checkbox" id="Buddhism" name="number" value="4" onChange={handleCheckboxChange} />
                  <label htmlFor="one">불교</label>
                </div>
                <div>
                  <input type="checkbox" id="Christian" name="number" value="5" onChange={handleCheckboxChange} />
                  <label htmlFor="two">기독교</label>
                </div>
                <div>
                  <input type="checkbox" id ="Protestant"name ="number"value ="6" onChange={handleCheckboxChange} />
                  <label htmlFor ="three">개신교</label>
                </div>
                <div>
                  <input type="checkbox" id ="NoReligion"name ="number"value ="7" onChange={handleCheckboxChange} />
                  <label htmlFor ="three">무교</label>
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