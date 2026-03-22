import React from "react";
import "./LoanHistory.css";

const LoanHistory = () => {
  const loans = [
    { id: 1, type: "Personal Loan", amount: "$5000", status: "Approved", date: "2026-01-05" },
    { id: 2, type: "Car Loan", amount: "$7000", status: "Pending", date: "2026-01-10" },
    { id: 3, type: "Education Loan", amount: "$3000", status: "Rejected", date: "2025-12-20" },
  ];

  return (
    <div className="page-container loan-history-page">
      <h1>Loan History</h1>
      <p>Track all your loan applications and their current status.</p>

      <table>
        <thead>
          <tr>
            <th>Loan Type</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Applied On</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr key={loan.id}>
              <td>{loan.type}</td>
              <td>{loan.amount}</td>
              <td className={`status ${loan.status.toLowerCase()}`}>{loan.status}</td>
              <td>{loan.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoanHistory;
