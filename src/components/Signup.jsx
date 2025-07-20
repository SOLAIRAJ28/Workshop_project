import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = () => {
    if (!username || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (localStorage.getItem(username)) {
      toast.error('User already exists');
      return;
    }

    localStorage.setItem(username, JSON.stringify({ password, vault: [] }));
    toast.success('Signup successful!');
    setTimeout(() => navigate('/login'), 1500);
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.signupBox}>
        <h2 style={styles.heading}>Password Manager</h2>

        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleSignup} style={styles.signupButton}>
          Sign Up
        </button>

        <p style={styles.switchText}>
          Already have an account?{' '}
          <span style={styles.linkText} onClick={() => navigate('/login')}>
            Log In
          </span>
        </p>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

const styles = {
  pageContainer: {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    background: 'linear-gradient(135deg, #e3f2fd, #ffffff)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Segoe UI, sans-serif',
    boxSizing: 'border-box',
    padding: '1rem',
  },
  signupBox: {
    background: '#ffffff',
    borderRadius: '16px',
    padding: '2.5rem 2rem',
    width: '100%',
    maxWidth: '420px',
    boxSizing: 'border-box',
    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
  },
  heading: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
    color: '#333',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: '1rem',
    marginBottom: '1.2rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    outline: 'none',
    boxSizing: 'border-box',
  },
  signupButton: {
    width: '100%',
    padding: '0.9rem',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '1.05rem',
    fontWeight: '600',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  switchText: {
    marginTop: '1.5rem',
    fontSize: '0.95rem',
    textAlign: 'center',
    color: '#555',
  },
  linkText: {
    color: '#007bff',
    cursor: 'pointer',
    textDecoration: 'underline',
    marginLeft: '5px',
  },
};

export default Signup;
