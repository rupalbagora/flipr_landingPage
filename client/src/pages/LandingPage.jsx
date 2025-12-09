import { useEffect, useState } from "react";
import { api } from "../api";
import ContactForm from "../components/ContactForm.jsx";
import ProjectsSection from "../components/ProjectsSection.jsx";
import ClientsSection from "../components/ClientsSection.jsx";
import NewsletterSection from "../components/NewsletterSection.jsx";

const LandingPage = () => {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    api
      .get("/projects")
      .then((res) => setProjects(res.data))
      .catch((err) => console.error(err));
    api
      .get("/clients")
      .then((res) => setClients(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <main>
      {/* HERO */}
      <section id="hero" className="hero-section">
        <div className="hero-inner">
          <div className="hero-left">
            <p className="eyebrow">Consultation • Design • Marketing</p>
            <h1>
              Consultation, Design
              <br />
              &amp; Marketing For Real Estate
            </h1>
            <p className="hero-subtitle">
              We help you present your listings beautifully, attract more
              qualified buyers, and close deals faster with tailored digital
              experiences.
            </p>
            <div className="hero-stats">
              <div>
                <span className="stat-number">450+</span>
                <span className="stat-label">Projects</span>
              </div>
              <div>
                <span className="stat-number">120+</span>
                <span className="stat-label">Happy Clients</span>
              </div>
              <div>
                <span className="stat-number">98%</span>
                <span className="stat-label">Satisfaction</span>
              </div>
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-image"></div>
            <div className="hero-form-wrapper" id="contact">
              <h3>Get a Free Consultation</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* “NOT YOUR AVERAGE REALTOR” / SERVICES */}
      <section id="services" className="section section-split">
        <div className="split-image"></div>
        <div className="split-content">
          <h2>Not Your Average Realtor</h2>
          <p>
            We combine strategy, design and technology to position your
            properties in the best possible light. From staging advice to
            digital marketing, our team covers every step of the journey.
          </p>

          <div className="pill-row">
            <div className="pill-card">
              <h4>Stunning visuals</h4>
              <p>High-end photography and video that highlight every detail.</p>
            </div>
            <div className="pill-card">
              <h4>Smart campaigns</h4>
              <p>Targeted ads that bring real buyers, not just clicks.</p>
            </div>
            <div className="pill-card">
              <h4>Seamless experience</h4>
              <p>
                Clear communication and transparent reporting along the way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section why-section">
        <h2 className="center">Why Choose Us?</h2>
        <p className="center muted">
          More than just listings – we craft experiences that help your
          properties stand out.
        </p>
        <div className="card-grid why-grid">
          <div className="why-card">
            <div className="why-icon">📈</div>
            <h3>Potential ROI</h3>
            <p>
              Smart pricing and polished presentation that can improve perceived
              value.
            </p>
          </div>
          <div className="why-card">
            <div className="why-icon">🎨</div>
            <h3>Design</h3>
            <p>
              Clean, modern layouts inspired by top-performing real estate
              brands.
            </p>
          </div>
          <div className="why-card">
            <div className="why-icon">📣</div>
            <h3>Marketing</h3>
            <p>
              Multi-channel exposure across web, social and email to reach the
              right buyers.
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section about-section">
        <div className="about-inner">
          <div>
            <h2>About Us</h2>
            <p>
              Our team blends expertise in real estate, design, and technology.
              We work closely with agencies and independent realtors to deliver
              high-converting landing pages, custom campaigns and memorable
              client experiences.
            </p>
            <p>
              Every project is treated as a partnership: we listen to your
              goals, analyse your market, and create solutions that feel
              on-brand and effortless to use.
            </p>
            <button className="primary-btn">Learn More</button>
          </div>
          <div className="about-highlight">
            <div>
              <span className="stat-number">10+</span>
              <span className="stat-label">Years combined experience</span>
            </div>
            <div>
              <span className="stat-number">24/7</span>
              <span className="stat-label">Support for your launches</span>
            </div>
          </div>
        </div>
      </section>

      {/* OUR PROJECTS */}
      <section id="projects" className="section">
        <h2 className="center">Our Projects</h2>
        <p className="center muted">
          We know what buyers are looking for and design every project to tell a
          compelling story.
        </p>
        <ProjectsSection projects={projects} />
      </section>

      {/* HAPPY CLIENTS */}
      <section id="clients" className="section">
        <h2 className="center">Happy Clients</h2>
        <p className="center muted">
          Real feedback from the people we’ve worked with.
        </p>
        <ClientsSection clients={clients} />
      </section>

      {/* NEWSLETTER */}
      <section className="section">
        <NewsletterSection />
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="brand">
              <span className="brand-mark">Real</span>
              <span className="brand-trust">Trust</span>
            </div>
            <p>
              Learn more about our listing process as well as our additional
              staging and marketing work.
            </p>
          </div>
          <div className="footer-links">
            <div>
              <h4>Company</h4>
              <a href="#about">About</a>
              <a href="#services">Services</a>
              <a href="#projects">Projects</a>
            </div>
            <div>
              <h4>Support</h4>
              <a href="#contact">Contact</a>
              <a href="#clients">Testimonials</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Real Trust. All rights reserved.
          </span>
        </div>
      </footer>
    </main>
  );
};

export default LandingPage;
