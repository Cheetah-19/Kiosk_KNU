import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

/*Router 이동을 위한 import*/
import FaceReco from "./FaceReco";
import UserName from "./UserName";
import Vegan from "./Vegan";
import Religion from "./Religion";
import Allergy from "./Allergy";
import PhoneNum from "./PhoneNum";
import VeganCheck from "./VeganCheck";
import AllergyCheck from "./AllergyCheck";
import ReligionCheck from "./ReligionCheck";
import Complete from "./Complete";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<FaceReco />} /> {/* Default route */}
        <Route path="/vegan" element= {<Vegan />} />
        <Route path="/vegancheck" element= {<VeganCheck />} />
        <Route path="/religioncheck" element= {<ReligionCheck />} />
        <Route path="/allergycheck" element= {<AllergyCheck />} />
        <Route path="/phonenum" element = {<PhoneNum/>} />
        <Route path="/username" element={<UserName />} />
        <Route path="/religion" element={<Religion />} />
        <Route path="/allergy" element={<Allergy />} />
        <Route path="/Complete" element={<Complete />} />
      </Routes>
    </div>
  );
}

export default App;