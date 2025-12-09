import { useState } from "react";
import LandingPage from "./pages/LandingPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import "./App.css";

function App() {
  const [view, setView] = useState("landing");

  return (
    <div className="app">
      <header className="site-header">
        <div className="site-header-inner">
          <div className="brand">
            <span className="brand-mark">Real</span>
            <span className="brand-trust">Trust</span>
          </div>

          {view === "landing" && (
            <nav className="main-nav">
              <a href="#hero">Home</a>
              <a href="#services">Services</a>
              <a href="#about">About</a>
              <a href="#projects">Our Projects</a>
              <a href="#clients">Testimonials</a>
              <a href="#contact">Contact</a>
            </nav>
          )}

          <div className="header-actions">
            <button
              className="primary-btn small"
              onClick={() =>
                setView((prev) => (prev === "landing" ? "admin" : "landing"))
              }
            >
              {view === "landing" ? "Admin Panel" : "Back to Site"}
            </button>
          </div>
        </div>
      </header>

      {view === "landing" ? <LandingPage /> : <AdminPage />}
    </div>
  );
}

export default App;
