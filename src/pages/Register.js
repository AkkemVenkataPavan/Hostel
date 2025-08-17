// src/pages/Register.js
import React, { useState } from "react";
import axios from "../api";
import { useNavigate } from "react-router-dom";
import "./auth.css";

export default function Register(){
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [role,setRole]=useState("student"); // if you want to allow admin creation, careful!
  const n = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/register", { name, email, password, role });
      alert("Registered successfully");
      n("/student-login");
    } catch (err) {
      console.error(err);
      alert(err.response?.data || "Register failed");
    }
  };

  return (
    <div className="auth-form">
      <h2>Register</h2>
      <form onSubmit={submit}>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" required />
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" required />
        <select value={role} onChange={e=>setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
