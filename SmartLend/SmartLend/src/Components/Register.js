import React, { useState } from "react";
import { useRegisterUserMutation } from "../services/apiSlice";
import { useNavigate,Link} from "react-router-dom";
import "./Register.css";


const Register = () => {
  const [formData, setFormData] = useState({
    userName: "",
    phone: "",
    email: "",
    firstName: "",
    lastName: "",
    nic: "",
    address: "",
    dob: "",
    occupation: "",
  });

  const [errors, setErrors] = useState({});
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Validation Rules
  const validateForm = () => {
    const newErrors = {};

    // Username validation: 4-20 characters, alphanumeric and underscore
    if (!formData.userName.trim()) {
      newErrors.userName = "Username is required";
    } else if (formData.userName.trim().length < 4) {
      newErrors.userName = "Username must be at least 4 characters long";
    } else if (formData.userName.trim().length > 20) {
      newErrors.userName = "Username must not exceed 20 characters";
    } else if (!/^[a-zA-Z0-9_]{4,20}$/.test(formData.userName)) {
      newErrors.userName = "Username can only contain letters, numbers, and underscores";
    }

    // Phone validation: exactly 10 digits
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    // Email validation: proper email format
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address (e.g., user@example.com)";
    }

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters long";
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters long";
    }

    // NIC validation
    if (!formData.nic.trim()) {
      newErrors.nic = "NIC is required";
    } else if (formData.nic.trim().length < 9) {
      newErrors.nic = "NIC must be at least 9 characters long";
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    } else if (formData.address.trim().length < 5) {
      newErrors.address = "Address must be at least 5 characters long";
    }

    // Date of Birth validation
    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
    } else {
      const selectedDate = new Date(formData.dob);
      const today = new Date();
      const age = today.getFullYear() - selectedDate.getFullYear();
      if (age < 18) {
        newErrors.dob = "You must be at least 18 years old";
      }
      if (selectedDate > today) {
        newErrors.dob = "Date of birth cannot be in the future";
      }
    }

    // Occupation validation
    if (!formData.occupation.trim()) {
      newErrors.occupation = "Occupation is required";
    } else if (formData.occupation.trim().length < 2) {
      newErrors.occupation = "Occupation must be at least 2 characters long";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      const res = await registerUser(formData).unwrap();
      alert(res?.Message || res?.Result || "Registration successful! Please login.");
      setFormData({
        userName: "",
        phone: "",
        email: "",
        firstName: "",
        lastName: "",
        nic: "",
        address: "",
        dob: "",
        occupation: "",
      });
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert(err?.data?.Message || err?.data?.Result || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-header">
          <h1>Create Account</h1>
          <p className="register-subtitle">Join SmartLend today</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          {/* Row 1: Username & Phone */}
          <div className="form-row">
            <div className="form-group half-width">
              <label htmlFor="userName">Username</label>
              <input
                type="text"
                id="userName"
                name="userName"
                placeholder="User name (4-20 chars)"
                value={formData.userName}
                onChange={handleChange}
                className={errors.userName ? "input-error" : ""}
                disabled={isLoading}
              />
              {errors.userName && <span className="error-message">{errors.userName}</span>}
            </div>

            <div className="form-group half-width">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter 10-digit numbers"
                value={formData.phone}
                onChange={handleChange}
                maxLength={10}
                className={errors.phone ? "input-error" : ""}
                disabled={isLoading}
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>
          </div>

          {/* Row 2: Email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "input-error" : ""}
              disabled={isLoading}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          {/* Row 3: First Name & Last Name */}
          <div className="form-row">
            <div className="form-group half-width">
              <label htmlFor="Enter First Name">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter First Name"
                value={formData.firstName}
                onChange={handleChange}
                className={errors.firstName ? "input-error" : ""}
                disabled={isLoading}
              />
              {errors.firstName && <span className="error-message">{errors.firstName}</span>}
            </div>

            <div className="form-group half-width">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={handleChange}
                className={errors.lastName ? "input-error" : ""}
                disabled={isLoading}
              />
              {errors.lastName && <span className="error-message">{errors.lastName}</span>}
            </div>
          </div>

          {/* Row 4: NIC & DOB */}
          <div className="form-row">
            <div className="form-group half-width">
              <label htmlFor="Enter your NIC or ID Number">NIC / ID</label>
              <input
                type="text"
                id="nic"
                name="nic"
                placeholder="ID number"
                value={formData.nic}
                onChange={handleChange}
                className={errors.nic ? "input-error" : ""}
                disabled={isLoading}
              />
              {errors.nic && <span className="error-message">{errors.nic}</span>}
            </div>

            <div className="form-group half-width">
              <label htmlFor="dob">Date of Birth</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className={errors.dob ? "input-error" : ""}
                disabled={isLoading}
              />
              {errors.dob && <span className="error-message">{errors.dob}</span>}
            </div>
          </div>

          {/* Row 5: Address & Occupation */}
          <div className="form-row">
            <div className="form-group half-width">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className={errors.address ? "input-error" : ""}
                disabled={isLoading}
              />
              {errors.address && <span className="error-message">{errors.address}</span>}
            </div>

            <div className="form-group half-width">
              <label htmlFor="occupation">Occupation</label>
              <input
                type="text"
                id="occupation"
                name="occupation"
                placeholder="Occupation"
                value={formData.occupation}
                onChange={handleChange}
                className={errors.occupation ? "input-error" : ""}
                disabled={isLoading}
              />
              {errors.occupation && <span className="error-message">{errors.occupation}</span>}
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={isLoading} className="btn-primary">
            {isLoading ? (
              <>
                <span className="spinner"></span> Registering...
              </>
            ) : (
              "Create Account"
            )}
          </button>

          {/* Login Link */}
          <p className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
