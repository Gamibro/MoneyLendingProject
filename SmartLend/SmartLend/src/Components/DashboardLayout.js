import React from "react";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ role, onLogout, children }) => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar role={role} onLogout={onLogout} />

      <div style={{ marginLeft: "250px", padding: "30px", width: "100%" }}>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
