import React, { useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";

/*Router 이동을 위한 import*/
import FaceReco from "./FaceReco";
import Vegan_Religion_Check from "./Vegan_Religion_Check";
import UserName from "./UserName";
import Allergy from "./Allergy";
import PhoneNum from "./PhoneNum";
import Complete from "./Complete";
import Alert from './Alert';

function App() {
  const [alertVisibility, setAlertVisibility] = useState(false);
  const [alertMessage, setAlertMessage] = useState('This is an alert message.');

  const showAlert = (message) => {
    setAlertMessage(message);
    setAlertVisibility(true);
  };

  return (
    <div>
      <HashRouter>
        <Alert message={alertMessage} visibility={alertVisibility} setVisibility={setAlertVisibility} />
        <Routes>
          <Route path="/" element={<FaceReco />} /> {/* Default route */}
          <Route path="/Vegan_Religion_Check" element= {<Vegan_Religion_Check />} />
          <Route path="/phonenum" element = {<PhoneNum showAlert={showAlert}/>} />
          <Route path="/username" element={<UserName showAlert={showAlert} />} />
          <Route path="/allergy" element={<Allergy showAlert={showAlert} />} />
          <Route path="/Complete" element={<Complete />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;