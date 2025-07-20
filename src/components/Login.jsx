import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

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

  return (
    <div style={styles.pageContainer}>
      <div style={styles.loginBox}>
        <h2 style={styles.heading}>Password Manager</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleLogin} style={styles.loginButton}>
          Log In
        </button>

        <p style={styles.switchText}>
          Don't have an account?{" "}
          <span
            style={styles.linkText}
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>

        {showSignup && (
          <p style={styles.errorText}>
            Invalid credentials. Try again or{" "}
            <a href="/signup" style={styles.linkText}>create an account</a>.
          </p>
        )}
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
    overflow: "hidden",
    background: "linear-gradient(135deg, #e3f2fd, #ffffff)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Segoe UI, sans-serif",
    boxSizing: "border-box",
    padding: "1rem",
  },
  loginBox: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "2.5rem 2rem",
    width: "100%",
    maxWidth: "420px",
    boxSizing: "border-box",
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
  },
  heading: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    marginBottom: "2rem",
    color: "#333",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "1rem",
    marginBottom: "1.2rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    outline: "none",
    boxSizing: "border-box",
  },
  loginButton: {
    width: "100%",
    padding: "0.9rem",
    backgroundColor: "#007bff",
    color: "#fff",
    fontSize: "1.05rem",
    fontWeight: "600",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
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
