import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

/*Router 이동을 위한 import*/
import FaceReco from "./FaceReco";
import Vegan_Religion_Check from "./Vegan_Religion_Check";
import UserName from "./UserName";
import Allergy from "./Allergy";
import PhoneNum from "./PhoneNum";
import Complete from "./Complete";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<FaceReco />} /> {/* Default route */}
        <Route path="/Vegan_Religion_Check" element= {<Vegan_Religion_Check />} />
        <Route path="/phonenum" element = {<PhoneNum/>} />
        <Route path="/username" element={<UserName />} />
        <Route path="/allergy" element={<Allergy />} />
        <Route path="/Complete" element={<Complete />} />
      </Routes>
    </div>
  );
}

export default App;