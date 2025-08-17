// src/pages/LoginSelector.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";

export default function LoginSelector() {
  const n = useNavigate();
  return (
    <div className="auth-select">
      <h2>Login Panel</h2>
      <div className="buttons">
        <button onClick={() => n("/student-login")}>Student Login</button>
        <button onClick={() => n("/admin-login")}>Admin Login</button>
      </div>
      <p>Forgot password? <a href="/forgot-password">Reset here</a></p>
    </div>
  );
}
