import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just log the data
    console.log("Contact Form Data:", formData);
    alert("Thank you for contacting us! We will get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="page-container contact-page">
      <h1>Contact Smart Lend</h1>
      <p>Have questions? Reach out to us and we’ll respond as soon as possible.</p>

      <div className="contact-wrapper">
        {/* Contact Info */}
        <div className="contact-info">
          <h3>Our Office</h3>
          <p>123 Fintech Street, Colombo, Sri Lanka</p>
          <p>Email: support@smartlend.com</p>
          <p>Phone: +94 77 123 4567</p>
          <h3>Business Hours</h3>
          <p>Mon – Fri: 9am – 6pm</p>
          <p>Sat: 10am – 2pm</p>
          <p>Sun: Closed</p>
        </div>

        {/* Contact Form */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="name" 
            placeholder="Your Name" 
            value={formData.name} 
            onChange={handleChange} 
            required
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Your Email" 
            value={formData.email} 
            onChange={handleChange} 
            required
          />
          <input 
            type="text" 
            name="subject" 
            placeholder="Subject" 
            value={formData.subject} 
            onChange={handleChange} 
            required
          />
          <textarea 
            name="message" 
            rows="5" 
            placeholder="Your Message" 
            value={formData.message} 
            onChange={handleChange} 
            required
          />
          <button type="submit" className="btn-cta">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
