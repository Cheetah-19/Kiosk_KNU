import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function FaceReco() {
    const navigate = useNavigate(); // useNavigate hook to get the navigate function
  
    return (
      <div>
        {/* Face recognition content... */}
        <button onClick={() => navigate("/username")}>얼굴인식페이지</button> {/* Button to navigate to the next page */}
      </div>
    );
}