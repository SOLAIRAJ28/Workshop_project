import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PasswordManager from "./components/PasswordManager";
import MainPage from "./components/MainPage";
import SavePassword from "./components/SavePassword";
import ViewPasswords from "./components/ViewPasswords";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/save" element={<SavePassword />} />
        <Route path="/view" element={<ViewPasswords />} />
        <Route path="/vault" element={<PasswordManager />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;