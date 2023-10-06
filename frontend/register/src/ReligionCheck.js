import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import "./Common.css";

export default function ReligionCheck() {
    const navigate = useNavigate(); // useNavigate hook to get the navigate function
    const location = useLocation();

    const PhoneNumber = location.state.PhoneNumber;
    const inputValue = location.state.inputValue;
    
    return (
      <div>
        <set>
          <header>Easy KIOSK</header>
          <body>
            <div className="upper-t">믿으시는 종교가 있으신가요?</div>
            <br/>
            <button className= "next-button" onClick={() => navigate("/religion", { state : {inputValue, PhoneNumber } })}>네</button>
            <br/>
            <br/>
            <button className= "next-button" onClick={() => navigate("/allergycheck", { state: { inputValue, PhoneNumber } })}>무교</button>
          </body>
          <footer>
          </footer>
        </set>
        {/* Face recognition content... */}
      </div>
    );
}