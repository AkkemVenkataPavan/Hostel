// src/pages/AdminDashboard.js
import React, { useEffect, useState } from "react";
import axios from "../api";
import { Pie, Bar } from "react-chartjs-2";
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import "./admin.css";

Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function AdminDashboard(){
  const [food, setFood] = useState([]);
  const [clean, setClean] = useState([]);
  const [maint, setMaint] = useState([]);
  const [issues, setIssues] = useState([]);

  useEffect(()=>{ fetchAll(); },[]);
  const fetchAll = async () => {
    try {
      const [fR, cR, mR, iR] = await Promise.all([
        axios.get("/feedbacks"),
        axios.get("/cleanliness"),
        axios.get("/maintenance"),
        axios.get("/issues")
      ]);
      setFood(fR.data); setClean(cR.data); setMaint(mR.data); setIssues(iR.data);
    } catch(err){ console.error(err); alert("Failed loading data"); }
  };

  const pieData = {
    labels: ["Food", "Cleanliness", "Maintenance", "Issues"],
    datasets: [{
      data: [food.length, clean.length, maint.length, issues.length],
      backgroundColor: ["#FF6384","#36A2EB","#FFCE56","#8AFF78"]
    }]
  };

  // bar: distribution of food ratings 1..5
  const ratingCounts = [0,0,0,0,0];
  food.forEach(f => { const r = Number(f.rating); if(r>=1 && r<=5) ratingCounts[r-1]++; });
  const barData = {
    labels: ["1","2","3","4","5"],
    datasets: [{ label: "Food Ratings", data: ratingCounts, backgroundColor: "#36A2EB" }]
  };

  return (
    <div className="admin-wrap">
      <h2>Admin Dashboard</h2>
      <div className="charts">
        <div className="chart-card"><h4>Feedback Types</h4><Pie data={pieData} /></div>
        <div className="chart-card"><h4>Food Rating Distribution</h4><Bar data={barData} /></div>
      </div>

      <section>
        <h3>Latest Food Feedbacks</h3>
        <div className="list">{food.map((f,i)=>(
          <div key={i} className="item"><strong>{f.user}</strong> ({f.roomNo}) — {f.rating}/5 <p>{f.comments}</p></div>
        ))}</div>
      </section>

      <section>
        <h3>Maintenance</h3>
        <div className="list">{maint.map((m,i)=> <div key={i} className="item"><strong>{m.user}</strong> - {m.issueType} <p>{m.description}</p></div>)}</div>
      </section>

      <section>
        <h3>Cleanliness</h3>
        <div className="list">{clean.map((c,i)=> <div key={i} className="item"><strong>{c.user}</strong> - {c.area} {c.rating}/5 <p>{c.comments}</p></div>)}</div>
      </section>

      <section>
        <h3>Issues</h3>
        <div className="list">{issues.map((it,i)=> <div key={i} className="item"><strong>{it.user}</strong> - {it.category} <p>{it.description}</p></div>)}</div>
      </section>
    </div>
  );
}
