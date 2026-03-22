import React, { useState } from "react";
import "./FAQ.css";

const faqData = [
  {
    question: "How do I apply for a loan?",
    answer: "You can apply by registering an account, logging in, and navigating to the 'Apply Loan' page. Fill in your details and submit the request."
  },
  {
    question: "What is the interest rate?",
    answer: "Interest rates vary depending on the loan type. You can see the current rates when applying for a loan in your dashboard."
  },
  {
    question: "How long does loan approval take?",
    answer: "Most loan requests are approved within a few hours. Some cases may take 1-2 business days for verification."
  },
  {
    question: "Can I repay my loan early?",
    answer: "Yes, you can repay your loan at any time from your dashboard. Early repayment may reduce your total interest."
  },
  {
    question: "Is my data safe?",
    answer: "Absolutely. All user and financial data is encrypted and securely stored in our system."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="page-container faq-page">
      <h1>Frequently Asked Questions</h1>
      <p>Here are some common questions about Smart Lend.</p>

      <div className="faq-wrapper">
        {faqData.map((item, index) => (
          <div key={index} className="faq-item">
            <div 
              className="faq-question" 
              onClick={() => toggle(index)}
            >
              <h3>{item.question}</h3>
              <span>{activeIndex === index ? "-" : "+"}</span>
            </div>
            {activeIndex === index && (
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
