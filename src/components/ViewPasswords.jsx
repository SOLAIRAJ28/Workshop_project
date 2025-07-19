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
      <h2 style={{ marginBottom: '1.5rem', fontSize: '2rem', color: '#21a1f3', textAlign: 'center' }}>🔐 Saved Passwords</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', width: '100%', maxWidth: '900px', margin: '0 auto', justifyContent: 'center' }}>
        {vault.length === 0 ? (
          <div style={{ color: '#888', fontStyle: 'italic' }}>No passwords saved yet.</div>
        ) : (
          vault.map((item, index) => (
            <div key={index} style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 1px 4px #0001', padding: '1.2rem 1.5rem', marginBottom: '1.2rem', textAlign: 'left', width: '100%', maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                  {item.icon ? (
                    <img src={item.icon} alt="site icon" style={{ width: '32px', height: '32px', borderRadius: '6px', objectFit: 'cover', background: '#eee', border: '1px solid #ddd' }} />
                  ) : (
                    <span role="img" aria-label="site" style={{ fontSize: '1.5rem' }}>🌐</span>
                  )}
                  <span style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#21a1f3' }}>{item.site}</span>
                </div>
                <div style={{ margin: '0.5rem 0' }}>👤 <strong>{item.username}</strong></div>
                <div>🔑 <span style={{ fontWeight: 'bold' }}>{item.password}</span></div>
              </div>
              <button onClick={() => handleDelete(index)} style={{ padding: '0.5rem 1.2rem', borderRadius: '8px', border: 'none', background: '#c62828', color: '#fff', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', marginLeft: '1.5rem', alignSelf: 'center', boxShadow: '0 1px 4px #0001', transition: 'background 0.2s' }}>Delete</button>
            </div>
          ))
        )}
      </div>
      <div style={{ marginTop: '1rem' }}>
        <button onClick={() => window.location.href = '/main'}>Back</button>
      </div>
    </div>
  );
};

export default ViewPasswords;
