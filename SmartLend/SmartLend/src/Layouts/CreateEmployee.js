import React, { useState } from "react";
import {
  useCreateEmployeeMutation,
  useGetDepartmentsQuery,
  useGetLocationsByDepartmentQuery,
  useGetDesignationsQuery,
  useGetEducationsQuery,
  useGetHometownsQuery,
} from "../services/EmployeeService";
import "./Createstyles.css";

const CreateEmployee = () => {
  const [formData, setFormData] = useState({
    hed_Employee_Name: "",
    hhd_Hometown_id: "",
    hed_Employee_Hometown: "",
    hed_Phone: "",
    hed_Email: "",
    hdd_Department_id: "",
    hld_location_id: "",
    hld_Location_Name: "",
    hdd_Designation_id: "",
    hdd_Designation_Name: "",
    hed_Education_id: "",
    hed_Education_Name: "",
  });

  const { data: departments } = useGetDepartmentsQuery();
  const { data: designations } = useGetDesignationsQuery();
  const { data: educations } = useGetEducationsQuery();
  const { data: hometowns } = useGetHometownsQuery();
  const { data: locations } = useGetLocationsByDepartmentQuery(
    formData.hdd_Department_id || undefined
  );

  const [createEmployee, { isLoading }] = useCreateEmployeeMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Auto-fill names based on selected IDs
    if (name === "hhd_Hometown_id") {
      const ht = hometowns?.ResultSet?.find((h) => h.hhd_Hometown_id == value);
      setFormData((prev) => ({ ...prev, hed_Employee_Hometown: ht?.hhd_Hometown_Name || "" }));
    }

    if (name === "hdd_Department_id") {
      setFormData((prev) => ({ ...prev, hld_location_id: "", hld_Location_Name: "" }));
    }

    if (name === "hld_location_id") {
      const loc = locations?.ResultSet?.find((l) => l.hld_location_id == value);
      setFormData((prev) => ({ ...prev, hld_Location_Name: loc?.hld_location_Name || "" }));
    }

    if (name === "hdd_Designation_id") {
      const des = designations?.ResultSet?.find((d) => d.hdd_Designation_id == value);
      setFormData((prev) => ({ ...prev, hdd_Designation_Name: des?.hdd_Designation_Name || "" }));
    }

    if (name === "hed_Education_id") {
      const edu = educations?.ResultSet?.find((e) => e.hed_Education_id == value);
      setFormData((prev) => ({ ...prev, hed_Education_Name: edu?.hed_Education_Name || "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEmployee(formData).unwrap();
      alert("Employee created successfully!");
      setFormData({
        hed_Employee_Name: "",
        hhd_Hometown_id: "",
        hed_Employee_Hometown: "",
        hed_Phone: "",
        hed_Email: "",
        hdd_Department_id: "",
        hld_location_id: "",
        hld_Location_Name: "",
        hdd_Designation_id: "",
        hdd_Designation_Name: "",
        hed_Education_id: "",
        hed_Education_Name: "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to create employee. Check console.");
    }
  };

  return (
    <div className="ce-bg">
      <div className="ce-card">
        <h2 className="ce-title">➕ Create New Employee</h2>

        <form onSubmit={handleSubmit} className="ce-grid">
          <div className="ce-field">
            <label>Full Name</label>
            <input
              name="hed_Employee_Name"
              value={formData.hed_Employee_Name}
              onChange={handleChange}
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="ce-field">
            <label>Hometown</label>
            <select
              name="hhd_Hometown_id"
              value={formData.hhd_Hometown_id}
              onChange={handleChange}
              required
            >
              <option value="">Select Hometown</option>
              {hometowns?.ResultSet?.map((h) => (
                <option key={h.hhd_Hometown_id} value={h.hhd_Hometown_id}>
                  {h.hhd_Hometown_Name}
                </option>
              ))}
            </select>
          </div>

          <div className="ce-field">
            <label>Phone Number</label>
            <input
              name="hed_Phone"
              value={formData.hed_Phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
            />
          </div>

          <div className="ce-field">
            <label>Email</label>
            <input
              name="hed_Email"
              value={formData.hed_Email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </div>

          <div className="ce-field">
            <label>Department</label>
            <select
              name="hdd_Department_id"
              value={formData.hdd_Department_id}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              {departments?.ResultSet?.map((d) => (
                <option key={d.hdd_Department_id} value={d.hdd_Department_id}>
                  {d.hdd_Department_Name}
                </option>
              ))}
            </select>
          </div>

          <div className="ce-field">
            <label>Location</label>
            <select
              name="hld_location_id"
              value={formData.hld_location_id}
              onChange={handleChange}
              required
            >
              <option value="">Select Location</option>
              {locations?.ResultSet?.map((l) => (
                <option key={l.hld_location_id} value={l.hld_location_id}>
                  {l.hld_location_Name}
                </option>
              ))}
            </select>
          </div>

          <div className="ce-field">
            <label>Designation</label>
            <select
              name="hdd_Designation_id"
              value={formData.hdd_Designation_id}
              onChange={handleChange}
              required
            >
              <option value="">Select Designation</option>
              {designations?.ResultSet?.map((d) => (
                <option key={d.hdd_Designation_id} value={d.hdd_Designation_id}>
                  {d.hdd_Designation_Name}
                </option>
              ))}
            </select>
          </div>

          <div className="ce-field">
            <label>Education</label>
            <select
              name="hed_Education_id"
              value={formData.hed_Education_id}
              onChange={handleChange}
              required
            >
              <option value="">Select Education</option>
              {educations?.ResultSet?.map((e) => (
                <option key={e.hed_Education_id} value={e.hed_Education_id}>
                  {e.hed_Education_Name}
                </option>
              ))}
            </select>
          </div>

          <div className="ce-submit">
            <button type="submit" className="ce-btn" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEmployee;
