// src/components/Login.tsx
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = JSON.parse(localStorage.getItem(username) || "null");
    if (user && user.password === password) {
      localStorage.setItem("currentUser", username);
      toast.success("Login successful!");
      setTimeout(() => navigate("/main"), 1200);
    } else {
      toast.error("🚫 Invalid credentials");
      setShowSignup(true);
    }
  };
  
  const [showSignup, setShowSignup] = useState(false);
  return (
    <div className="auth-container" style={{ maxWidth: '400px', margin: '2rem auto', background: '#f7f7fa', borderRadius: '16px', boxShadow: '0 2px 8px #0001', padding: '2rem', textAlign: 'center' }}>
      <h2 style={{ marginBottom: '1.5rem', fontSize: '2rem' }}>🔐 Login to <span style={{ color: '#61dafb' }}>Password Manager</span></h2>
      <input className="auth-input" style={{ marginBottom: '1rem' }} placeholder="👤 Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input className="auth-input" style={{ marginBottom: '1rem' }} placeholder="🔑 Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="auth-btn" style={{ width: '100%', marginBottom: '1rem', background: '#61dafb', color: '#222', fontWeight: 'bold', fontSize: '1.1rem', borderRadius: '8px', border: 'none', padding: '0.7rem 0', cursor: 'pointer', transition: 'background 0.2s' }} onClick={handleLogin}>🚀 Login</button>
      <div style={{ marginTop: '1rem' }}>
        <button className="auth-btn" style={{ width: '100%', background: '#21a1f3', color: '#fff', fontWeight: 'bold', fontSize: '1.1rem', borderRadius: '8px', border: 'none', padding: '0.7rem 0', cursor: 'pointer', transition: 'background 0.2s' }} onClick={() => window.location.href = '/signup'}>📝 Go to Signup</button>
      </div>
      {showSignup && (
        <div style={{ marginTop: '1rem' }}>
          <span style={{ color: '#ff4d4f', fontWeight: 'bold' }}>🚫 Invalid credentials. Don't have an account?</span>
          <a href="/signup" style={{ color: '#21a1f3', textDecoration: 'underline', marginLeft: '0.5rem', fontWeight: 'bold' }}>📝 Signup</a>
        </div>
      )}
    <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover theme="colored" />
    </div>
  );
}

export default Login;
