// src/pages/Home.js
import React from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const nav = useNavigate();
  return (
    <div>
      <header className="hero">
        <div className="hero-inner">
          <h1>Hostel Feedback System</h1>
          <p>Share your thoughts on hostel food and help us improve your dining experience</p>
          <div className="hero-actions">
            <button className="primary" onClick={() => nav("/student-dashboard")}>Give Feedback</button>
            <button className="ghost" onClick={() => alert("Learn more soon!")}>Learn More</button>
          </div>
        </div>
      </header>

      <section className="why">
        <h2>Why Use Our System?</h2>
        <div className="cards">
          <div className="card">💬 Easy Feedback</div>
          <div className="card">📊 Data Driven</div>
          <div className="card">👥 User Friendly</div>
          <div className="card">🍽 Food Review</div>
        </div>
      </section>
    </div>
  );
}
