import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "@material-tailwind/react";
import { LoginCard } from "./components/LoginCard";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import LandingPage from "./pages/Landing";
import HRPage from "./pages/HR-Page";
import AttendancePage from "./pages/AttendancePage";
import { keepLogin } from "./redux/slice/employeeSlice";
import { useDispatch } from "react-redux";
import AttendanceLogPage from "./pages/AttendanceLogPage";
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(keepLogin());
  }, []);
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/humanres" element={<HRPage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/attendance" element={<AttendancePage />} />
      <Route path="/attendance/log" element={<AttendanceLogPage />} />
    </Routes>
  );
}

export default App;
