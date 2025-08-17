// src/pages/IssueForm.js
import React, { useState } from "react";
import axios from "../api";

export default function IssueForm(){
  const [form,setForm]=useState({ user:"", roomNo:"", category:"", description:"" });
  React.useEffect(()=> { const raw=localStorage.getItem("user"); if(raw) setForm(f=>({ ...f, user: JSON.parse(raw).name })); },[]);
  const onChange = e => setForm({...form, [e.target.name]: e.target.value});
  const submit = async e => {
    e.preventDefault();
    try { await axios.post("/submit-issue", form); alert("Issue submitted"); setForm({ user:"", roomNo:"", category:"", description:"" }); }
    catch(err){ console.error(err); alert("Failed"); }
  };

  return (
    <div style={{maxWidth:600, margin:"auto"}}>
      <h3>📢 Submit Issue / Complaint</h3>
      <form onSubmit={submit}>
        <input name="user" placeholder="Your Name" value={form.user} onChange={onChange} required/>
        <input name="roomNo" placeholder="Room No" value={form.roomNo} onChange={onChange} required/>
        <select name="category" value={form.category} onChange={onChange} required>
          <option value="">Select Category</option>
          <option value="plumbing">Plumbing</option>
          <option value="electrical">Electrical</option>
          <option value="food">Food</option>
          <option value="other">Other</option>
        </select>
        <textarea name="description" placeholder="Describe" value={form.description} onChange={onChange} required/>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
