// src/pages/About.js
import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-container">
      <h1>About Hostel Feedback System</h1>
      
      <section className="about-section">
        <h2>Our Purpose</h2>
        <p>
          In our hostel, we often face many issues related to food quality, cleanliness, and service. 
          Traditionally, students had to personally approach the management, which is not always convenient. 
          That’s why we created Hostel Feedback System — a 24/7 platform where students can freely share 
          their honest opinions and suggestions about hostel food and services.
        </p>
        <p>
          Our goal is to make the feedback process simple, fast, and effective, so that even someone with little 
          technical knowledge can use it without hesitation.
        </p>
      </section>

      <section className="about-section">
        <h2>How It Works</h2>
        <ol>
          <li><strong>Register</strong> – Create your account with basic details like name, phone number, and room number.</li>
          <li><strong>Login</strong> – Use your credentials to access the dashboard.</li>
          <li><strong>Give Feedback</strong> – Submit your opinions about hostel food, cleanliness, and services.</li>
          <li><strong>Review Past Feedback</strong> – Track your past submissions.</li>
          <li><strong>Log Out Safely</strong> – Keep your account secure.</li>
        </ol>
      </section>

      <section className="about-section">
        <h2>Why Choose Our System?</h2>
        <ul>
          <li>User-Friendly — no technical expertise needed</li>
          <li>Anonymous Option — share honest feedback without fear</li>
          <li>24/7 Access — submit feedback anytime</li>
          <li>Data-Driven — helps management improve with real insights</li>
        </ul>
      </section>
    </div>
  );
}

export default About;
