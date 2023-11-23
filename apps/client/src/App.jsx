import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "@material-tailwind/react";
import { LoginCard } from "./components/LoginCard";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import LandingPage from "./pages/Landing";
import HRPage from "./pages/HR-Page";
import { PassResetForm } from "./pages/PassResetPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/humanres" element={<HRPage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/forgotpass" element={<PassResetForm />} />
    </Routes>
  );
}

export default App;
