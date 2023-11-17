import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import MealOption from "./MealOption";
import StartMenu from "./StartMenu";
import MainMenu from "./MainMenu";
import Pay from "./Pay";
import Face from "./Face";
import LoginCheck from "./LoginCheck";
import PhoneNum from "./PhoneNum";

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
      </Routes>
  );
}

export default App;