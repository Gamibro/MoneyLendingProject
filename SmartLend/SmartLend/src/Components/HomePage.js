import React from "react";
import { Link } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, LineChart, Line, CartesianGrid } from "recharts";
import "./Home.css";
import hero1 from "../assets/M1.jpg";
import hero2 from "../assets/M3.png";

const Home = () => {

  // ===== Data for Charts =====
  const loanStatusData = [
    { name: "Approved", value: 1800, color: "#00f2fe" },
    { name: "Pending", value: 500, color: "#4facfe" },
    { name: "Rejected", value: 200, color: "#ff6b81" },
  ];

  const monthlyLoans = [
    { month: "Jan", loans: 200 },
    { month: "Feb", loans: 250 },
    { month: "Mar", loans: 300 },
    { month: "Apr", loans: 280 },
    { month: "May", loans: 320 },
    { month: "Jun", loans: 360 },
  ];

  const monthlyRepayments = [
    { month: "Jan", amount: 150 },
    { month: "Feb", amount: 180 },
    { month: "Mar", amount: 220 },
    { month: "Apr", amount: 200 },
    { month: "May", amount: 250 },
    { month: "Jun", amount: 300 },
  ];

  return (
    <div className="page-container home-page">

      {/* HERO */}
      <section className="home-hero">
        <div className="hero-text">
          <h1>Smart Lend</h1>
          <p>
            A secure and intelligent money lending platform to manage loans,
            repayments, and borrowers with ease.
          </p>

          <div className="hero-actions">
            <Link to="/register" className="btn-primary">
              Get Started
            </Link>
            <Link to="/login" className="btn-outline" style={{ marginTop: '15px', display: 'block', textAlign: 'center' }}>
              Login
            </Link>
          </div>
        </div>

        <div className="hero-images">
          <img src={hero1} alt="Finance Illustration" />
        </div>
      </section>

      {/* STATS */}
      <section className="home-stats">
        <div className="stat-card">
          <h2>2500+</h2>
          <p>Loans Issued</p>
        </div>
        <div className="stat-card">
          <h2>1200+</h2>
          <p>Active Borrowers</p>
        </div>
        <div className="stat-card">
          <h2>98%</h2>
          <p>Approval Rate</p>
        </div>
        <div className="stat-card">
          <h2>24/7</h2>
          <p>Customer Support</p>
        </div>
      </section>

      {/* CHARTS */}
      <section className="home-charts">
        <div className="chart-card">
          <h3>Loan Status</h3>
          <div style={{ width: 200, height: 200, margin: "0 auto" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={loanStatusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={40}
                  paddingAngle={5}
                  label
                >
                  {loanStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <h3>Monthly Loans Issued</h3>
          <div style={{ width: "100%", height: 250 }}>
            <ResponsiveContainer>
              <BarChart data={monthlyLoans}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="loans" fill="#00f2fe" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <h3>Monthly Repayments</h3>
          <div style={{ width: "100%", height: 250 }}>
            <ResponsiveContainer>
              <LineChart data={monthlyRepayments}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="#4facfe" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* DASHBOARD-LIKE FEATURES */}
      <section className="home-features">
        <h2 className="section-title">Platform Features</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Loan" />
            <h3>Loan Management</h3>
            <p>Create, approve, and track loans in one place.</p>
          </div>

          <div className="feature-card">
            <img src="https://cdn-icons-png.flaticon.com/512/2922/2922564.png" alt="Approval" />
            <h3>Quick Approval</h3>
            <p>Automated workflows for faster decisions.</p>
          </div>

          <div className="feature-card">
            <img src="https://cdn-icons-png.flaticon.com/512/3019/3019166.png" alt="Security" />
            <h3>Secure System</h3>
            <p>Enterprise-grade security for financial data.</p>
          </div>

          <div className="feature-card">
            <img src="https://cdn-icons-png.flaticon.com/512/942/942748.png" alt="Reports" />
            <h3>Reports & Analytics</h3>
            <p>Track growth, repayments, and performance.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="home-cta">
        <h2>Start Managing Loans Smarter</h2>
        <p>Join Smart Lend and simplify your lending operations today.</p>
        <Link to="/register" className="btn-primary">
          Create Free Account
        </Link>
      </section>

    </div>
  );
};

export default Home;
