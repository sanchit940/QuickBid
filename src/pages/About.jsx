import React, { useState, useEffect } from "react";

const About = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f7fafc 0%, #e2e8f0 100%)",
        fontFamily: "'Inter', 'Montserrat', sans-serif",
        padding: "2rem 1rem",
        marginLeft: isMobile ? "0" : "250px",
        marginTop: isMobile ? "60px" : "0",
        paddingLeft: isMobile ? "1rem" : "2rem",
        boxSizing: "border-box",
        width: isMobile ? "100vw" : "calc(100vw - 250px)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          borderRadius: isMobile ? "16px" : "24px",
          padding: isMobile ? "2rem 1.5rem" : "4rem 3rem",
          boxShadow: "0 20px 40px rgba(26, 54, 93, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: isMobile ? "2rem" : "3rem" }}>
          <h1
            style={{
              fontSize: isMobile ? "2.2rem" : "3.5rem",
              fontWeight: "800",
              color: "#1a365d",
              marginBottom: "1.5rem",
              letterSpacing: "-0.02em",
            }}
          >
            Welcome to <span style={{ color: "#d69e2e" }}>QuickBid</span>
          </h1>
          <p
            style={{
              fontSize: isMobile ? "1.1rem" : "1.4rem",
              color: "#38b2ac",
              fontWeight: "500",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: "1.6",
            }}
          >
            The ultimate destination for online auctions and bidding excitement
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(300px, 1fr))",
            gap: isMobile ? "1.5rem" : "2rem",
            marginBottom: isMobile ? "2rem" : "3rem",
          }}
        >
          <div
            style={{
              padding: isMobile ? "1.5rem" : "2rem",
              background: "linear-gradient(135deg, #f7fafc 0%, #ffffff 100%)",
              borderRadius: "16px",
              border: "1px solid #e2e8f0",
            }}
          >
            <h3
              style={{
                fontSize: isMobile ? "1.2rem" : "1.3rem",
                fontWeight: "700",
                color: "#1a365d",
                marginBottom: "1rem",
              }}
            >
              Our Mission
            </h3>
            <p
              style={{
                fontSize: isMobile ? "1rem" : "1.1rem",
                color: "#4a5568",
                lineHeight: "1.7",
              }}
            >
              Revolutionize the way people buy and sell online. We create an engaging, trustworthy marketplace to empower individuals and businesses to discover unique products, make informed decisions, and enjoy the thrill of competitive bidding.
            </p>
          </div>

          <div
            style={{
              padding: isMobile ? "1.5rem" : "2rem",
              background: "linear-gradient(135deg, #f7fafc 0%, #ffffff 100%)",
              borderRadius: "16px",
              border: "1px solid #e2e8f0",
            }}
          >
            <h3
              style={{
                fontSize: isMobile ? "1.2rem" : "1.3rem",
                fontWeight: "700",
                color: "#1a365d",
                marginBottom: "1rem",
              }}
            >
              Our Story
            </h3>
            <p
              style={{
                fontSize: isMobile ? "1rem" : "1.1rem",
                color: "#4a5568",
                lineHeight: "1.7",
              }}
            >
              Founded by <span style={{ color: "#38b2ac", fontWeight: "600" }}>CodeWithZeeshu</span>, QuickBid was born from a passion for connecting people with unique and valuable items. With years of auction industry experience, our team is committed to an unparalleled user experience.
            </p>
          </div>
        </div>

        <div
          style={{
            background: "linear-gradient(135deg, #d69e2e 0%, #f6ad55 100%)",
            borderRadius: "20px",
            padding: isMobile ? "2rem 1.5rem" : "2.5rem",
            textAlign: "center",
            color: "#1a365d",
            marginBottom: "2rem",
          }}
        >
          <h3
            style={{
              fontSize: isMobile ? "1.3rem" : "1.5rem",
              fontWeight: "700",
              marginBottom: "1rem",
            }}
          >
            Join Our Community
          </h3>
          <p
            style={{
              fontSize: isMobile ? "1.1rem" : "1.2rem",
              fontWeight: "500",
            }}
          >
            Whether you're looking to buy, sell, or simply explore, join our growing community of auction enthusiasts!
          </p>
        </div>

        <div style={{ textAlign: "center" }}>
          <p
            style={{
              fontSize: isMobile ? "1rem" : "1.1rem",
              color: "#4a5568",
              lineHeight: "1.6",
              marginBottom: "1rem",
            }}
          >
            Founded in 2024, we are dedicated to providing a dynamic and user-friendly platform for buyers and sellers to connect, explore, and transact in a secure and seamless environment.
          </p>
          <p
            style={{
              fontSize: isMobile ? "1rem" : "1.1rem",
              color: "#4a5568",
            }}
          >
            Thank you for choosing <span style={{ color: "#d69e2e", fontWeight: "600" }}>QuickBid</span>. We look forward to being a part of your auction journey!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
