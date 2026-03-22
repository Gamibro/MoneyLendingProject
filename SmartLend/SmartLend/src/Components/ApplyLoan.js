import React, { useState } from "react";
import "./ApplyLoan.css";

const ApplyLoan = () => {
  const [loan, setLoan] = useState({
    type: "Personal Loan",
    amount: "",
    term: "",
    reason: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoan({ ...loan, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Loan application submitted: ${loan.type}, Amount: $${loan.amount}`);
    // Call backend API to save loan
  };

  return (
    <div className="page-container apply-loan-page">
      <h1>Apply for a Loan</h1>
      <p>Fill out the form below to submit a new loan request.</p>

      <form className="loan-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Loan Type</label>
          <select name="type" value={loan.type} onChange={handleChange}>
            <option>Personal Loan</option>
            <option>Car Loan</option>
            <option>Business Loan</option>
            <option>Education Loan</option>
          </select>
        </div>

        <div className="form-group">
          <label>Amount ($)</label>
          <input type="number" name="amount" value={loan.amount} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Term (months)</label>
          <input type="number" name="term" value={loan.term} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Reason for Loan</label>
          <textarea name="reason" value={loan.reason} onChange={handleChange} />
        </div>

        <button type="submit" className="btn-submit">Submit Application</button>
      </form>
    </div>
  );
};

export default ApplyLoan;
