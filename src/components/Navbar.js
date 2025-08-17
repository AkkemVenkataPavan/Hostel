// src/components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const raw = localStorage.getItem("user");
  const user = raw ? JSON.parse(raw) : null;

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="nav">
      {/* Left Section - Logo */}
      <div className="nav-left" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        <span className="logo">🍽️ HostelFeed</span>
      </div>

      {/* Center Section - Navigation Links */}
      <div className="nav-center">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </div>

      {/* Right Section - Auth & User Info */}
      <div className="nav-right">
        {!user ? (
          <>
            <Link className="btn" to="/login">Login</Link>
            <Link className="btn outline" to="/register">Register</Link>
          </>
        ) : (
          <>
            <span className="user-name">
              {user.name} ({user.role})
            </span>
            <button onClick={logout} className="btn outline">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
