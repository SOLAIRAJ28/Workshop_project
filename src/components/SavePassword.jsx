import React, { useState } from "react";

const SavePassword = () => {
  const [website, setWebsite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSave = () => {
    if (!website || !username || !password) {
      alert("All fields are required!");
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

    // Update the vault
    const newEntry = { site: website, username, password };
    const updatedVault = [...(user.vault || []), newEntry];
    user.vault = updatedVault;

    // Save back to localStorage
    localStorage.setItem(currentUser, JSON.stringify(user));
    alert("Password saved successfully!");

    // Clear fields
    setWebsite("");
    setUsername("");
    setPassword("");
  };

  return (
    <div
      style={{
        fontFamily: "Segoe UI, sans-serif",
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
        overflowX: "hidden",
        boxSizing: "border-box",
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
