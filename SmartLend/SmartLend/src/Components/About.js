import React from "react";
import "./About.css";
import heroImage from "../assets/M2.png"; // You can use any hero image

const About = () => {
  return (
    <div className="page-container about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-text">
          <h1>About Smart Lend</h1>
          <p>
            Smart Lend is a modern money lending platform designed to make financial management fast, secure, and easy for both borrowers and lenders.
          </p>
        </div>
        <div className="hero-image">
          <img src={heroImage} alt="Smart Lend Hero" />
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision">
        <div className="card">
          <h2>Our Mission</h2>
          <p>
            To provide seamless, secure, and efficient lending solutions that empower borrowers and lenders alike.
          </p>
        </div>
        <div className="card">
          <h2>Our Vision</h2>
          <p>
            To be the leading digital lending platform trusted for transparency, speed, and innovation.
          </p>
        </div>
        <div className="card">
          <h2>Our Values</h2>
          <p>
            Security, Integrity, Customer-Centricity, and Technological Excellence drive everything we do.
          </p>
        </div>
      </section>

      {/* Team / Info Section */}
      <section className="team-info">
        <h2>Why Choose Smart Lend?</h2>
        <p>
          With a secure system, real-time updates, and dedicated customer support, Smart Lend ensures your financial management is smooth and worry-free.
        </p>
      </section>
    </div>
  );
};

export default About;
