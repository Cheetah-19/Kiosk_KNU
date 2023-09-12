import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserName() {
    const navigate = useNavigate(); // useNavigate hook to get the navigate function

    return (
      <div>
        {/* User Name Content... */}
        <button onClick={() => navigate("/Religion")}>사용자명입력페이지</button> {/* Button to navigate to the next page */}
      </div>
    );
}