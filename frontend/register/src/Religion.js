import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Religion() {
    const navigate = useNavigate(); // useNavigate hook to get the navigate function

    return (
      <div>
        {/* Religion content... */}
        <button onClick={() => navigate("/Allergy")}>종교관련페이지</button> {/* Button to navigate to the next page */}
      </div>
    );
}