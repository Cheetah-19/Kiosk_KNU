import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

/*Router 이동을 위한 import*/
import FaceReco from "./FaceReco";
import UserName from "./UserName";
import Religion from "./Religion";
import Allergy from "./Allergy";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<FaceReco />} /> {/* Default route */}
        <Route path="/username" element={<UserName />} />
        <Route path="/religion" element={<Religion />} />
        <Route path="/allergy" element={<Allergy />} />
      </Routes>
    </div>
  );
}

export default App;