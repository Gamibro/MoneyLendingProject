import React from "react";
import "./AdminDashboard.css";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  // Dummy data
  const stats = [
    { title: "Total Users", value: 1200, icon: "👤" },
    { title: "Total Loans", value: 3500, icon: "💰" },
    { title: "Pending Approvals", value: 45, icon: "⏳" },
    { title: "Active Loans", value: 2800, icon: "📄" },
  ];

  const recentUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Pending" },
    { id: 3, name: "Bob Lee", email: "bob@example.com", status: "Active" },
  ];

  return (
    <div className="page-container admin-dashboard">
      <h1>Admin Dashboard</h1>
      <p>Overview of users and loans in Smart Lend.</p>

      {/* Stats Cards */}
      <div className="admin-stats">
        {stats.map((stat, index) => (
          <div className="admin-card" key={index}>
            <div className="card-icon">{stat.icon}</div>
            <h3>{stat.value}</h3>
            <p>{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="admin-quicklinks">
        <Link to="/admin/users" className="btn-admin">Manage Users</Link>
        <Link to="/admin/loans" className="btn-admin">Manage Loans</Link>
        <Link to="/admin/approvals" className="btn-admin">Approvals</Link>
        <Link to="/admin/reports" className="btn-admin">Reports</Link>
        <Link to="/admin/notifications" className="btn-admin">Notifications</Link>
      </div>

      {/* Recent Users Table */}
      <div className="recent-users">
        <h2>Recent Users</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className={`status ${user.status.toLowerCase()}`}>{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
