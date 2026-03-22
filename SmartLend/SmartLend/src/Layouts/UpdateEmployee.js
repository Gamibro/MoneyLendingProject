import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetEmployeeByIdQuery,
  useUpdateEmployeeMutation,
  useGetDepartmentsQuery,
  useGetLocationsByDepartmentQuery,
  useGetDesignationsQuery,
  useGetEducationsQuery,
  useGetHometownsQuery,
} from "../services/EmployeeService";
import "./Updatestyles.css";

const UpdateEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: emp } = useGetEmployeeByIdQuery(id);
  const { data: departments } = useGetDepartmentsQuery();
  const { data: designations } = useGetDesignationsQuery();
  const { data: educations } = useGetEducationsQuery();
  const { data: hometowns } = useGetHometownsQuery();
  const [updateEmployee] = useUpdateEmployeeMutation();

  const [formData, setFormData] = useState(null);

  const { data: locations } = useGetLocationsByDepartmentQuery(
    formData?.hdd_Department_id || undefined
  );

  useEffect(() => {
    if (
      emp?.ResultSet?.length &&
      departments?.ResultSet?.length &&
      designations?.ResultSet?.length &&
      educations?.ResultSet?.length &&
      hometowns?.ResultSet?.length
    ) {
      const e = emp.ResultSet[0];

      setFormData({
        hed_Employee_id: Number(e.hed_Employee_id),
        hed_Employee_Name: e.hed_Employee_Name || "",
        hed_Phone: e.hed_Phone || "",
        hed_Email: e.hed_Email || "",
        hhd_Hometown_id: Number(e.hhd_Hometown_id),
        hdd_Department_id: Number(e.hdd_Department_id),
        hld_location_id: Number(e.hld_location_id),
        hdd_Designation_id: Number(e.hdd_Designation_id),
        hed_Education_id: Number(e.hed_Education_id),
      });
    }
  }, [emp, departments, designations, educations, hometowns]);

  if (!formData) return <div className="ue-loader">Loading...</div>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name.includes("_id") ? Number(value) : value,
      ...(name === "hdd_Department_id" ? { hld_location_id: "" } : {}),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateEmployee(formData);
    alert("Employee Updated Successfully");
    navigate("/ReadEmployee");
  };

  return (
    <div className="ue-bg">
      <div className="ue-card">
        <h2 className="ue-title">✏️ Edit Employee Details</h2>

        <form onSubmit={handleSubmit} className="ue-grid">
          <div className="ue-field">
            <label>Full Name</label>
            <input
              name="hed_Employee_Name"
              value={formData.hed_Employee_Name}
              onChange={handleChange}
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="ue-field">
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

          <div className="ue-field">
            <label>Phone Number</label>
            <input
              name="hed_Phone"
              value={formData.hed_Phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
            />
          </div>

          <div className="ue-field">
            <label>Email</label>
            <input
              name="hed_Email"
              value={formData.hed_Email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </div>

          <div className="ue-field">
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

          <div className="ue-field">
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

          <div className="ue-field">
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

          <div className="ue-field">
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

          <div className="ue-submit">
            <button type="submit" className="ue-btn">
              💾 Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEmployee;
