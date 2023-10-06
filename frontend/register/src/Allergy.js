import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./Common.css";

function Allergy() {
    const navigate = useNavigate(); // useNavigate hook to get the navigate function
    const location = useLocation();
    const PhoneNumber = location.state.PhoneNumber;
    const inputValue = location.state.inputValue;

    let ReligioncheckboxValue = location.state.checkedBox;
    if (typeof ReligioncheckboxValue === 'undefined') {
      ReligioncheckboxValue = 0;
      console.log('종교쪽 체크박스 없는상태.')
    }

    const [allergyInfo, setAllergyInfo] = useState([]);

    let VegancheckboxValue = location.state.checkedBox;
    if (typeof VegancheckboxValue === 'undefined') {
        VegancheckboxValue = 0;
        console.log('비건쪽 체크박스 없는상태.')
    }

    //넘어온 정보 확인하려면 <body> 아래에 16번줄 코드 넣기.
    //사용자명 : {inputValue} <br /> 전화번호 : {PhoneNumber} <br /> 비건 체크박스 : {VegancheckboxValue} <br /> 종교 체크박스 : {ReligioncheckboxValue}
    //알러지 체크박스 21종
    const [checkboxes, setCheckboxes] = useState({
      Buckwheat: false,
      Wheat: false,
      Soybean: false,
      Peanut: false,
      Peach: false,
      Tomato: false,
      Pork: false,
      Egg: false,
      Milk: false,
      Chicken: false,
      Beef: false,
      Shrimp: false,
      Mackerel: false,
      Mussels: false,
      Abalone: false,
      Oyster: false,
      Shellfish: false,
      Crab: false,
      Squid: false,
      food_containing_Sulfite: false,
      해당없음: false
    });

    const handleCheckboxChange = (event) => {
        const { id, checked } = event.target;
        if (checked) {
            setAllergyInfo(prevState => [...prevState, id]);
        } else {
            setAllergyInfo(prevState => prevState.filter(allergy => allergy !== id));
        }
    };

    //서버로 사용자의 입력값을 보내준다. 등록버튼 클릭 시 호출.
    const handleButtonClick = () => {
      console.log(allergyInfo); // 선택된 알러지 정보 확인
      console.log(ReligioncheckboxValue); // 종교 체크박스 값 확인
      console.log(VegancheckboxValue); // 비건 체크박스 값 확인

      // 서버로 데이터 전송
      const postData = {
          user_name: inputValue,
          user_phonenum: PhoneNumber,
          user_allergy: allergyInfo
      };
      
      if (VegancheckboxValue !== 0) {
        postData.user_vegetarian = VegancheckboxValue;
      }

      if (ReligioncheckboxValue !== 0) {
        postData.religion = ReligioncheckboxValue;
      }

      axios.post('http://127.0.0.1:8000/signup/', postData)  // '서버 URL' 부분에 테스트할 서버 주소 넣어주면 됨.
          .then(response => {
              console.log(response.data);  // 요청 성공시 alert 하나 해줄 예정.
              alert("사용자 등록이 완료되었습니다");
          })
          .catch(error => {
              console.error(error);
              alert("사용자 등록이 실패했습니다. 다시 시도해주세요.");
          });
  };

    return (
      <div>
        <set>
          <header>Easy KIOSK</header>
          <body>
            <div>
              <input type="checkbox" id="Buckwheat" name="number" value="1" onChange={handleCheckboxChange} />
              <label htmlFor="Buckwheat">메밀</label>
            </div>
            <div>
              <input type="checkbox" id="Wheat" name="number" value="1" onChange={handleCheckboxChange} />
              <label htmlFor="Wheat">밀</label>
            </div>
            <div>
              <input type="checkbox" id="Soybean" name="number" value="1" onChange={handleCheckboxChange} />
              <label htmlFor="Soybean">대두</label>
            </div>
            <div>
              <input type="checkbox" id="Walnut" name="number" value="1" onChange={handleCheckboxChange} />
              <label htmlFor="Walnut">호두</label>
            </div>
            <div>
              <input type="checkbox" id="Peanut" name="number" value="1" onChange={handleCheckboxChange} />
              <label htmlFor="Peanut">땅콩</label>
            </div>
            <div>
              <input type="checkbox" id="Peach" name="number" value="1" onChange={handleCheckboxChange} />
              <label htmlFor="Peach">복숭아</label>
            </div>
            <div>
              <input type="checkbox" id="Tomato" name="number" value="1" onChange={handleCheckboxChange} />
              <label htmlFor="Tomato">토마토</label>
            </div>
            <div>
              <input type="checkbox" id="Pork" name="number" value="1" onChange={handleCheckboxChange} />
              <label htmlFor="Pork">돼지고기</label>
            </div>
            <div>
              <input type="checkbox" id="Egg" name="number" value="1" onChange={handleCheckboxChange} />
              <label htmlFor="Egg">난류</label>
            </div>
            <div>
              <input type="checkbox" id="Milk" name="number" value="1" onChange={handleCheckboxChange} />
              <label htmlFor="Milk">우유</label>
            </div>
            <div>
              <input type="checkbox" id="Chicken" name="number" value="1" onChange={handleCheckboxChange} />
              <label htmlFor="Chicken">닭고기</label>
            </div>
            <div>
              <input type="checkbox" id="Beef" name="number" value="1" onChange={handleCheckboxChange} />
              <label htmlFor="Beef">쇠고기</label>
            </div>
            <div>
              <input type="checkbox" id="Shrimp" name="number" value="1" onChange={handleCheckboxChange} />
              <label htmlFor="Shrimp">새우</label>
            </div>
            <div>
              <input type="checkbox" id="Mackerel" name="number" value="1" onChange={handleCheckboxChange} />
              <label htmlFor="Mackerel">고등어</label>
            </div>
            <div>
              <input type="checkbox" id="Mussels" name="number" value="1" onChange={handleCheckboxChange} />
              <label htmlFor="Mussels">홍합</label>
            </div>
            <div>
              <input type="checkbox" id="Abalone" name="number" value="1" onChange={handleCheckboxChange} />
              <label htmlFor="Abalone">전복</label>
            </div>
            <div>
              <input type="checkbox" id="Oyster" name="number" value="1" onChange={handleCheckboxChange} />
              <label htmlFor="Oyster">굴</label>
            </div>
            <div>
              <input type="checkbox" id="shellfish" name="number" value="1" onChange={handleCheckboxChange} />
              <label htmlFor="shellfish">조개류</label>
            </div>
            <div>
              <input type="checkbox" id="Crab" name="number" value="1" onChange={handleCheckboxChange} />
              <label htmlFor="Crab">게</label>
            </div>
            <div>
              <input type="checkbox" id="Squid" name="number" value="1" onChange={handleCheckboxChange} />
              <label htmlFor="Squid">오징어</label>
            </div>
            <div>
              <input type="checkbox" id="food_containing_Sulfite" name="number" value="1" onChange={handleCheckboxChange} />
              <label htmlFor="food_containing_Sulfite">아황산 포함식품</label>
            </div>
          </body>
          <footer>
            <div className="blinking-text">나의 정보를 등록하세요 6/6</div>
            <button className = "next-button" onClick={(handleButtonClick)}>등록</button> {/* Button to navigate to the next page */}
          </footer>
        </set>
      </div>
    )
}
export default Allergy;