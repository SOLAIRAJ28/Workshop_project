import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = () => {
    if (localStorage.getItem(username)) {
      toast.error('User already exists');
      return;
    }
    localStorage.setItem(username, JSON.stringify({ password, vault: [] }));
    toast.success('Signup successful! You can now log in.');
    setTimeout(() => navigate('/login'), 1200);
  };

  return (
    <div className="auth-container" style={{ width: '100vw', minHeight: '100vh', background: '#f7f7fa', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0', margin: '0', overflow: 'hidden' }}>
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
      <div style={{ maxWidth: '400px', margin: '2rem auto', background: '#fff', borderRadius: '16px', boxShadow: '0 2px 8px #0001', padding: '2rem', textAlign: 'center', width: '100%' }}>
        <h2 style={{ marginBottom: '1.5rem', fontSize: '2rem' }}>📝 Signup for <span style={{ color: '#61dafb' }}>Password Manager</span></h2>
        <input className="auth-input" style={{ marginBottom: '1rem' }} placeholder="👤 Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input className="auth-input" style={{ marginBottom: '1rem' }} placeholder="🔑 Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="auth-btn" style={{ width: '100%', marginBottom: '1rem', background: '#21a1f3', color: '#fff', fontWeight: 'bold', fontSize: '1.1rem', borderRadius: '8px', border: 'none', padding: '0.7rem 0', cursor: 'pointer', transition: 'background 0.2s' }} onClick={handleSignup}>🎉 Signup</button>
        <div style={{ marginTop: '1rem' }}>
          <button className="auth-btn" style={{ width: '100%', background: '#61dafb', color: '#222', fontWeight: 'bold', fontSize: '1.1rem', borderRadius: '8px', border: 'none', padding: '0.7rem 0', cursor: 'pointer', transition: 'background 0.2s' }} onClick={() => window.location.href = '/login'}>🔐 Go to Login</button>
        </div>
        <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover theme="colored" />
      </div>
    </div>
  );
};

export default Signup;
