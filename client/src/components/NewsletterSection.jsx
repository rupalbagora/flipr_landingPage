import { useState } from "react";
import { api } from "../api";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    try {
      await api.post("/subscribers", { email });
      setStatus("Subscribed successfully!");
      setEmail("");
    } catch (err) {
      setStatus("Could not subscribe. Try again.");
    }
  };

  return (
    <section className="section newsletter">
      <div className="newsletter-content">
        <h2>Subscribe to our Newsletter</h2>
        <p>Get updates about our latest projects and happy clients.</p>
      </div>
      <form className="newsletter-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Subscribe</button>
      </form>
      {status && <p className="form-status">{status}</p>}
    </section>
  );
};

export default NewsletterSection;
