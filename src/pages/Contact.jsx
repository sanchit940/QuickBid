import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigateTo = useNavigate();

  const handleContactForm = (e) => {
    e.preventDefault();
    setLoading(true);

    const templateParams = {
      name,
      email,
      phone,
      subject,
      message,
    };

    emailjs
      .send(
        "service_v01mtcu",
        "template_3a1r5xp",
        templateParams,
        "YcOimjllS64zn4ghK"
      )
      .then(() => {
        toast.success("Thank You! Your message has been sent successfully.");
        setLoading(false);
        setName("");
        setEmail("");
        setPhone("");
        setSubject("");
        setMessage("");
        navigateTo("/");
      })
      .catch((err) => {
        toast.error("Failed to send message.");
        setLoading(false);
      });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f7fafc 0%, #e2e8f0 100%)",
        fontFamily: "'Inter', 'Montserrat', sans-serif",
        padding: "2rem 1rem",
        marginLeft: window.innerWidth >= 768 ? "250px" : "0",
        boxSizing: "border-box",
        width: window.innerWidth >= 768 ? "calc(100vw - 250px)" : "100vw",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          borderRadius: window.innerWidth >= 768 ? "24px" : "16px",
          padding: window.innerWidth >= 1024 ? "4rem 3rem" : window.innerWidth >= 768 ? "3rem 2rem" : "2rem 1.5rem",
          boxShadow: "0 20px 40px rgba(26, 54, 93, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: window.innerWidth >= 768 ? "3rem" : "2rem" }}>
          <h1
            style={{
              fontSize: window.innerWidth >= 1024 ? "3.5rem" : window.innerWidth >= 768 ? "2.8rem" : "2.2rem",
              fontWeight: "800",
              color: "#1a365d",
              marginBottom: "1.5rem",
              letterSpacing: "-0.02em",
            }}
          >
            Contact <span style={{ color: "#d69e2e" }}>Us</span>
          </h1>
          <p
            style={{
              fontSize: window.innerWidth >= 1024 ? "1.4rem" : window.innerWidth >= 768 ? "1.2rem" : "1.1rem",
              color: "#38b2ac",
              fontWeight: "500",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: "1.6",
            }}
          >
            Get in touch with our team for any questions or support
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: window.innerWidth >= 1024 ? "1fr 1fr" : "1fr",
            gap: window.innerWidth >= 1024 ? "3rem" : "2rem",
            alignItems: "start",
          }}
        >
          {/* Contact Information */}
          <div>
            <h2
              style={{
                fontSize: window.innerWidth >= 768 ? "2rem" : "1.6rem",
                fontWeight: "700",
                color: "#1a365d",
                marginBottom: "2rem",
              }}
            >
              Get In Touch
            </h2>
            
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              <div
                style={{
                  padding: "1.5rem",
                  background: "linear-gradient(135deg, #f7fafc 0%, #ffffff 100%)",
                  borderRadius: "16px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <h3
                  style={{
                    fontSize: window.innerWidth >= 768 ? "1.2rem" : "1.1rem",
                    fontWeight: "600",
                    color: "#1a365d",
                    marginBottom: "0.5rem",
                  }}
                >
                  📧 Email Us
                </h3>
                <p style={{ color: "#4a5568", fontSize: window.innerWidth >= 768 ? "1rem" : "0.9rem" }}>
                  support@quickbid.com
                </p>
              </div>

              <div
                style={{
                  padding: "1.5rem",
                  background: "linear-gradient(135deg, #f7fafc 0%, #ffffff 100%)",
                  borderRadius: "16px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <h3
                  style={{
                    fontSize: window.innerWidth >= 768 ? "1.2rem" : "1.1rem",
                    fontWeight: "600",
                    color: "#1a365d",
                    marginBottom: "0.5rem",
                  }}
                >
                  📞 Call Us
                </h3>
                <p style={{ color: "#4a5568", fontSize: window.innerWidth >= 768 ? "1rem" : "0.9rem" }}>
                  +1 (555) 123-4567
                </p>
              </div>

              <div
                style={{
                  padding: "1.5rem",
                  background: "linear-gradient(135deg, #f7fafc 0%, #ffffff 100%)",
                  borderRadius: "16px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <h3
                  style={{
                    fontSize: window.innerWidth >= 768 ? "1.2rem" : "1.1rem",
                    fontWeight: "600",
                    color: "#1a365d",
                    marginBottom: "0.5rem",
                  }}
                >
                  🕒 Business Hours
                </h3>
                <p style={{ color: "#4a5568", fontSize: window.innerWidth >= 768 ? "1rem" : "0.9rem" }}>
                  Monday - Friday: 9:00 AM - 6:00 PM
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleContactForm}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: window.innerWidth >= 768 ? "1.1rem" : "1rem",
                      fontWeight: "600",
                      color: "#1a365d",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      width: "100%",
                      padding: window.innerWidth >= 768 ? "1rem" : "0.8rem",
                      fontSize: window.innerWidth >= 768 ? "1rem" : "0.9rem",
                      border: "2px solid #e2e8f0",
                      borderRadius: "12px",
                      background: "#ffffff",
                      transition: "all 0.3s ease",
                      outline: "none",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#38b2ac";
                      e.target.style.boxShadow = "0 0 0 3px rgba(56, 178, 172, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e2e8f0";
                      e.target.style.boxShadow = "none";
                    }}
                    required
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: window.innerWidth >= 768 ? "1.1rem" : "1rem",
                      fontWeight: "600",
                      color: "#1a365d",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: "100%",
                      padding: window.innerWidth >= 768 ? "1rem" : "0.8rem",
                      fontSize: window.innerWidth >= 768 ? "1rem" : "0.9rem",
                      border: "2px solid #e2e8f0",
                      borderRadius: "12px",
                      background: "#ffffff",
                      transition: "all 0.3s ease",
                      outline: "none",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#38b2ac";
                      e.target.style.boxShadow = "0 0 0 3px rgba(56, 178, 172, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e2e8f0";
                      e.target.style.boxShadow = "none";
                    }}
                    required
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: window.innerWidth >= 768 ? "1.1rem" : "1rem",
                      fontWeight: "600",
                      color: "#1a365d",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      width: "100%",
                      padding: window.innerWidth >= 768 ? "1rem" : "0.8rem",
                      fontSize: window.innerWidth >= 768 ? "1rem" : "0.9rem",
                      border: "2px solid #e2e8f0",
                      borderRadius: "12px",
                      background: "#ffffff",
                      transition: "all 0.3s ease",
                      outline: "none",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#38b2ac";
                      e.target.style.boxShadow = "0 0 0 3px rgba(56, 178, 172, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e2e8f0";
                      e.target.style.boxShadow = "none";
                    }}
                    required
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: window.innerWidth >= 768 ? "1.1rem" : "1rem",
                      fontWeight: "600",
                      color: "#1a365d",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    style={{
                      width: "100%",
                      padding: window.innerWidth >= 768 ? "1rem" : "0.8rem",
                      fontSize: window.innerWidth >= 768 ? "1rem" : "0.9rem",
                      border: "2px solid #e2e8f0",
                      borderRadius: "12px",
                      background: "#ffffff",
                      transition: "all 0.3s ease",
                      outline: "none",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#38b2ac";
                      e.target.style.boxShadow = "0 0 0 3px rgba(56, 178, 172, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e2e8f0";
                      e.target.style.boxShadow = "none";
                    }}
                    required
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: window.innerWidth >= 768 ? "1.1rem" : "1rem",
                      fontWeight: "600",
                      color: "#1a365d",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={window.innerWidth >= 768 ? 6 : 4}
                    style={{
                      width: "100%",
                      padding: window.innerWidth >= 768 ? "1rem" : "0.8rem",
                      fontSize: window.innerWidth >= 768 ? "1rem" : "0.9rem",
                      border: "2px solid #e2e8f0",
                      borderRadius: "12px",
                      background: "#ffffff",
                      transition: "all 0.3s ease",
                      outline: "none",
                      resize: "vertical",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#38b2ac";
                      e.target.style.boxShadow = "0 0 0 3px rgba(56, 178, 172, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e2e8f0";
                      e.target.style.boxShadow = "none";
                    }}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: "100%",
                    padding: window.innerWidth >= 768 ? "1rem 2rem" : "0.8rem 1.5rem",
                    fontSize: window.innerWidth >= 768 ? "1.1rem" : "1rem",
                    fontWeight: "600",
                    color: "#1a365d",
                    background: loading 
                      ? "linear-gradient(135deg, #cbd5e0 0%, #a0aec0 100%)"
                      : "linear-gradient(135deg, #d69e2e 0%, #f6ad55 100%)",
                    border: "none",
                    borderRadius: "12px",
                    cursor: loading ? "not-allowed" : "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 12px rgba(214, 158, 46, 0.3)",
                  }}
                  onMouseOver={(e) => {
                    if (!loading) {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow = "0 6px 20px rgba(214, 158, 46, 0.4)";
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!loading) {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "0 4px 12px rgba(214, 158, 46, 0.3)";
                    }
                  }}
                >
                  {loading ? "Sending Message..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
