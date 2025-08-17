// src/pages/FoodReview.js
import React, { useState } from "react";
import axios from "../api";

export default function FoodReview(){
  const [form,setForm] = useState({ user: "", roomNo: "", rating:"", comments:"" });
  // prefill with logged-in user name
  React.useEffect(()=> {
    const raw=localStorage.getItem("user");
    if(raw) setForm(f=>({ ...f, user: JSON.parse(raw).name }));
  },[]);

  const onChange = e => setForm({...form, [e.target.name]: e.target.value});

  const submit = async e => {
    e.preventDefault();
    try {
      await axios.post("/submit-feedback", form);
      alert("Feedback submitted");
      setForm({ user: "", roomNo: "", rating:"", comments:"" });
    } catch (err) { console.error(err); alert("Failed"); }
  };

  return (
    <div style={{maxWidth:600, margin:"auto"}}>
      <h3>🍽 Submit Food Feedback</h3>
      <form onSubmit={submit}>
        <input name="user" placeholder="Your Name" value={form.user} onChange={onChange} required/>
        <input name="roomNo" placeholder="Room No" value={form.roomNo} onChange={onChange} required/>
        <input name="rating" type="number" min="1" max="5" placeholder="Rating (1-5)" value={form.rating} onChange={onChange} required/>
        <textarea name="comments" placeholder="Comments" value={form.comments} onChange={onChange} required/>
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
}
