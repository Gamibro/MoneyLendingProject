import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, ResponsiveContainer } from "recharts";
import "./Dashboard.css";

const loanData = [
  { month: "Jan", loans: 120 },
  { month: "Feb", loans: 150 },
  { month: "Mar", loans: 200 },
  { month: "Apr", loans: 180 },
  { month: "May", loans: 220 },
  { month: "Jun", loans: 300 },
];

const borrowerData = [
  { month: "Jan", borrowers: 50 },
  { month: "Feb", borrowers: 70 },
  { month: "Mar", borrowers: 100 },
  { month: "Apr", borrowers: 120 },
  { month: "May", borrowers: 150 },
  { month: "Jun", borrowers: 180 },
];

const approvalData = [
  { month: "Jan", rate: 90 },
  { month: "Feb", rate: 92 },
  { month: "Mar", rate: 95 },
  { month: "Apr", rate: 96 },
  { month: "May", rate: 97 },
  { month: "Jun", rate: 98 },
];

const Dashboard = () => {
  return (
    <div className="dashboard-container">

      {/* HERO */}
      <section className="dashboard-hero">
        <h1>Welcome Back!</h1>
        <p>Monitor loans, borrowers, repayments, and approval rates at a glance.</p>
      </section>

      {/* STATS CARDS */}
      <section className="dashboard-stats">
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
      <section className="dashboard-charts">
        <div className="chart-card">
          <h3>Loans Over Time</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={loanData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="loans" stroke="#00f2fe" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Borrower Growth</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={borrowerData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="borrowers" fill="#4facfe" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Approval Rate (%)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={approvalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="rate" stroke="#fbc531" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section className="dashboard-features">
        <h2>Platform Features</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Loan" />
            <h3>Loan Management</h3>
            <p>Create, approve, and track loans efficiently.</p>
          </div>
          <div className="feature-card">
            <img src="https://cdn-icons-png.flaticon.com/512/2922/2922564.png" alt="Approval" />
            <h3>Quick Approval</h3>
            <p>Approve requests instantly with automated workflows.</p>
          </div>
          <div className="feature-card">
            <img src="https://cdn-icons-png.flaticon.com/512/3019/3019166.png" alt="Security" />
            <h3>Secure System</h3>
            <p>Encrypted and protected financial data management.</p>
          </div>
          <div className="feature-card">
            <img src="https://cdn-icons-png.flaticon.com/512/942/942748.png" alt="Reports" />
            <h3>Reports & Analytics</h3>
            <p>Track growth, repayments, and performance trends.</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Dashboard;
