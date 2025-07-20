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
      style={{
        width: "100vw",
        minHeight: "100vh",
        background: "linear-gradient(120deg, #e0f7fa, #f1f8ff)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "'Segoe UI', sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* Navbar */}
      <header
        style={{
          width: "100%",
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
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <span role="img" aria-label="lock" style={{ fontSize: "1.4rem" }}>
            🔐
          </span>
          <span
            style={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: "1.2rem",
            }}
          >
            Password Manager
          </span>
        </div>

        <nav style={{ display: "flex", gap: "1rem" }}>
          <NavButton label="Saved Passwords" onClick={() => navigate("/view")} />
          <NavButton label="Add Password" onClick={() => navigate("/save")} />
          <LogoutButton label="Logout" onClick={handleLogout} />
        </nav>
      </header>

      {/* Content */}
      <main
        style={{
          width: "60%",
          maxWidth: "800px",
          background: "#4bc3e7ff",
          borderRadius: "8px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          padding: "2rem",
          marginTop: "2.5rem",
          marginBottom: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "600",
            color: "#000000ff",
            marginBottom: "1.5rem",
          }}
        >
          My Passwords
        </h2>
        <ViewPasswordsBox />
      </main>
    </div>
  );
}

// Buttons
const NavButton = ({ label, onClick }) => (
  <button
    onClick={onClick}
    style={{
      background: "#1976d2",
      color: "#fff",
      padding: "0.6rem 1.2rem",
      borderRadius: "8px",
      fontWeight: "500",
      fontSize: "1rem",
      border: "none",
      cursor: "pointer",
      transition: "all 0.3s ease",
    }}
    onMouseEnter={(e) => (e.target.style.background = "#125ea3")}
    onMouseLeave={(e) => (e.target.style.background = "#1976d2")}
  >
    {label}
  </button>
);

const LogoutButton = ({ label, onClick }) => (
  <button
    onClick={onClick}
    style={{
      background: "#e53935",
      color: "#fff",
      padding: "0.6rem 1.2rem",
      borderRadius: "8px",
      fontWeight: "500",
      fontSize: "1rem",
      border: "none",
      cursor: "pointer",
      transition: "all 0.3s ease",
    }}
    onMouseEnter={(e) => (e.target.style.background = "#b71c1c")}
    onMouseLeave={(e) => (e.target.style.background = "#e53935")}
  >
    {label}
  </button>
);

// Password Viewer
function ViewPasswordsBox() {
  const [vault, setVault] = React.useState([]);
  const currentUser = localStorage.getItem("currentUser");

  React.useEffect(() => {
    if (!currentUser) return;
    const user = JSON.parse(localStorage.getItem(currentUser));
    setVault(user?.vault || []);
  }, [currentUser]);

  if (vault.length === 0) {
    return <div style={{ color: "#777", fontStyle: "italic" }}>No passwords saved yet.</div>;
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "center",
      }}
    >
      {vault.map((item, index) => (
        <div
          key={index}
          style={{
            width: "50%", // ✅ Reduced width
            background: "rgba(255, 255, 255, 0.75)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(0,0,0,0.05)",
            borderRadius: "12px",
            padding: "1rem",
            boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
            transition: "transform 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
        >
          <div style={{ fontWeight: "bold", fontSize: "1.1rem", color: "#1a73e8" }}>
            🌐 {item.site}
          </div>
          <div style={{ margin: "0.4rem 0" }}>
            Username: <italic>{item.username}</italic>
          </div>
          <div>
            Password: <italic>{item.password}</italic>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MainPage;
