// src/pages/CleanlinessReview.js
import React, { useState } from "react";
import axios from "../api";

export default function CleanlinessReview(){
  const [form,setForm]=useState({ name:"", area:"", rating:"", comments:"" });
  React.useEffect(()=> {
    const raw=localStorage.getItem("user");
    if(raw) setForm(f=>({ ...f, name: JSON.parse(raw).name }));
  },[]);
  const onChange = e => setForm({...form, [e.target.name]: e.target.value});
  const submit = async e => {
    e.preventDefault();
    try { await axios.post("/cleanliness", form); alert("Submitted"); setForm({ name:"", area:"", rating:"", comments:"" }); }
    catch(err){ console.error(err); alert("Failed"); }
  };

  return (
    <div style={{maxWidth:600, margin:"auto"}}>
      <h3>🧼 Submit Cleanliness Review</h3>
      <form onSubmit={submit}>
        <input name="name" placeholder="Your Name" value={form.name} onChange={onChange} required/>
        <input name="area" placeholder="Area (Bathroom, Corridor, Room)" value={form.area} onChange={onChange} required/>
        <input name="rating" type="number" min="1" max="5" placeholder="Rating (1-5)" value={form.rating} onChange={onChange} required/>
        <textarea name="comments" placeholder="Comments" value={form.comments} onChange={onChange} />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}
