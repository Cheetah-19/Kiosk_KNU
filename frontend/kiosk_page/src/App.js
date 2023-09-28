import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import MealOption from "./MealOption";
import StartMenu from "./StartMenu";
import MainMenu from "./MainMenu";


function App() {
  return (
    <div >
      <Routes>
        <Route path="/" element={<StartMenu />} /> {/* Default route */}
        <Route path="/MealOption" element={<MealOption />} /> {/* Default route */}
        <Route path="/MainMenu" element={<MainMenu />} /> {/* Default route */}
      </Routes>
    </div>
  );
}

export default App;