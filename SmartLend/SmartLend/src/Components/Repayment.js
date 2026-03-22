import React, { useState } from "react";
import "./Repayment.css";

const Repayment = () => {
  const [repayment, setRepayment] = useState({
    loanId: 1,
    amount: "",
    date: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRepayment({ ...repayment, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Repayment scheduled: $${repayment.amount} on ${repayment.date}`);
    // Connect to backend API
  };

  return (
    <div className="page-container repayment-page">
      <h1>Repayment</h1>
      <p>Make or schedule your loan repayment below.</p>

      <form className="repayment-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Loan</label>
          <select name="loanId" value={repayment.loanId} onChange={handleChange}>
            <option value={1}>Personal Loan - $5000</option>
            <option value={2}>Car Loan - $7000</option>
          </select>
        </div>

        <div className="form-group">
          <label>Amount ($)</label>
          <input type="number" name="amount" value={repayment.amount} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Repayment Date</label>
          <input type="date" name="date" value={repayment.date} onChange={handleChange} required />
        </div>

        <button type="submit" className="btn-repay">Schedule Repayment</button>
      </form>
    </div>
  );
};

export default Repayment;
