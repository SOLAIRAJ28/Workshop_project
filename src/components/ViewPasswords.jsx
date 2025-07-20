import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js";

const ViewPasswords = () => {
  const [vault, setVault] = useState([]);
  const [pincodeInputs, setPincodeInputs] = useState({});
  const [decryptedPasswords, setDecryptedPasswords] = useState({});
  const currentUser = localStorage.getItem("currentUser");

  useEffect(() => {
    if (!currentUser) return;
    const user = JSON.parse(localStorage.getItem(currentUser));
    setVault(user?.vault || []);
  }, [currentUser]);

  const handleDelete = (index) => {
    if (!currentUser) return;
    const user = JSON.parse(localStorage.getItem(currentUser));
    const newVault = user.vault.filter((_, i) => i !== index);
    user.vault = newVault;
    localStorage.setItem(currentUser, JSON.stringify(user));
    setVault(newVault);
    setDecryptedPasswords((prev) => {
      const next = { ...prev };
      delete next[index];
      return next;
    });
  };

  const handleEdit = (index) => {
    const entry = vault[index];
    let passwordToEdit = entry.password;

    // If encrypted, prompt for pincode and decrypt
    if (entry.isEncrypted) {
      const pincode = prompt("Enter pincode to edit this password:");
      if (!pincode) return;
      try {
        const bytes = CryptoJS.AES.decrypt(entry.encryptedPassword, pincode);
        passwordToEdit = bytes.toString(CryptoJS.enc.Utf8);
        if (!passwordToEdit) throw new Error();
      } catch {
        alert("Incorrect pincode!");
        return;
      }
    }

    const newSite = prompt("Edit site", entry.site);
    const newUsername = prompt("Edit username/email", entry.username);
    const newPassword = prompt("Edit password", passwordToEdit);

    if (newSite && newUsername && newPassword) {
      const updatedVault = [...vault];
      if (entry.isEncrypted) {
        // Re-encrypt with the same pincode
        const pincode = prompt("Re-enter pincode for encryption:");
        if (!pincode) return;
        const encryptedPassword = CryptoJS.AES.encrypt(newPassword, pincode).toString();
        updatedVault[index] = { site: newSite, username: newUsername, encryptedPassword, isEncrypted: true };
      } else {
        updatedVault[index] = { site: newSite, username: newUsername, password: newPassword, isEncrypted: false };
      }
      const user = JSON.parse(localStorage.getItem(currentUser));
      user.vault = updatedVault;
      localStorage.setItem(currentUser, JSON.stringify(user));
      setVault(updatedVault);
      setDecryptedPasswords((prev) => {
        const next = { ...prev };
        delete next[index];
        return next;
      });
    }
  };

  const handleShowPassword = (index) => {
    const entry = vault[index];
    if (!entry.isEncrypted) {
      setDecryptedPasswords((prev) => ({ ...prev, [index]: entry.password }));
      return;
    }
    const currentPin = pincodeInputs[index] || "";
    if (currentPin.length < 4) {
      alert("Enter at least 4 digit pincode.");
      return;
    }
    try {
      const bytes = CryptoJS.AES.decrypt(entry.encryptedPassword, currentPin);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      if (!decrypted) throw new Error();
      setDecryptedPasswords((prev) => ({ ...prev, [index]: decrypted }));
    } catch {
      alert("Incorrect pincode.");
    }
  };

  return (
    <div className="vault-container" style={{ width: '100vw', minHeight: '100vh', background: '#f7f7fa', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0', margin: '0', overflow: 'hidden' }}>
      <header
        style={{
          width: "98%",
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
          <span role="img" aria-label="lock" style={{ fontSize: "1.4rem" }}>🔐</span>
          <span style={{ color: "#fff", fontWeight: "bold", fontSize: "1.2rem" }}>Password Manager</span>
        </div>
        <nav style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <button
            onClick={() => window.location.href = "/view"}
            style={{
              padding: "0.6rem 1.2rem",
              borderRadius: "8px",
              border: "none",
              background: "#0077cc",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background 0.3s",
            }}
            onMouseOver={e => e.target.style.background = '#005fa3'}
            onMouseOut={e => e.target.style.background = '#0077cc'}
          >Saved Passwords</button>
          <button
            onClick={() => window.location.href = "/save"}
            style={{
              padding: "0.6rem 1.2rem",
              borderRadius: "8px",
              border: "none",
              background: "#0077cc",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background 0.3s",
            }}
            onMouseOver={e => e.target.style.background = '#005fa3'}
            onMouseOut={e => e.target.style.background = '#0077cc'}
          >Add Password</button>
          <button
            onClick={() => {
              localStorage.removeItem("currentUser");
              window.location.href = "/login";
            }}
            style={{
              padding: "0.6rem 1.2rem",
              borderRadius: "8px",
              border: "none",
              background: "#e53935",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background 0.3s",
            }}
            onMouseOver={e => e.target.style.background = '#c62828'}
            onMouseOut={e => e.target.style.background = '#e53935'}
          >Logout</button>
        </nav>
      </header>

      <div style={{
        width: '100%', maxWidth: '500px', background: '#fff', borderRadius: '16px',
        boxShadow: '0 2px 8px #0001', padding: '2rem', marginTop: '8rem',
        marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center'
      }}>
        <h2 style={{
          color: '#21a1f3', marginBottom: '2rem', fontSize: '2rem',
          fontWeight: 'bold', textAlign: 'center'
        }}>Saved Passwords</h2>
        {vault.length === 0 ? (
          <div style={{ color: '#888', fontStyle: 'italic' }}>No passwords saved yet.</div>
        ) : (
          <ul style={{ width: '100%', padding: 0, listStyle: 'none' }}>
            {vault.map((item, index) => (
              <li
                key={index}
                style={{
                  background: '#f7f7fa', borderRadius: '8px', boxShadow: '0 1px 4px #0001',
                  padding: '1rem', marginBottom: '1rem', fontSize: '1rem', color: '#222',
                  display: 'flex', flexDirection: 'column'
                }}
              >
                <strong style={{ color: '#21a1f3' }}>{item.site}</strong>
                <span>{item.username}</span>
                <span>
                  {item.isEncrypted
                    ? (
                      <>
                        <span role="img" aria-label="locked">🔒</span>{" "}
                        {decryptedPasswords[index]
                          ? <span>{decryptedPasswords[index]}</span>
                          : (
                            <span>
                              <input
                                type="password"
                                placeholder="Enter pincode"
                                value={pincodeInputs[index] || ""}
                                onChange={e => setPincodeInputs({ ...pincodeInputs, [index]: e.target.value })}
                                style={{ borderRadius: "5px", border: "1px solid #aaa", marginRight: 6 }}
                              />
                              <button
                                onClick={() => handleShowPassword(index)}
                                style={{
                                  padding: "0.25rem 0.7rem", borderRadius: "5px",
                                  border: "none", background: "#1976d2", color: "#fff", fontWeight: "bold"
                                }}
                              >Show</button>
                            </span>
                          )
                        }
                      </>
                    )
                    : (
                      <>
                        <span role="img" aria-label="unlocked">🔓</span>{" "}
                        {item.password}
                      </>
                    )
                  }
                </span>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.7rem' }}>
                  <button
                    onClick={() => handleEdit(index)}
                    style={{
                      padding: '0.5rem 1.2rem',
                      borderRadius: '8px',
                      border: 'none',
                      background: '#0077cc',
                      color: '#fff',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >Edit</button>
                  <button
                    onClick={() => handleDelete(index)}
                    style={{
                      padding: '0.5rem 1.2rem',
                      borderRadius: '8px',
                      border: 'none',
                      background: '#c62828',
                      color: '#fff',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={() => window.location.href = '/main'}
          style={{
            width: '100%', padding: '0.8rem', borderRadius: '8px',
            border: 'none', background: '#e0e0e0', color: '#222',
            fontWeight: 'bold', fontSize: '1.1rem',
            cursor: 'pointer', marginTop: '1rem'
          }}
        >Back</button>
      </div>
    </div>
  );
};

export default ViewPasswords;
