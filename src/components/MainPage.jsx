import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGlobe, FaSignOutAlt, FaEye, FaPlus } from "react-icons/fa";

function MainPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(120deg, #e0f7fa, #f1f8ff)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "'Segoe UI', sans-serif",
        overflowX: "hidden",
        overflowY: "auto",
        boxSizing: "border-box",
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
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <FaGlobe color="#fff" size={20} />
          <span style={{ color: "#fff", fontWeight: "bold", fontSize: "1.2rem" }}>
            Password Manager
          </span>
        </div>

        <nav style={{ display: "flex", gap: "1rem" }}>
          <NavButton label="Saved Passwords" icon={<FaEye />} tooltip="View saved passwords" onClick={() => navigate("/view")} />
          <NavButton label="Add Password" icon={<FaPlus />} tooltip="Add new password" onClick={() => navigate("/save")} />
          <LogoutButton label="Logout" tooltip="Logout from account" icon={<FaSignOutAlt />} onClick={handleLogout} />
        </nav>
      </header>

      {/* Main Content */}
      <motion.main
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 60, damping: 10 }}
        style={{
          width: "60%",
          maxWidth: "800px",
          background: "#4bc3e7ff",
          borderRadius: "8px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          padding: "2rem",
          marginTop: "2.5rem",
          flex: 1,
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
      </motion.main>
    </motion.div>
  );
}

// Buttons with tooltips
const NavButton = ({ label, onClick, icon, tooltip }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    title={tooltip}
    style={{
      background: "#1976d2",
      color: "#fff",
      padding: "0.6rem 1.2rem",
      borderRadius: "8px",
      fontWeight: "500",
      fontSize: "1rem",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    }}
  >
    {icon} {label}
  </motion.button>
);

const LogoutButton = ({ label, onClick, icon, tooltip }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    title={tooltip}
    style={{
      background: "#e53935",
      color: "#fff",
      padding: "0.6rem 1.2rem",
      borderRadius: "8px",
      fontWeight: "500",
      fontSize: "1rem",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    }}
  >
    {icon} {label}
  </motion.button>
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
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          style={{
            width: "50%",
            background: "rgba(255, 255, 255, 0.75)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(0,0,0,0.05)",
            borderRadius: "12px",
            padding: "1rem",
            boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ fontWeight: "bold", fontSize: "1.1rem", color: "#1a73e8" }}>
            <FaGlobe style={{ marginRight: "6px" }} /> {item.site}
          </div>
          <div style={{ margin: "0.4rem 0" }}>
            Username: <i>{item.username}</i>
          </div>
          <div>
            Password: <i>{item.password}</i>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default MainPage;
