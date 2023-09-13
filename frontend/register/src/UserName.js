import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Common.css";
import "./UserName.css";

export default function UserName() {
    const navigate = useNavigate(); // useNavigate hook to get the navigate function
    const [inputValue, setInputValue] = useState('');
    //inputValue에 사용자의 입력값이 담기게 된다. {inputValue}로 확인가능
    const handleChange = (event) => {
      setInputValue(event.target.value);
    }

    return (
      <div>
        <set>
          <header>Easy KIOSK</header>
          <body>
              <div className="upper-t">사용자명을 입력해주세요</div>
              <br/>
              <input className ="input-des" type="text" value={inputValue} onChange={handleChange} />
          </body>
          <footer>
          <div className="blinking-text">나의 정보를 등록하세요 2/5</div>
            <button className = "next-button" onClick={() => navigate("/Vegan")}>사용자명 페이지</button> {/* Button to navigate to the next page */}
          </footer>
        </set>      
        {/* User Name Content... */}
      </div>
    );
}