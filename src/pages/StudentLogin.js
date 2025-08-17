// src/pages/StudentLogin.js
import React, { useState } from "react";
import axios from "../api";
import { useNavigate } from "react-router-dom";
import "./auth.css";

export default function StudentLogin(){
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const n=useNavigate();

  const submit=async(e)=>{
    e.preventDefault();
    try{
      const res=await axios.post("/login",{ email, password, role: "student" });
      localStorage.setItem("user", JSON.stringify({
        userId: res.data.userId, name: res.data.name, email:res.data.email, role: res.data.role
      }));
      alert("Login success");
      n("/student-dashboard");
    }catch(err){
      console.error(err);
      alert(err.response?.data || "Login failed");
    }
  };

  return (
    <div className="auth-form">
      <h2>Student Login</h2>
      <form onSubmit={submit}>
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      <p><a href="/forgot-password">Forgot password?</a></p>
    </div>
  );
}
