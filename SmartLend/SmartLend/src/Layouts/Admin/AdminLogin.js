import React, { useState } from "react";
import { useAuth } from "../../auth/AuthContext";

export default function AdminLogin() {
  const { handleLogin } = useAuth();
  const [serviceNo, setServiceNo] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    handleLogin(serviceNo, password);
  };

  return (
    <div className="login-box">
      <h2>Admin Login</h2>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Service No"
          value={serviceNo}
          onChange={(e) => setServiceNo(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
