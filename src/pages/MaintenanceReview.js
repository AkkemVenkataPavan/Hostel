// src/pages/MaintenanceReview.js
import React, { useState } from "react";
import axios from "../api";

export default function MaintenanceReview(){
  const [form,setForm]=useState({ name:"", issueType:"", description:"", roomNo:"" });
  React.useEffect(()=> {
    const raw=localStorage.getItem("user");
    if(raw) setForm(f=>({ ...f, name: JSON.parse(raw).name }));
  },[]);
  const onChange = e => setForm({...form, [e.target.name]: e.target.value});
  const submit = async e => {
    e.preventDefault();
    try { await axios.post("/maintenance", form); alert("Submitted"); setForm({ name:"", issueType:"", description:"", roomNo:"" }); }
    catch(err){ console.error(err); alert("Failed"); }
  };

  return (
    <div style={{maxWidth:600, margin:"auto"}}>
      <h3>🔧 Submit Maintenance Issue</h3>
      <form onSubmit={submit}>
        <input name="name" placeholder="Your Name" value={form.name} onChange={onChange} required/>
        <input name="roomNo" placeholder="Room No" value={form.roomNo} onChange={onChange} required/>
        <input name="issueType" placeholder="Issue Type (e.g., Electrical)" value={form.issueType} onChange={onChange} required/>
        <textarea name="description" placeholder="Describe the issue" value={form.description} onChange={onChange} required/>
        <button type="submit">Submit Issue</button>
      </form>
    </div>
  );
}
