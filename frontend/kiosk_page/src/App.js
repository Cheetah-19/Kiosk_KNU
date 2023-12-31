import React, { useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import MealOption from "./kiosk/MealOption";
import StartMenu from "./login/StartMenu";
import MainMenu from "./kiosk/MainMenu";
import Pay from "./kiosk/Pay";
import PayCheck from "./kiosk/PayCheck";
import SignUp from "./kiosk/SignUp";
import Face from "./login/Face";
import LoginCheck from "./login/LoginCheck";
import PhoneNum from "./login/PhoneNum";
import Admin from "./admin/Admin";
import ManageOption from "./admin/ManageOption";
import ManageMenu from "./admin/ManageMenu";
import ManageCategory from "./admin/ManageCategory";
import AddCategories from "./admin/AddCategories";
import AddOptions from "./admin/AddOptions";
import AddIngredients from "./admin/AddIngredient";
import AddLast from "./admin/AddLast";
import Alert from './reuse/Alert';

function App() {
  const [alertVisibility, setAlertVisibility] = useState(false);
  const [alertMessage, setAlertMessage] = useState('This is an alert message.');

  const showAlert = (message) => {
    setAlertMessage(message);
    setAlertVisibility(true);
  };

  return (
    <HashRouter>
      <Alert message={alertMessage} visibility={alertVisibility} setVisibility={setAlertVisibility} />
      <Routes>
        <Route path="/" element={<StartMenu />} /> {/* Default route */}
        <Route path="/LoginCheck" element={<LoginCheck showAlert={showAlert} />} />
        <Route path="/PhoneNum" element={<PhoneNum />} />
        <Route path="/Face" element={<Face />} /> {/* Default route */}
        <Route path="/MealOption" element={<MealOption />} /> {/* Default route */}
        <Route path="/MainMenu" element={<MainMenu />} /> {/* Default route */}
        <Route path="/Pay" element={<Pay />} /> {/* Default route */}
        <Route path="/PayCheck" element={<PayCheck />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/ManageOption" element={<ManageOption showAlert={showAlert} />} />
        <Route path="/ManageCategory" element={<ManageCategory showAlert={showAlert} />} />
        <Route path="/ManageMenu" element={<ManageMenu showAlert={showAlert} />} />
        <Route path="/AddCategories" element={<AddCategories showAlert={showAlert} />} />
        <Route path="/AddOptions" element={<AddOptions showAlert={showAlert} />} />
        <Route path="/AddIngredient" element={<AddIngredients showAlert={showAlert} />} />
        <Route path="/AddLast" element={<AddLast showAlert={showAlert} />} />
        
      </Routes>
    </HashRouter>
  );
}

export default App;