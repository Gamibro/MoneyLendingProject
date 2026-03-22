import React, { useState } from "react";
import { useReadEmployeesQuery, useDeleteEmployeeMutation } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";
import "./ReadEmployee.css";

const ReadEmployee = () => {
  const { data: employees, isLoading } = useReadEmployeesQuery();
  const [deleteEmployee] = useDeleteEmployeeMutation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  if (isLoading) return <div className="re-loader">Loading...</div>;

  const filtered = employees?.ids
    .map(id => employees.entities[id])
    .filter(e =>
      e.hed_Employee_Name.toLowerCase().includes(search.toLowerCase()) ||
      e.hed_Email.toLowerCase().includes(search.toLowerCase())
    );

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      await deleteEmployee(id);
    }
  };

  return (
    <div className="re-bg">
      <div className="re-card">
        <div className="re-head">
          <h2>👥 Employee Directory</h2>
          <input
            placeholder="Search employee..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="re-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Hometown</th>
                <th>Department</th>
                <th>Location</th>
                <th>Designation</th>
                <th>Education</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered?.map(emp => (
                <tr key={emp.hed_Employee_id}>
                  <td data-label="Name">{emp.hed_Employee_Name}</td>
                  <td data-label="Email">{emp.hed_Email}</td>
                  <td data-label="Phone">{emp.hed_Phone}</td>
                  <td data-label="Hometown">{emp.hed_Employee_Hometown}</td>
                  <td data-label="Department">{emp.hdd_Department_Name}</td>
                  <td data-label="Location">{emp.hld_location_Name}</td>
                  <td data-label="Designation">{emp.hed_Designation}</td>
                  <td data-label="Education">{emp.hed_Education}</td>
                  <td data-label="Actions">
                    <button
                      className="re-btn re-edit"
                      onClick={() => navigate(`/update-employee/${emp.hed_Employee_id}`)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="re-btn re-del"
                      onClick={() => handleDelete(emp.hed_Employee_id)}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReadEmployee;
