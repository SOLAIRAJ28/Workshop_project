import React, { useState } from "react";
import CryptoJS from "crypto-js";
import { FaGlobe, FaUser, FaKey, FaLock, FaSave } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SavePassword = () => {
  const [website, setWebsite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pincode, setPincode] = useState("");

  const handleSave = () => {
    if (!website || !username || !password) {
      toast.error("Website, username, and password are required!");
      return;
    }

    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      toast.error("Please log in first.");
      return;
    }

    let user = JSON.parse(localStorage.getItem(currentUser));
    if (!user) {
      toast.error("User data not found.");
      return;
    }

    let newEntry;
    if (pincode) {
      if (!/^\d{4,}$/.test(pincode)) {
        toast.warning("Pincode must be at least 4 digits (numbers only).",
        );
        return;
      }
      const encryptedPassword = CryptoJS.AES.encrypt(
        password,
        pincode
      ).toString();
      newEntry = {
        site: website,
        username,
        encryptedPassword,
        isEncrypted: true,
      };
    } else {
      newEntry = {
        site: website,
        username,
        password,
        isEncrypted: false,
      };
    }

    const updatedVault = [...(user.vault || []), newEntry];
    user.vault = updatedVault;
    localStorage.setItem(currentUser, JSON.stringify(user));
    toast.success("Password saved successfully!");

    setWebsite("");
    setUsername("");
    setPassword("");
    setPincode("");
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "#f2f4f8",
        fontFamily: "Segoe UI, sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ToastContainer />

      {/* Navbar */}
      <header
        style={{
          width: "97%",
          background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1.2rem 2rem",
          position: "sticky",
          top: 0,
          zIndex: 100,
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <FaLock size={20} color="#fff" />
          <span
            style={{ color: "#fff", fontWeight: "bold", fontSize: "1.2rem" }}
          >
            Password Manager
          </span>
        </div>

        <nav style={{ display: "flex", gap: "1rem" }}>
          <button
            onClick={() => (window.location.href = "/view")}
            style={navBtnStyle}
          >
            Saved Passwords
          </button>
          <button
            onClick={() => (window.location.href = "/save")}
            style={navBtnStyle}
          >
            Add Password
          </button>
        </nav>
      </header>

      <main
        style={{
          marginTop: "6rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          animation: "fadeIn 0.6s ease-in-out",
        }}
      >
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>
          Save a New Password
        </h2>

        <div style={formBoxStyle}>
          <Input
            Icon={FaGlobe}
            placeholder="Website"
            value={website}
            onChange={setWebsite}
          />
          <Input
            Icon={FaUser}
            placeholder="Username"
            value={username}
            onChange={setUsername}
          />
          <Input
            Icon={FaKey}
            type="password"
            placeholder="Password"
            value={password}
            onChange={setPassword}
          />
          <Input
            Icon={FaLock}
            type="password"
            placeholder="Pincode (optional)"
            value={pincode}
            onChange={setPincode}
          />

          <button onClick={handleSave} style={saveBtnStyle}>
            <FaSave style={{ marginRight: "0.5rem" }} /> Save Password
          </button>
        </div>
      </main>
    </div>
  );
};

const Input = ({ Icon, type = "text", placeholder, value, onChange }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
    <Icon style={{ color: "#555" }} />
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={inputStyle}
    />
  </div>
);

const inputStyle = {
  padding: "0.6rem",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "1rem",
  width: "100%",
  flex: 1,
};

const navBtnStyle = {
  padding: "0.6rem 1.2rem",
  borderRadius: "8px",
  border: "none",
  background: "#007bff",
  color: "#fff",
  fontWeight: "bold",
  fontSize: "0.95rem",
  cursor: "pointer",
  transition: "all 0.3s",
};

const saveBtnStyle = {
  marginTop: "1rem",
  padding: "0.8rem",
  borderRadius: "8px",
  border: "none",
  background: "#28a745",
  color: "#fff",
  fontWeight: "bold",
  fontSize: "1rem",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.3s",
};

const formBoxStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  width: "100%",
  maxWidth: "400px",
  background: "#fff",
  padding: "2rem",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  animation: "slideUp 0.5s ease-in-out",
};

export default SavePassword;
