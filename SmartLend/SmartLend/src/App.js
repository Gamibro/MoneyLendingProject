import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// CONTEXT
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute";

// COMPONENTS
import Sidebar from "./Components/Sidebar";


// PAGES

import About from "./Components/About";
import Contact from "./Components/Contact";
import FAQ from "./Components/FAQ";
import Login from "./Components/Login";
import Register from "./Components/Register";
import HomePage from "./Components/HomePage";
import Dashboard from "./Components/Dashboard";
import ApplyLoan from "./Components/ApplyLoan";
import LoanHistory from "./Components/LoanHistory";
import Repayment from "./Components/Repayment";
import Profile from "./Components/Profile";

import AdminDashboard from "./Components/Admin/AdminDashboard";
import ManageUsers from "./Components/Admin/ManageUsers";
import ManageLoans from "./Components/Admin/ManageLoans";
import Approvals from "./Components/Admin/Approvals";
import Reports from "./Components/Admin/Reports";
import LoanProduct from "./Components/Admin/LoanProduct";

import Notifications from "./Components/Admin/Notifications";

function App() {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated);
  const [isAdminUser, setIsAdminUser] = useState(isAdmin);

  // Update local state when context changes
  React.useEffect(() => {
    setIsLoggedIn(isAuthenticated);
    setIsAdminUser(isAdmin);
  }, [isAuthenticated, isAdmin]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app-container">
      {/* SIDEBAR */}
      <Sidebar
        isLoggedIn={isLoggedIn}
        isAdmin={isAdminUser}
      />

      {/* PAGE CONTENT */}
      <div className="page-content">
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to={isAdmin ? "/admin/dashboard" : "/dashboard"} />
              ) : (
                <Login setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdminUser} />
              )
            }
          />
          <Route path="/register" element={<Register />} />

          {/* BORROWER/USER PROTECTED ROUTES */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/apply-loan"
            element={
              <ProtectedRoute>
                <ApplyLoan />
              </ProtectedRoute>
            }
          />
          <Route
            path="/loan-history"
            element={
              <ProtectedRoute>
                <LoanHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/repayment"
            element={
              <ProtectedRoute>
                <Repayment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* ADMIN PROTECTED ROUTES */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                {isAdmin ? <AdminDashboard /> : <Navigate to="/dashboard" />}
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                {isAdmin ? <ManageUsers /> : <Navigate to="/dashboard" />}
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/loans"
            element={
              <ProtectedRoute>
                {isAdmin ? <ManageLoans /> : <Navigate to="/dashboard" />}
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/approvals"
            element={
              <ProtectedRoute>
                {isAdmin ? <Approvals /> : <Navigate to="/dashboard" />}
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/reports"
            element={
              <ProtectedRoute>
                {isAdmin ? <Reports /> : <Navigate to="/dashboard" />}
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/loanProducts"
            element={
              <ProtectedRoute>
                {isAdmin ? <LoanProduct/> : <Navigate to="/dashboard" />}
              </ProtectedRoute>
            }
          />

          {/* FALLBACK ROUTE */}
          <Route
            path="*"
            element={
              <h2 style={{ textAlign: "center", marginTop: "50px" }}>
                Page Not Found
              </h2>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
