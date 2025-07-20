import React, { useState, useEffect } from 'react';

const navBtnStyle = {
  padding: '0.6rem 1.2rem',
  borderRadius: '8px',
  border: 'none',
  background: '#00509e',
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '1rem',
  cursor: 'pointer',
  transition: 'background 0.2s, color 0.2s',
};

// Custom hook for hover effect
function useHoverStyle(baseStyle, hoverStyle) {
  const [isHovered, setIsHovered] = React.useState(false);
  const style = isHovered ? { ...baseStyle, ...hoverStyle } : baseStyle;
  return [
    style,
    {
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
    },
  ];
}
const inputStyle = {
  width: '100%',
  padding: '0.8rem',
  marginBottom: '1rem',
  borderRadius: '8px',
  border: '1px solid #e0e0e0',
  fontSize: '1rem',
};

const primaryBtnStyle = {
  width: '100%',
  padding: '0.8rem',
  borderRadius: '8px',
  border: 'none',
  background: '#21a1f3',
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '1.1rem',
  cursor: 'pointer',
  marginBottom: '1rem',
  boxShadow: '0 1px 4px #0001',
};

const secondaryBtnStyle = {
  ...primaryBtnStyle,
  background: '#e0e0e0',
  color: '#222',
};

const PasswordManager = () => {
  const [site, setSite] = useState('');
  const [username, setUsername] = useState('');
  const [sitePassword, setSitePassword] = useState('');
  const [vault, setVault] = useState([]);
  const currentUser = localStorage.getItem('currentUser');

  useEffect(() => {
    if (!currentUser) return;
    const user = JSON.parse(localStorage.getItem(currentUser) || '{}');
    setVault(user?.vault || []);
  }, [currentUser]);

  const savePassword = () => {
    if (!currentUser) return;
    if (!site || !username || !sitePassword) {
      alert('Please fill in all fields.');
      return;
    }

    const user = JSON.parse(localStorage.getItem(currentUser) || '{}');

    if (username === currentUser && sitePassword === user.password) {
      alert("You can't save your own login credentials.");
      return;
    }

    const newVault = [...vault, { site, username, password: sitePassword }];
    user.vault = newVault;
    localStorage.setItem(currentUser, JSON.stringify(user));
    setVault(newVault);
    setSite('');
    setUsername('');
    setSitePassword('');
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    window.location.href = '/login';
  };

  // Navbar button hover styles
  const [viewBtnStyle, viewBtnEvents] = useHoverStyle(navBtnStyle, { background: '#1976d2' });
  const [addBtnStyle, addBtnEvents] = useHoverStyle(navBtnStyle, { background: '#1976d2' });
  const [logoutBtnStyle, logoutBtnEvents] = useHoverStyle(
    { ...navBtnStyle, background: '#c62828' },
    { background: '#b71c1c', color: '#fff' }
  );

  return (
    <div
      style={{
        width: '100vw',
        minHeight: '100vh',
        background: '#f7f7fa',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0',
        margin: '0',
        overflowX: 'hidden',
      }}
    >
      {/* Fixed Navbar */}
      <header
        style={{
          width: '100%',
          background: '#003366',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.2rem 2.5rem',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
          {/* Replace src with your own logo if needed */}
          <img src="/vite.svg" alt="App Logo" style={{ width: '32px', height: '32px', borderRadius: '6px', objectFit: 'cover', background: '#fff', border: 'none', boxShadow: '0 1px 4px #0002' }} />
          <span
            style={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '1.4rem',
              letterSpacing: '1px',
              fontFamily: 'Segoe UI, sans-serif',
            }}
          >
            MyPassword Manager
          </span>
        </div>
        <nav style={{ display: 'flex', gap: '1rem' }}>
          <button
            style={viewBtnStyle}
            onClick={() => (window.location.href = '/view')}
            {...viewBtnEvents}
          >
            Saved Passwords
          </button>
          <button
            style={addBtnStyle}
            onClick={() => (window.location.href = '/save')}
            {...addBtnEvents}
          >
            Add Password
          </button>
          <button
            style={logoutBtnStyle}
            onClick={logout}
            {...logoutBtnEvents}
          >
            Logout
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <div
        style={{
          width: '100%',
          maxWidth: '600px',
          background: '#fff',
          borderRadius: '16px',
          boxShadow: '0 2px 8px #0001',
          padding: '2rem',
          marginTop: '8rem', // Increased to ensure content is below navbar
          marginBottom: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h2
          style={{
            color: '#21a1f3',
            marginBottom: '2rem',
            fontSize: '2rem',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          Add a New Password
        </h2>

        <input
          placeholder="Site Name"
          value={site}
          onChange={(e) => setSite(e.target.value)}
          style={inputStyle}
        />
        <input
          placeholder="Username / Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
        />
        <input
          placeholder="Password"
          type="password"
          value={sitePassword}
          onChange={(e) => setSitePassword(e.target.value)}
          style={{ ...inputStyle, marginBottom: '2rem' }}
        />

        <button onClick={savePassword} style={primaryBtnStyle}>
          Save Password
        </button>
        <button onClick={() => (window.location.href = '/view')} style={secondaryBtnStyle}>
          View Passwords
        </button>

        {vault.length > 0 && (
          <>
            <h3 style={{ marginTop: '2rem', color: '#21a1f3', fontWeight: 'bold' }}>
              Saved Passwords
            </h3>
            <ul style={{ width: '100%', padding: 0, listStyle: 'none' }}>
              {vault.map((item, index) => (
                <li
                  key={index}
                  style={{
                    background: '#f7f7fa',
                    borderRadius: '8px',
                    boxShadow: '0 1px 4px #0001',
                    padding: '1rem',
                    marginBottom: '1rem',
                    fontSize: '1rem',
                    color: '#222',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <strong style={{ color: '#21a1f3' }}>{item.site}</strong>
                  <span>{item.username}</span>
                  <span>{item.password}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default PasswordManager;
