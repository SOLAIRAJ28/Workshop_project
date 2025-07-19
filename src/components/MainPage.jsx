import React from "react";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <div
      className="main-container"
      style={{
        width: '100vw',
        minHeight: '100vh',
        background: '#f7f7fa',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0',
        margin: '0',
        overflowX: 'hidden'
      }}
    >
      {/* Header */}
      <header
        style={{
          width: '100vw',
          background: '#003366',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.2rem 2.5rem',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
          <span
            role="img"
            aria-label="lock"
            style={{ fontSize: '1.5rem', color: '#fff' }}
          >
            🔒
          </span>
          <span
            style={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '1.4rem',
              letterSpacing: '1px',
              fontFamily: 'Segoe UI, sans-serif'
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
              background: '#00509e',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '1rem',
              border: 'none',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/view')}
          >
            Saved Passwords
          </button>
          <button
            style={{
              padding: '0.6rem 1.2rem',
              borderRadius: '8px',
              background: '#00509e',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '1rem',
              border: 'none',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/save')}
          >
            Add Password
          </button>
          <button
            style={{
              padding: '0.6rem 1.2rem',
              borderRadius: '8px',
              background: '#c62828',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '1rem',
              border: 'none',
              cursor: 'pointer'
            }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </nav>
      </header>

      {/* Main Box */}
      <div
        style={{
          width: '100%',
          maxWidth: '900px',
          background: '#fff',
          borderRadius: '16px',
          boxShadow: '0 2px 8px #0001',
          padding: '2rem',
          marginTop: '2rem',
          marginBottom: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <h2
          style={{
            color: '#21a1f3',
            marginBottom: '2rem',
            fontSize: '2rem',
            fontWeight: 'bold',
            textAlign: 'center'
          }}
        >
          Saved Passwords
        </h2>
        <ViewPasswordsBox />
      </div>
    </div>
  );
}

// Separate component: ViewPasswordsBox
function ViewPasswordsBox() {
  const [vault, setVault] = React.useState([]);
  const currentUser = localStorage.getItem("currentUser");

  React.useEffect(() => {
    if (!currentUser) return;
    const user = JSON.parse(localStorage.getItem(currentUser));
    setVault(user?.vault || []);
  }, [currentUser]);

  if (vault.length === 0) {
    return <div style={{ color: '#888', fontStyle: 'italic' }}>No passwords saved yet.</div>;
  }

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'center'
      }}
    >
      {vault.map((item, index) => (
        <div
          key={index}
          style={{
            background: '#f7f7fa',
            borderRadius: '12px',
            boxShadow: '0 1px 4px #0001',
            padding: '1rem',
            width: '100%',
            maxWidth: '500px',
            textAlign: 'left'
          }}
        >
          <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#21a1f3' }}>
            🌐 {item.site}
          </div>
          <div style={{ margin: '0.5rem 0' }}>
            👤 <strong>{item.username}</strong>
          </div>
          <div>
            🔑 <span style={{ fontWeight: 'bold' }}>{item.password}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MainPage;
