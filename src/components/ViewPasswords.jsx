import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash, FaTrashAlt, FaEdit, FaSignOutAlt, FaHome, FaPlus, FaLock, FaUser, FaGlobe } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

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
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #f3f4f6, #e1f5fe)',
      fontFamily: 'Segoe UI, sans-serif',
      overflowX: 'hidden',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
    }}>

      <nav style={{
        width: '97%',
        background: '#1e88e5',
        color: '#fff',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <h1 style={{ fontSize: '1.6rem', margin: 0 }}><FaLock /> Password Manager</h1>
        </div>
        <div style={{ display: 'flex', gap: '0.7rem' }}>
          <button onClick={() => window.location.href = '/main'} style={navBtnStyle}><FaHome /> Home</button>
          <button onClick={() => window.location.href = '/save'} style={navBtnStyle}><FaPlus /> Add</button>
          <button
            onClick={() => {
              localStorage.removeItem("currentUser");
              window.location.href = "/login";
            }}
            style={{ ...navBtnStyle, background: '#d32f2f' }}
          ><FaSignOutAlt /> Logout</button>
        </div>
      </nav>

      <div style={{
        flex: 1,
        width: '99%',
        maxWidth: '700px',
        margin: '2rem auto',
        background: '#ffffff',
        padding: '2rem',
        borderRadius: '18px',
        boxShadow: '0 6px 20px rgba(0,0,0,0.15)'
      }}>
        <h2 style={{ textAlign: 'center', color: '#2e7d32' }}>Your Saved Passwords</h2>
        {vault.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#999' }}>No passwords saved yet.</p>
        ) : (
          vault.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              style={{
                background: '#f1f8e9',
                marginBottom: '1rem',
                padding: '1rem',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}>
              <h3 style={{ margin: 0, color: '#33691e' }}><FaGlobe /> {item.site}</h3>
              <p><FaUser /> {item.username}</p>
              <p>
                <FaLock /> Password: {item.isEncrypted ? (
                  decryptedPasswords[index] ? (
                    <strong>{decryptedPasswords[index]}</strong>
                  ) : (
                    <>
                      <input
                        type="password"
                        placeholder="Enter PIN"
                        value={pincodeInputs[index] || ""}
                        onChange={(e) =>
                          setPincodeInputs({ ...pincodeInputs, [index]: e.target.value })
                        }
                        style={inputStyle}
                      />
                      <button data-tooltip-id={`show-${index}`} onClick={() => handleShowPassword(index)} style={showBtn}><FaEye /></button>
                      <Tooltip id={`show-${index}`} content="Reveal Password" />
                    </>
                  )
                ) : (
                  <strong>{item.password}</strong>
                )}
              </p>
              <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                <button data-tooltip-id={`edit-${index}`} onClick={() => handleEdit(index)} style={editBtn}><FaEdit /> Edit</button>
                <Tooltip id={`edit-${index}`} content="Edit Entry" />
                <button data-tooltip-id={`delete-${index}`} onClick={() => handleDelete(index)} style={deleteBtn}><FaTrashAlt /> Delete</button>
                <Tooltip id={`delete-${index}`} content="Delete Entry" />
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

const navBtnStyle = {
  padding: '0.5rem 1rem',
  background: '#1976d2',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  fontWeight: 'bold',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
};

const inputStyle = {
  padding: '0.4rem',
  borderRadius: '6px',
  border: '1px solid #ccc',
  marginRight: '0.5rem',
  width: '100px',
};

const showBtn = {
  padding: '0.4rem 0.8rem',
  background: '#388e3c',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
};

const editBtn = {
  background: '#1976d2',
  color: '#fff',
  padding: '0.4rem 1rem',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
};

const deleteBtn = {
  background: '#c62828',
  color: '#fff',
  padding: '0.4rem 1rem',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
};

export default ViewPasswords;