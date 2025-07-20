import React, { useState } from "react";
import CryptoJS from "crypto-js";

const SavePassword = () => {
  const [website, setWebsite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pincode, setPincode] = useState("");

  const handleSave = () => {
    if (!website || !username || !password) {
      alert("Website, username, and password are required!");
      return;
    }

    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      alert("Please log in first.");
      return;
    }

    // Load user object
    let user = JSON.parse(localStorage.getItem(currentUser));
    if (!user) {
      alert("User data not found.");
      return;
    }

    let newEntry;
    // If pincode present, lock it; else, save public.
    if (pincode) {
      if (!/^\d{4,}$/.test(pincode)) {
        alert("Pincode must be at least 4 digits (numbers only).");
        return;
      }
      const encryptedPassword = CryptoJS.AES.encrypt(password, pincode).toString();
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
    alert("Password saved successfully!");

    setWebsite("");
    setUsername("");
    setPassword("");
    setPincode("");
  };

  return (
    <div
  style={{
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    minHeight: "100vh",
    minWidth: "100vw",
    maxWidth: "100vw",
    maxHeight: "100vh",
    overflow: "hidden",
    backgroundColor: "#f4f6f8",
    fontFamily: "Segoe UI, sans-serif",
    zIndex: 999, // Ensure on top
    boxSizing: "border-box"
  }}
>
      {/* Navbar */}
      <header
        style={{
          width: "98%",
          background: "linear-gradient(to right, #162c36, #254957)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 2rem",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1000,
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
          flexWrap: "wrap",
          cursor: "default",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <span role="img" aria-label="lock" style={{ fontSize: "1.4rem" }}>
            🔐
          </span>
          <span
            style={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: "1.2rem",
            }}
          >
            Password Manager
          </span>
        </div>

        {/* Nav Buttons */}
        <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
          <button
            onClick={() => (window.location.href = "/view")}
            style={{
              padding: "0.6rem 1.2rem",
              borderRadius: "8px",
              border: "none",
              background: "#007bff",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "0.95rem",
              cursor: "pointer",
            }}
          >
            Saved Passwords
          </button>
          <button
            onClick={() => (window.location.href = "/save")}
            style={{
              padding: "0.6rem 1.2rem",
              borderRadius: "8px",
              border: "none",
              background: "#007bff",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "0.95rem",
              cursor: "pointer",
            }}
          >
            Add Password
          </button>
        </div>
      </header>

      {/* Main Section */}
      <main
        style={{
          marginTop: "7rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: "2rem",
        }}
      >
        <h2
          style={{
            fontSize: "1.6rem",
            marginBottom: "1.5rem",
            color: "#333",
          }}
        >
          Save a New Password
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "100%",
            maxWidth: "400px",
            background: "#fff",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
          }}
        >
          <input
            type="text"
            placeholder="🌐 Website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            style={{
              padding: "0.75rem",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          />
          <input
            type="text"
            placeholder="👤 Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              padding: "0.75rem",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          />
          <input
            type="password"
            placeholder="🔑 Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "0.75rem",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          />
          <input
            type="password"
            placeholder="🔢 Pincode (optional for locking)"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            style={{
              padding: "0.75rem",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          />
          <small style={{ color: "#555" }}>
            Leave pincode empty to save as unlocked. Enter a pincode to make this password private/locked.
          </small>
          <button
            onClick={handleSave}
            style={{
              marginTop: "1rem",
              padding: "0.8rem",
              borderRadius: "8px",
              border: "none",
              background: "#28a745",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Save Password
          </button>
        </div>
      </main>
    </div>
  );
};

export default SavePassword;
