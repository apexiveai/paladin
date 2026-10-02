import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/layout/Sidebar";

import Topbar from "./components/layout/Topbar";

import Dashboard from "./pages/Dashboard";

import AttendanceAI from "./pages/AttendanceAI";

import Workforce from "./pages/Workforce";

import Assignments from "./pages/Assignments";

import Attendance from "./pages/Attendance";

import Payroll from "./pages/Payroll";

import Sites from "./pages/Sites";

import OCRVerification from "./pages/OCRVerification";

import Reports from "./pages/Reports";

import Settings from "./pages/Settings";

import Security from "./pages/Security";

import "./App.css";

function App() {

  return (

    <BrowserRouter>

      <div className="app">

        <Sidebar />

        <div className="app-content">

          <Topbar />

          <Routes>

            <Route path="/" element={<Dashboard />} />

            <Route path="/workforce" element={<Workforce />} />

            <Route path="/assignments" element={<Assignments />} />

            <Route path="/attendance" element={<Attendance />} />

            <Route path="/payroll" element={<Payroll />} />

            <Route path="/sites" element={<Sites />} />

            <Route path="/attendance-ai" element={<AttendanceAI />} />

            <Route

              path="/ocr-verification"

              element={<OCRVerification />}

            />

            <Route path="/reports" element={<Reports />} />

            <Route path="/settings" element={<Settings />} />

            <Route path="/security" element={<Security />} />

          </Routes>

        </div>

      </div>

    </BrowserRouter>

  );

}

export default App;