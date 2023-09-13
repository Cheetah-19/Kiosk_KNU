import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Common.css";

export default function Religion() {
    const navigate = useNavigate(); // useNavigate hook to get the navigate function

    return (
      <div>
        <set>
          <header>Easy KIOSK</header>
          <body>body 자리</body>
          <footer>
            <button className = "next-button" onClick={() => navigate("/Allergy")}>종교관련페이지</button> {/* Button to navigate to the next page */}
          </footer>
        </set>        
        {/* Religion content... */}
      </div>
    );
}