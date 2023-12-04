import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import MealOption from "./MealOption";
import StartMenu from "./StartMenu";
import MainMenu from "./MainMenu";
import Pay from "./Pay";
import PayCheck from "./PayCheck";
import SignUp from "./SignUp";
import Face from "./Face";
import LoginCheck from "./LoginCheck";
import PhoneNum from "./PhoneNum";
import Admin from "./admin/Admin";
import Delete from "./admin/Delete";

function App() {
  return (
      <Routes>
        <Route path="/" element={<StartMenu />} /> {/* Default route */}
        <Route path="/LoginCheck" element={<LoginCheck />} />
        <Route path="/PhoneNum" element={<PhoneNum />} />
        <Route path="/Face" element={<Face />} /> {/* Default route */}
        <Route path="/MealOption" element={<MealOption />} /> {/* Default route */}
        <Route path="/MainMenu" element={<MainMenu />} /> {/* Default route */}
        <Route path="/Pay" element={<Pay />} /> {/* Default route */}
        <Route path="/PayCheck" element={<PayCheck />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Delete" element={<Delete />} />
      </Routes>
  );
}

export default App;