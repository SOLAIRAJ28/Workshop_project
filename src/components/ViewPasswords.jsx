import React, { useState, useEffect } from "react";

const ViewPasswords = () => {
  const [vault, setVault] = useState([]);
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
  };

  const handleEdit = (index) => {
    const newSite = prompt("Edit site", vault[index].site);
    const newUsername = prompt("Edit username/email", vault[index].username);
    const newPassword = prompt("Edit password", vault[index].password);
    if (newSite && newUsername && newPassword) {
      const updatedVault = [...vault];
      updatedVault[index] = { site: newSite, username: newUsername, password: newPassword };
      const user = JSON.parse(localStorage.getItem(currentUser));
      user.vault = updatedVault;
      localStorage.setItem(currentUser, JSON.stringify(user));
      setVault(updatedVault);
    }
  };

  return (
    <div className="vault-container" style={{ width: '100vw', minHeight: '100vh', background: '#f7f7fa', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0', margin: '0', overflow: 'hidden' }}>
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
          <span role="img" aria-label="lock" style={{ fontSize: '1.5rem', color: '#fff' }}>🔒</span>
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
            style={{
              padding: '0.6rem 1.2rem',
              borderRadius: '8px',
              border: 'none',
              background: '#00509e',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'background 0.2s, color 0.2s',
              minWidth: '150px',
            }}
            onClick={() => window.location.href = '/view'}
          >
            Saved Passwords
          </button>
          <button
            style={{
              padding: '0.6rem 1.2rem',
              borderRadius: '8px',
              border: 'none',
              background: '#00509e',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'background 0.2s, color 0.2s',
              minWidth: '150px',
            }}
            onClick={() => window.location.href = '/save'}
          >
            Add Password
          </button>
          <button
            style={{
              padding: '0.6rem 1.2rem',
              borderRadius: '8px',
              border: 'none',
              background: '#c62828',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'background 0.2s, color 0.2s',
              minWidth: '120px',
            }}
            onClick={() => {
              localStorage.removeItem('currentUser');
              window.location.href = '/login';
            }}
          >
            Logout
          </button>
        </nav>
      </header>
      <div style={{ width: '100%', maxWidth: '600px', background: '#fff', borderRadius: '16px', boxShadow: '0 2px 8px #0001', padding: '2rem', marginTop: '8rem', marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ color: '#21a1f3', marginBottom: '2rem', fontSize: '2rem', fontWeight: 'bold', textAlign: 'center' }}>Saved Passwords</h2>
        {vault.length === 0 ? (
          <div style={{ color: '#888', fontStyle: 'italic' }}>No passwords saved yet.</div>
        ) : (
          <ul style={{ width: '100%', padding: 0, listStyle: 'none' }}>
            {vault.map((item, index) => (
              <li key={index} style={{ background: '#f7f7fa', borderRadius: '8px', boxShadow: '0 1px 4px #0001', padding: '1rem', marginBottom: '1rem', fontSize: '1rem', color: '#222', display: 'flex', flexDirection: 'column' }}>
                <strong style={{ color: '#21a1f3' }}>{item.site}</strong>
                <span>{item.username}</span>
                <span>{item.password}</span>
                <button onClick={() => handleDelete(index)} style={{ marginTop: '0.7rem', padding: '0.5rem 1.2rem', borderRadius: '8px', border: 'none', background: '#c62828', color: '#fff', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', boxShadow: '0 1px 4px #0001', transition: 'background 0.2s' }}>Delete</button>
              </li>
            ))}
          </ul>
        )}
        <button onClick={() => window.location.href = '/main'} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: 'none', background: '#e0e0e0', color: '#222', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', marginTop: '1rem' }}>Back</button>
      </div>
    </div>
  );
};

export default ViewPasswords;
