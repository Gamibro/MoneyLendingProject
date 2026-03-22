import React, { useState } from "react";
import "./Profile.css";

const Profile = () => {
  // Dummy user data
  const [user, setUser] = useState({
    fullName: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 890",
    address: "123 Main Street, City, Country",
    bankName: "ABC Bank",
    accountNumber: "1234567890",
    ifscCode: "ABCD0123456",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
    // Here you can call your backend API to save changes
  };

  return (
    <div className="page-container profile-page">
      <h1>My Profile</h1>
      <p>Update your personal information and bank details below.</p>

      <form className="profile-form" onSubmit={handleSave}>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" name="fullName" value={user.fullName} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={user.email} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input type="text" name="phone" value={user.phone} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input type="text" name="address" value={user.address} onChange={handleChange} />
        </div>

        <h2>Bank Details</h2>

        <div className="form-group">
          <label>Bank Name</label>
          <input type="text" name="bankName" value={user.bankName} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Account Number</label>
          <input type="text" name="accountNumber" value={user.accountNumber} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>IFSC Code</label>
          <input type="text" name="ifscCode" value={user.ifscCode} onChange={handleChange} />
        </div>

        <button type="submit" className="btn-save">Save Changes</button>
      </form>
    </div>
  );
};

export default Profile;
