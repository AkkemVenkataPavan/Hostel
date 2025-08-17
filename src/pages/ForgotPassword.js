// src/pages/ForgotPassword.js
import React, { useState } from "react";
import axios from "../api";
import "./auth.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [role, setRole] = useState("student");

  const handle = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/forgot-password", { email, newPassword, role });
      alert("Password reset successful. Login with new password.");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="auth-form">
      <h2>Forgot Password</h2>
      <form onSubmit={handle}>
        <select value={role} onChange={e=>setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>
        <input type="email" placeholder="Registered email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input type="password" placeholder="New password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} required />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}
