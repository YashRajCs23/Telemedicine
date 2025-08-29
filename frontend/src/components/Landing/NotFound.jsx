// src/components/Landing/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404</h1>
      <p style={styles.message}>Oops! The page you are looking for does not exist.</p>
      <Link to="/" style={styles.link}>Go back to Home</Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "10vh",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "6rem",
    margin: 0,
  },
  message: {
    fontSize: "1.5rem",
    margin: "20px 0",
  },
  link: {
    textDecoration: "none",
    color: "#fff",
    backgroundColor: "#007bff",
    padding: "10px 20px",
    borderRadius: "5px",
  },
};

export default NotFound;
