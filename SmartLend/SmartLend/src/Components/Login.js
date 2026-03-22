import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSendOtpMutation, useVerifyOtpMutation } from "../services/apiSlice";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

const Login = ({ setIsLoggedIn, setIsAdmin }) => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { handleLogin } = useAuth();
  const [sendOtp] = useSendOtpMutation();
  const [verifyOtp] = useVerifyOtpMutation();

  const handleSendOtp = async () => {
    if (!phone.trim()) {
      setError("Please enter a phone number");
      return;
    }
    if (phone.length !== 10) {
      setError("Phone number must be 10 digits");
      return;
    }

    setError("");
    setLoading(true);
    try {
      const res = await sendOtp({ phone }).unwrap();

      // Check for error response first
      if (res?.Result === "Phone not found" || res?.Result === "Phone not found." || res?.Message?.includes("not found")) {
        setOtpSent(false);
        setError("Phone number not found in our system. Please register first.");
        alert("❌ Phone number not found in our system. Please register first.");
        return;
      }

      // Get OTP from response - it's in the Result field
      if (res?.Result && res.Result !== "Phone not found" && res.Result !== "Phone not found.") {
        setGeneratedOtp(res.Result);
        setOtpSent(true);
        setError("");
        alert(`✅ OTP sent successfully!\n\nYour OTP: ${res.Result}`);
      } else if (res?.resultSet?.otpCode) {
        setGeneratedOtp(res.resultSet.otpCode);
        setOtpSent(true);
        setError("");
        alert(`✅ OTP sent successfully!\n\nYour OTP: ${res.resultSet.otpCode}`);
      } else if (res?.Success === false || res?.IsSuccess === false) {
        setOtpSent(false);
        const errorMsg = res?.Message || res?.Result || "Failed to send OTP. Please try again.";
        setError(errorMsg);
        alert(`❌ ${errorMsg}`);
      } else {
        setOtpSent(true);
        setError("");
        alert("✅ OTP sent successfully to your phone");
      }
    } catch (err) {
      console.error("Send OTP error:", err);
      const errorMsg = err?.data?.message || err?.data?.Result || "Failed to send OTP. Please try again.";
      setOtpSent(false);
      setError(errorMsg);
      alert(`❌ ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      setError("Please enter the OTP");
      return;
    }

    setError("");
    setLoading(true);
    try {
      const res = await verifyOtp({ phone, otpCode: otp }).unwrap();

      // Check for ResultSet (capital R, capital S) from backend
      if (res?.ResultSet?.token && res?.ResultSet?.user) {
        const { token, user } = res.ResultSet;

        // Use AuthContext to handle login
        handleLogin(token, user);

        // Also update props for backward compatibility
        setIsLoggedIn(true);
        const isUserAdmin = user?.roleName?.toLowerCase() === "admin" || user?.role?.toLowerCase() === "admin";
        setIsAdmin(isUserAdmin);

        alert(res?.Result || "Login successful!");
        console.log("This is the user Admin set to  " + isUserAdmin);

        // Navigate based on user role
        if (isUserAdmin) {
          navigate("/admin/dashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        setError("Invalid response from server. Please try again.");
        alert("Login failed. Invalid response from server.");
      }
    } catch (err) {
      console.error("Verify OTP error:", err);
      const errorMsg = err?.data?.message || err?.data?.Result || "Invalid OTP. Please try again.";
      setError(errorMsg);
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = () => {
    setOtp("");
    setOtpSent(false);
    setGeneratedOtp(null);
    setError("");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login</h1>
        <p className="login-subtitle">Enter your phone number and OTP</p>

        {!otpSent ? (
          // Phone Input Screen
          <div className="login-form">
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
              <label htmlFor="phone">Phone Number:</label>
              <input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                maxLength={10}
                type="tel"
                disabled={loading}
                className="form-input"
              />
            </div>
            <button
              onClick={handleSendOtp}
              disabled={loading}
              className="btn-primary"
            >
              {loading ? (
                <>
                  <span className="spinner"></span> Sending OTP...
                </>
              ) : (
                "Get Verification Code"
              )}
            </button>
            <p className="form-helper">We'll send you a verification code</p>
          </div>
        ) : (
          // OTP Verification Screen
          <div className="login-form otp-form">
            {error && <div className="error-message">{error}</div>}
            <div className="phone-info">
              <p className="info-text">Verification code sent to</p>
              <p className="phone-number">{phone}</p>
              <button className="btn-change-phone" onClick={handleResendOtp} disabled={loading}>
                Change number
              </button>
            </div>

            <div className="form-group">
              <label htmlFor="otp">Enter Verification Code:</label>
              <input
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                type="text"
                disabled={loading}
                className="form-input otp-input"
              />
            </div>

            {generatedOtp && (
              <div className="otp-display">
                <p className="otp-label">Generated OTP for testing:</p>
                <p className="otp-code">{generatedOtp}</p>
              </div>
            )}

            <div className="otp-timer">
              <p className="timer-text">Didn't receive code? <button className="btn-resend" onClick={handleResendOtp} disabled={loading}>Resend</button></p>
            </div>

            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              className="btn-primary btn-verify"
            >
              {loading ? (
                <>
                  <span className="spinner"></span> Verifying...
                </>
              ) : (
                "Login"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
