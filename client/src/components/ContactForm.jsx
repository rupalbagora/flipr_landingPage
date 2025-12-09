import { useState } from "react";
import { api } from "../api";

const ContactForm = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    city: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    try {
      await api.post("/contacts", form);
      setStatus("Thanks! We’ve received your details.");
      setForm({ fullName: "", email: "", mobile: "", city: "" });
    } catch (err) {
      setStatus("Something went wrong. Please try again.");
    }
  };

  return (
    <form className="hero-form" onSubmit={handleSubmit}>
      <input
        name="fullName"
        placeholder="Full Name"
        value={form.fullName}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Enter Email Address"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        name="mobile"
        placeholder="Mobile Number"
        value={form.mobile}
        onChange={handleChange}
        required
      />
      <input
        name="city"
        placeholder="Area, City"
        value={form.city}
        onChange={handleChange}
        required
      />
      <button type="submit" className="primary-btn block">
        Get Quick Quote
      </button>
      {status && <p className="hero-form-status">{status}</p>}
    </form>
  );
};

export default ContactForm;
