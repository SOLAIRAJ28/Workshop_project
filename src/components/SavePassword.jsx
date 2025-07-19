import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SavePassword = () => {
  const [site, setSite] = useState("");
  const [username, setUsername] = useState("");
  const [sitePassword, setSitePassword] = useState("");
  const [siteIcon, setSiteIcon] = useState("");
  const currentUser = localStorage.getItem("currentUser");

  const savePassword = () => {
    if (!currentUser) return;
    const user = JSON.parse(localStorage.getItem(currentUser));
    if (username === currentUser && sitePassword === user.password) {
      toast.error("You can't save your own login credentials.");
      return;
    }
    const newVault = [...(user.vault || []), { site, username, password: sitePassword, icon: siteIcon }];
    user.vault = newVault;
    localStorage.setItem(currentUser, JSON.stringify(user));
    setSite("");
    setUsername("");
    setSitePassword("");
    setSiteIcon("");
    toast.success("Password saved!");
  };

  return (
    <div className="vault-container" style={{ width: '100vw', minHeight: '100vh', background: '#f7f7fa', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0', margin: '0', overflow: 'hidden' }}>
      <header style={{ width: '100vw', background: '#003366', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '1.2rem 2.5rem', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', height: '100%' }}>
          <span role="img" aria-label="lock" style={{ fontSize: '1.5rem', color: '#fff', alignSelf: 'center' }}>🔒</span>
          <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.4rem', letterSpacing: '1px', fontFamily: 'Segoe UI, sans-serif', alignSelf: 'center' }}>MyPassword Manager</span>
        </div>
        <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center', height: '100%' }}>
          <button className="main-btn" style={{ padding: '0.6rem 1.2rem', borderRadius: '8px', border: 'none', background: '#00509e', color: '#fff', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', marginRight: '0.5rem', alignSelf: 'center' }} onClick={() => window.location.href = '/view'}>Saved Passwords</button>
          <button className="main-btn" style={{ padding: '0.6rem 1.2rem', borderRadius: '8px', border: 'none', background: '#00509e', color: '#fff', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', marginRight: '0.5rem', alignSelf: 'center' }} onClick={() => window.location.href = '/save'}>Add Password</button>
          <button className="main-btn" style={{ padding: '0.6rem 1.2rem', borderRadius: '8px', border: 'none', background: '#c62828', color: '#fff', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', alignSelf: 'center' }} onClick={() => { localStorage.removeItem('currentUser'); window.location.href = '/login'; }}>Logout</button>
        </nav>
      </header>
      <div style={{ width: '100%', maxWidth: '500px', background: '#fff', borderRadius: '16px', boxShadow: '0 2px 8px #0001', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ color: '#21a1f3', marginBottom: '2rem', fontSize: '2rem', fontWeight: 'bold', textAlign: 'center' }}>Save Password</h2>
        <input placeholder="Site" value={site} onChange={e => setSite(e.target.value)} style={{ width: '100%', padding: '0.8rem', marginBottom: '1rem', borderRadius: '8px', border: '1px solid #e0e0e0', fontSize: '1rem' }} />
        <input placeholder="Username/Email" value={username} onChange={e => setUsername(e.target.value)} style={{ width: '100%', padding: '0.8rem', marginBottom: '1rem', borderRadius: '8px', border: '1px solid #e0e0e0', fontSize: '1rem' }} />
        <input placeholder="Password" value={sitePassword} onChange={e => setSitePassword(e.target.value)} style={{ width: '100%', padding: '0.8rem', marginBottom: '1rem', borderRadius: '8px', border: '1px solid #e0e0e0', fontSize: '1rem' }} />
        <input placeholder="Site Icon URL (optional)" value={siteIcon} onChange={e => setSiteIcon(e.target.value)} style={{ width: '100%', padding: '0.8rem', marginBottom: '2rem', borderRadius: '8px', border: '1px solid #e0e0e0', fontSize: '1rem' }} />
        <button onClick={savePassword} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: 'none', background: '#21a1f3', color: '#fff', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', marginBottom: '1rem', boxShadow: '0 1px 4px #0001', transition: 'background 0.2s' }}>Save Password</button>
        <button onClick={() => window.location.href = '/view'} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: 'none', background: '#e0e0e0', color: '#222', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 1px 4px #0001', transition: 'background 0.2s' }}>Back</button>
      </div>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover theme="colored" />
    </div>
  );
};

export default SavePassword;
