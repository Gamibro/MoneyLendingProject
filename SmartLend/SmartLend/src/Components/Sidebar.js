import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Sidebar.css";
import logo from "../assets/L1.png";

const Sidebar = ({ isLoggedIn, isAdmin }) => {
  const { handleLogout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger Button */}
      <button className="hamburger-btn" onClick={toggleSidebar}>
        <span className={`hamburger ${isOpen ? "active" : ""}`}>
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>

      {/* Overlay Backdrop */}
      {isOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-brand">
          <img src={logo} alt="Smart Lend Logo" />
          <h3>SMART LEND</h3>
        </div>

        <nav className="sidebar-nav">
          {!isLoggedIn && (
            <>
              <Link to="/" onClick={closeSidebar}>Home</Link>
              <Link to="/about" onClick={closeSidebar}>About</Link>
              <Link to="/contact" onClick={closeSidebar}>Contact</Link>
              <Link to="/faq" onClick={closeSidebar}>FAQ</Link>
              <Link to="/login" onClick={closeSidebar}>Login</Link>
              <Link to="/register" onClick={closeSidebar}>Register</Link>
            </>
          )}

          {isLoggedIn && !isAdmin && (
            <>
              <h4>My Account</h4>
              <Link to="/dashboard" onClick={closeSidebar}>Dashboard</Link>
              <Link to="/apply-loan" onClick={closeSidebar}>Apply Loan</Link>
              <Link to="/loan-history" onClick={closeSidebar}>Loan History</Link>
              <Link to="/repayment" onClick={closeSidebar}>Repayment</Link>
              <Link to="/profile" onClick={closeSidebar}>Profile</Link>
              <button className="logout-btn" onClick={() => { handleLogout(); closeSidebar(); }}>
                Logout
              </button>
            </>
          )}

          {isLoggedIn && isAdmin && (
            <>
              <h4>Admin Panel</h4>
              <Link to="/admin/dashboard" onClick={closeSidebar}>Dashboard</Link>
               <Link to="/admin/loanProducts" onClick={closeSidebar}>Manage Products</Link>
              <Link to="/admin/users" onClick={closeSidebar}>Manage Users</Link>
              <Link to="/admin/loans" onClick={closeSidebar}>Manage Loans</Link>
              <Link to="/admin/approvals" onClick={closeSidebar}>Approvals</Link>
              {/* <Link to="/admin/reports" onClick={closeSidebar}>Reports</Link> */}
              {/* <Link to="/admin/notifications" onClick={closeSidebar}>Notifications</Link> */}
              <button className="logout-btn" onClick={() => { handleLogout(); closeSidebar(); }}>
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
