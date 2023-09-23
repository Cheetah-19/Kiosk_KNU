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
    const VegancheckboxValue = location.state.VegancheckboxValue;
    const ReligioncheckboxValue = location.state.checkedBox;
    const AllergyInfo = [];
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
      food_containing_sulfite: false
    });

    const handleCheckboxChange = (event) => {
      const { id, checked } = event.target;
      setCheckboxes(prevState => ({
          ...prevState, [id]: checked
      }));
    };

    //서버로 사용자의 입력값을 보내준다. 등록버튼 클릭 시 호출.
    const handleButtonClick = () => {
        // 체크된 항목 AllergyInfo 배열에 추가
      const selectedAllergies = Object.entries(checkboxes)
          .filter(([_, checked]) => checked)
          .map(([allergy]) => allergy);
        
      AllergyInfo.push(...selectedAllergies);
      console.log(AllergyInfo);
        
        // 서버로 데이터 전송
      const postData = {
        user_name : inputValue,
        user_phonenum : PhoneNumber,
        user_vegetarian : VegancheckboxValue,
        user_allergy : AllergyInfo,
        religion : ReligioncheckboxValue
      };

      axios.post('서버 URL', postData) // '서버 URL' 부분에 테스트할 서버 주소 넣어주면 됨.
        .then(response => {
            console.log(response.data);  //요청 성공시 alert 하나 해줄 예정.
            alert("사용자 등록이 완료되었습니다");
        })
        .catch(error => {
            //error catch시
            console.error(error);
            alert("사용자 등록이 실패했습니다. 다시 시도해주세요.");
        });
    };

    return (
      <div>
        <set>
          <header>Easy KIOSK</header>
          <body>
            <div className='upper-t'>알러지 확인 페이지</div>
            {Object.entries(checkboxes).map(([allergy, checked]) => (
               <div key={allergy}>
                   <input type="checkbox" id={allergy} checked={checked} onChange={handleCheckboxChange} />
                   <label htmlFor={allergy}>{allergy}</label>
               </div>
           ))}
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