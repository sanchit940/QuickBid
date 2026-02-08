import { useState, useEffect } from "react";
import {
  FaUser,
  FaGavel,
  FaEnvelope,
  FaDollarSign,
  FaFileInvoice,
  FaRedo,
} from "react-icons/fa";

const HowItWorks = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const steps = [
    {
      icon: <FaUser />,
      title: "User Registration",
      description:
        "Users must register or log in to perform operations such as posting auctions, bidding on items, accessing the dashboard, and sending payment proof.",
    },
    {
      icon: <FaGavel />,
      title: "Role Selection",
      description:
        'Users can register as either a "Bidder" or "Auctioneer." Bidders can bid on items, while Auctioneers can post items.',
    },
    {
      icon: <FaEnvelope />,
      title: "Winning Bid Notification",
      description:
        "After winning an item, the highest bidder will receive an email with the Auctioneer's payment method information, including bank transfer, Easypaisa, and PayPal.",
    },
    {
      icon: <FaDollarSign />,
      title: "Commission Payment",
      description:
        "If the Bidder pays, the Auctioneer must pay 5% of that payment to the platform. Failure to pay results in being unable to post new items, and a legal notice will be sent.",
    },
    {
      icon: <FaFileInvoice />,
      title: "Proof of Payment",
      description:
        "The platform receives payment proof as a screenshot and the total amount sent. Once approved by the Administrator, the unpaid commission of the Auctioneer will be adjusted accordingly.",
    },
    {
      icon: <FaRedo />,
      title: "Reposting Items",
      description:
        "If the Bidder does not pay, the Auctioneer can republish the item without any additional cost.",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f7fafc 0%, #e2e8f0 100%)",
        fontFamily: "'Inter', 'Montserrat', sans-serif",
        padding: "1rem",
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
        <div style={{ textAlign: "center", marginBottom: isMobile ? "3rem" : "4rem" }}>
          <h1
            style={{
              fontSize: isMobile ? "2.2rem" : "3.5rem",
              fontWeight: "800",
              color: "#1a365d",
              marginBottom: "1.5rem",
              letterSpacing: "-0.02em",
              lineHeight: "1.2",
            }}
          >
            How <span style={{ color: "#d69e2e" }}>QuickBid</span> Works
          </h1>
          <p
            style={{
              fontSize: isMobile ? "1.1rem" : "1.4rem",
              color: "#38b2ac",
              fontWeight: "500",
              maxWidth: "700px",
              margin: "0 auto",
              lineHeight: "1.6",
            }}
          >
            Discover the simple and transparent process behind our auction platform
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(350px, 1fr))",
            gap: isMobile ? "1.5rem" : "2rem",
            marginBottom: isMobile ? "2rem" : "3rem",
          }}
        >
          {steps.map((element, index) => (
            <div
              key={index}
              style={{
                padding: isMobile ? "2rem 1.5rem" : "2.5rem 2rem",
                background: "linear-gradient(135deg, #ffffff 0%, #f7fafc 100%)",
                borderRadius: "20px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 8px 25px rgba(26, 54, 93, 0.08)",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 15px 35px rgba(26, 54, 93, 0.15)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(26, 54, 93, 0.08)";
              }}
            >
              {/* Step Number */}
              <div
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  width: isMobile ? "2rem" : "2.5rem",
                  height: isMobile ? "2rem" : "2.5rem",
                  background: "linear-gradient(135deg, #d69e2e 0%, #f6ad55 100%)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#1a365d",
                  fontWeight: "700",
                  fontSize: isMobile ? "0.9rem" : "1rem",
                }}
              >
                {index + 1}
              </div>

              {/* Icon */}
              <div
                style={{
                  width: isMobile ? "3rem" : "4rem",
                  height: isMobile ? "3rem" : "4rem",
                  background: "linear-gradient(135deg, #38b2ac 0%, #4fd1c7 100%)",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  fontSize: isMobile ? "1.2rem" : "1.5rem",
                  marginBottom: "1.5rem",
                  boxShadow: "0 4px 15px rgba(56, 178, 172, 0.3)",
                }}
              >
                {element.icon}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: isMobile ? "1.2rem" : "1.4rem",
                  fontWeight: "700",
                  color: "#1a365d",
                  marginBottom: "1rem",
                  lineHeight: "1.3",
                }}
              >
                {element.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: isMobile ? "1rem" : "1.1rem",
                  color: "#4a5568",
                  lineHeight: "1.7",
                  margin: 0,
                }}
              >
                {element.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <div
          style={{
            background: "linear-gradient(135deg, #1a365d 0%, #2d5a87 100%)",
            borderRadius: "20px",
            padding: isMobile ? "2rem 1.5rem" : "3rem 2rem",
            textAlign: "center",
            color: "#ffffff",
            marginTop: isMobile ? "2rem" : "3rem",
          }}
        >
          <h2
            style={{
              fontSize: isMobile ? "1.8rem" : "2.2rem",
              fontWeight: "700",
              marginBottom: "1rem",
              color: "#ffffff",
            }}
          >
            Ready to Start Your Auction Journey?
          </h2>
          <p
            style={{
              fontSize: isMobile ? "1.1rem" : "1.2rem",
              marginBottom: "2rem",
              color: "#cbd5e0",
              maxWidth: "600px",
              margin: "0 auto 2rem auto",
              lineHeight: "1.6",
            }}
          >
            Join thousands of users who trust QuickBid for their auction needs. Whether you&apos;re buying or selling, our platform makes it simple and secure.
          </p>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
              flexDirection: isMobile ? "column" : "row",
              alignItems: "center",
            }}
          >
            <button
              style={{
                padding: isMobile ? "1rem 2rem" : "1rem 2rem",
                fontSize: isMobile ? "1rem" : "1.1rem",
                fontWeight: "600",
                color: "#1a365d",
                background: "linear-gradient(135deg, #d69e2e 0%, #f6ad55 100%)",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(214, 158, 46, 0.3)",
                width: isMobile ? "100%" : "auto",
              }}
              onMouseOver={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 20px rgba(214, 158, 46, 0.4)";
              }}
              onMouseOut={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 15px rgba(214, 158, 46, 0.3)";
              }}
            >
              Start Bidding
            </button>
            <button
              style={{
                padding: isMobile ? "1rem 2rem" : "1rem 2rem",
                fontSize: isMobile ? "1rem" : "1.1rem",
                fontWeight: "600",
                color: "#ffffff",
                background: "transparent",
                border: "2px solid #38b2ac",
                borderRadius: "12px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                width: isMobile ? "100%" : "auto",
              }}
              onMouseOver={(e) => {
                e.target.style.background = "#38b2ac";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "transparent";
                e.target.style.transform = "translateY(0)";
              }}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
