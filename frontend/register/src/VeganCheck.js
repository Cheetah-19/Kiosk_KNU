import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import "./Common.css";

export default function VeganCheck() {
    const navigate = useNavigate(); // useNavigate hook to get the navigate function
    const location = useLocation();

    const PhoneNumber = location.state.PhoneNumber;
    const inputValue = location.state.inputValue;
    
    return (
      <div>
        <set>
          <header>Easy KIOSK</header>
          <body>
            <div className="upper-t">혹시 비건이신가요?</div>
            <br/>
            <button className= "next-button" onClick={() => navigate("/vegan", { state : {inputValue, PhoneNumber } })}>네</button>
            <br/>
            <br/>
            <button className= "next-button" onClick={() => navigate("/religioncheck", { state: { inputValue, PhoneNumber } })}>해당없음</button>
          </body>
          <footer>
          </footer>
        </set>
        {/* Face recognition content... */}
      </div>
    );
}