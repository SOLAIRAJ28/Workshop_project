import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { FaUser, FaLock } from "react-icons/fa";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = JSON.parse(localStorage.getItem(username) || "null");
    if (user && user.password === password) {
      localStorage.setItem("currentUser", username);
      toast.success("Login successful!");
      setTimeout(() => navigate("/main"), 1200);
    } else {
      toast.error("Invalid credentials");
      setShowSignup(true);
    }
  };

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div style={styles.pageContainer}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          interactivity: {
            events: { onClick: { enable: true, mode: "push" }, onHover: { enable: true, mode: "repulse" } },
            modes: { push: { quantity: 4 }, repulse: { distance: 100, duration: 0.4 } },
          },
          particles: {
            color: { value: "#ffffff" },
            links: { color: "#ffffff", distance: 150, enable: true, opacity: 0.5, width: 1 },
            collisions: { enable: true },
            move: { direction: "none", enable: true, outMode: "bounce", random: false, speed: 1, straight: false },
            number: { density: { enable: true, area: 800 }, value: 40 },
            opacity: { value: 0.5 },
            shape: { type: "circle" },
            size: { random: true, value: 4 },
          },
          detectRetina: true,
        }}
      />

      <div style={styles.centerWrapper}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={styles.loginBox}
        >
          <h2 style={styles.heading}>🔐 Password Manager</h2>

          <div style={styles.inputWrapper}>
            <FaUser style={styles.icon} />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={styles.input}
            />
            <label style={{ ...styles.floatingLabel, ...(username && styles.floatingLabelActive) }}>Username</label>
          </div>

          <div style={styles.inputWrapper}>
            <FaLock style={styles.icon} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
            <label style={{ ...styles.floatingLabel, ...(password && styles.floatingLabelActive) }}>Password</label>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleLogin}
            style={styles.loginButton}
          >
            Log In
          </motion.button>

          <p style={styles.switchText}>
            Don't have an account?
            <span style={styles.linkText} onClick={() => navigate("/signup")}> Sign up</span>
          </p>

          {showSignup && (
            <p style={styles.errorText}>
              Invalid credentials. Try again or <a href="/signup" style={styles.linkText}>create an account</a>.
            </p>
          )}
        </motion.div>
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
    width: "100vw",
    height: "100vh",
    background: "linear-gradient(to right top, #c1dfc4, #deecdd)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    fontFamily: "Segoe UI, sans-serif",
    textAlign: "center",
  },
  centerWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  loginBox: {
    position: "relative",
    zIndex: 1,
    background: "rgba(255, 255, 255, 0.25)",
    borderRadius: "16px",
    padding: "2.5rem 2rem",
    width: "90%",
    maxWidth: "420px",
    backdropFilter: "blur(12px)",
    boxShadow: "0 12px 32px rgba(0,0,0,0.2)",
    boxSizing: "border-box",
    margin: "auto",
  },
  heading: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    marginBottom: "2rem",
    color: "#333",
    textAlign: "center",
  },
  inputWrapper: {
    position: "relative",
    marginBottom: "1.8rem",
    textAlign: "left",
  },
  icon: {
    position: "absolute",
    top: "50%",
    left: "1rem",
    transform: "translateY(-50%)",
    color: "#555",
    zIndex: 2,
  },
  input: {
    width: "100%",
    padding: "1.1rem 1rem 0.6rem 3rem",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    outline: "none",
    boxSizing: "border-box",
    backgroundColor: "rgba(255,255,255,0.6)",
    backdropFilter: "blur(5px)",
  },
  floatingLabel: {
    position: "absolute",
    top: "1.1rem",
    left: "3rem",
    fontSize: "0.95rem",
    color: "#777",
    transition: "all 0.2s ease",
    pointerEvents: "none",
  },
  floatingLabelActive: {
    top: "-0.5rem",
    left: "2.8rem",
    fontSize: "0.75rem",
    backgroundColor: "rgba(255,255,255,0.7)",
    padding: "0 4px",
    borderRadius: "4px",
  },
  loginButton: {
    width: "100%",
    padding: "0.9rem",
    background: "linear-gradient(to right, #4facfe, #00f2fe)",
    color: "#fff",
    fontSize: "1.05rem",
    fontWeight: "600",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    transition: "all 0.3s ease",
  },
  switchText: {
    marginTop: "1.5rem",
    fontSize: "0.95rem",
    textAlign: "center",
    color: "#555",
  },
  linkText: {
    color: "#007bff",
    cursor: "pointer",
    textDecoration: "underline",
    marginLeft: "5px",
  },
  errorText: {
    color: "#d32f2f",
    fontSize: "0.9rem",
    marginTop: "1rem",
    textAlign: "center",
  },
};

export default Login;
