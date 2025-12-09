import { useEffect, useState } from "react";
import { api } from "../api";
import AdminProjects from "../components/AdminProjects.jsx";
import AdminClients from "../components/AdminClients.jsx";
import AdminContacts from "../components/AdminContacts.jsx";
import AdminSubscribers from "../components/AdminSubscribers.jsx";

const AdminPage = () => {
  const [tab, setTab] = useState("projects");
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("adminToken") || "");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("adminToken", res.data.token);
      setToken(res.data.token);
      setForm({ email: "", password: "" });
    } catch {
      setError("Invalid credentials");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setToken("");
  };

  if (!token) {
    return (
      <div className="admin-login-wrapper">
        <div className="admin-login-card">
          <h2 className="admin-login-title">Admin Login</h2>
          <p className="admin-login-subtitle">Access the admin dashboard</p>

          <form className="admin-login-form" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Admin Email"
              value={form.email}
              onChange={(e) =>
                setForm((f) => ({ ...f, email: e.target.value }))
              }
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm((f) => ({ ...f, password: e.target.value }))
              }
              required
            />
            <button type="submit" className="btn-primary login-btn">
              Login
            </button>
          </form>

          {error && <p className="login-error">{error}</p>}
        </div>
      </div>
    );
  }


  return (
    <div className="admin">
      <aside className="admin-sidebar">
        <h3>Admin Panel</h3>
        <button onClick={() => setTab("projects")}>Projects</button>
        <button onClick={() => setTab("clients")}>Clients</button>
        <button onClick={() => setTab("contacts")}>Contact Forms</button>
        <button onClick={() => setTab("subscribers")}>Subscribers</button>
        <button onClick={handleLogout} style={{ marginTop: "auto" }}>
          Logout
        </button>
      </aside>
      <section className="admin-content">
        {tab === "projects" && <AdminProjects />}
        {tab === "clients" && <AdminClients />}
        {tab === "contacts" && <AdminContacts />}
        {tab === "subscribers" && <AdminSubscribers />}
      </section>
    </div>
  );
};

export default AdminPage;
