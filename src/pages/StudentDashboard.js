import React, { useState, useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { FaUtensils, FaBroom, FaTools, FaFlag, FaUserCircle } from "react-icons/fa";
import "./student.css";

import FoodReview from "./FoodReview";
import CleanlinessReview from "./CleanlinessReview";
import MaintenanceReview from "./MaintenanceReview";
import IssueForm from "./IssueForm";

export default function StudentDashboard() {
  const raw = localStorage.getItem("user");
  const user = raw ? JSON.parse(raw) : null;
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    fullName: "",
    roomNumber: "",
    phone: "",
    village: "",
    photo: ""
  });

  const [showProfileForm, setShowProfileForm] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem("profileData");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfile((prev) => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const saveProfile = () => {
    localStorage.setItem("profileData", JSON.stringify(profile));
    setShowProfileForm(false);
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const cards = [
    {
      title: "Food Review",
      description: "Rate today's food and suggest changes.",
      icon: <FaUtensils size={40} />,
      path: "food"
    },
    {
      title: "Cleanliness Review",
      description: "Report hostel room/bathroom hygiene.",
      icon: <FaBroom size={40} />,
      path: "cleanliness"
    },
    {
      title: "Maintenance Issue",
      description: "Raise maintenance or repair issues.",
      icon: <FaTools size={40} />,
      path: "maintenance"
    },
    {
      title: "General Complaint",
      description: "Submit any other issues or feedback.",
      icon: <FaFlag size={40} />,
      path: "issue"
    }
  ];

  const BackButton = () => (
    <button
      className="back-btn"
      onClick={() => navigate(-1)}
      style={{
        marginBottom: "10px",
        padding: "6px 12px",
        background: "#eee",
        border: "1px solid #ccc",
        cursor: "pointer"
      }}
    >
      ← Back
    </button>
  );

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <div className="dashboard-sidebar">
        <div className="profile-card">
          {profile.photo ? (
            <img
              src={profile.photo}
              alt="Profile"
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                objectFit: "cover",
                cursor: "pointer"
              }}
              onClick={() => setShowProfileForm(true)}
            />
          ) : (
            <FaUserCircle
              size={80}
              style={{ cursor: "pointer", color: "#888" }}
              onClick={() => setShowProfileForm(true)}
            />
          )}
          <h3>{profile.fullName || user?.name || "Student"}</h3>
          {profile.roomNumber && <p>Room: {profile.roomNumber}</p>}
          {profile.phone && <p>📞 {profile.phone}</p>}
          {profile.village && <p>🏡 {profile.village}</p>}
        </div>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      {/* Profile Form Popup */}
      {showProfileForm && (
        <div className="profile-popup">
          <div className="profile-popup-content">
            <h2>Edit Profile</h2>
            <input type="file" accept="image/*" onChange={handlePhotoChange} />
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={profile.fullName}
              onChange={handleProfileChange}
            />
            <input
              type="text"
              name="roomNumber"
              placeholder="Room Number"
              value={profile.roomNumber}
              onChange={handleProfileChange}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={profile.phone}
              onChange={handleProfileChange}
            />
            <input
              type="text"
              name="village"
              placeholder="Village"
              value={profile.village}
              onChange={handleProfileChange}
            />
            <div style={{ marginTop: "10px" }}>
              <button onClick={saveProfile}>Save</button>
              <button
                style={{ marginLeft: "8px" }}
                onClick={() => setShowProfileForm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="dashboard-main">
        <Routes>
          <Route
            index
            element={
              <div>
                <h1>Hostel Feedback Dashboard</h1>
                <div className="card-grid">
                  {cards.map((card, idx) => (
                    <div
                      key={idx}
                      className="card"
                      onClick={() => navigate(card.path)}
                    >
                      {card.icon}
                      <h3>{card.title}</h3>
                      <p>{card.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            }
          />
          <Route
            path="food"
            element={
              <>
                <BackButton />
                <FoodReview onSubmitted={() => navigate(-1)} />
              </>
            }
          />
          <Route
            path="cleanliness"
            element={
              <>
                <BackButton />
                <CleanlinessReview onSubmitted={() => navigate(-1)} />
              </>
            }
          />
          <Route
            path="maintenance"
            element={
              <>
                <BackButton />
                <MaintenanceReview onSubmitted={() => navigate(-1)} />
              </>
            }
          />
          <Route
            path="issue"
            element={
              <>
                <BackButton />
                <IssueForm onSubmitted={() => navigate(-1)} />
              </>
            }
          />
        </Routes>
      </div>
    </div>
  );
}
