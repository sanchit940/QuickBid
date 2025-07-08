import Spinner from "@/custom-components/Spinner";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);
  const navigateTo = useNavigate();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated]);

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
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "60vh",
          }}
        >
          <Spinner />
        </div>
      ) : (
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {/* Header Section */}
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
              My <span style={{ color: "#d69e2e" }}>Profile</span>
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
              Manage your account information and preferences
            </p>
          </div>

          {/* Profile Overview Card */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              borderRadius: isMobile ? "16px" : "24px",
              padding: isMobile ? "2rem 1.5rem" : "3rem",
              boxShadow: "0 20px 40px rgba(26, 54, 93, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              marginBottom: "2rem",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: isMobile ? "80px" : "120px",
                height: isMobile ? "80px" : "120px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #38b2ac 0%, #4fd1c7 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontSize: isMobile ? "2rem" : "3rem",
                fontWeight: "700",
                margin: "0 auto 2rem auto",
                boxShadow: "0 8px 25px rgba(56, 178, 172, 0.3)",
              }}
            >
              {user.userName ? user.userName.charAt(0).toUpperCase() : "U"}
            </div>
            <h2
              style={{
                fontSize: isMobile ? "1.8rem" : "2.2rem",
                fontWeight: "700",
                color: "#1a365d",
                marginBottom: "0.5rem",
              }}
            >
              {user.userName}
            </h2>
            <p
              style={{
                fontSize: isMobile ? "1rem" : "1.2rem",
                color: "#4a5568",
                marginBottom: "1rem",
              }}
            >
              {user.email}
            </p>
            <div
              style={{
                display: "inline-block",
                padding: "0.5rem 1.5rem",
                background: user.role === "Auctioneer" 
                  ? "linear-gradient(135deg, #d69e2e 0%, #f6ad55 100%)"
                  : "linear-gradient(135deg, #38b2ac 0%, #4fd1c7 100%)",
                borderRadius: "20px",
                color: user.role === "Auctioneer" ? "#1a365d" : "#ffffff",
                fontWeight: "600",
                fontSize: isMobile ? "0.9rem" : "1rem",
              }}
            >
              {user.role}
            </div>
          </div>

          {/* Main Content Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: "2rem",
              marginBottom: "2rem",
            }}
          >
            {/* Personal Details */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                borderRadius: "20px",
                padding: isMobile ? "2rem 1.5rem" : "2.5rem",
                boxShadow: "0 15px 35px rgba(26, 54, 93, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <h3
                style={{
                  fontSize: isMobile ? "1.5rem" : "1.8rem",
                  fontWeight: "700",
                  color: "#1a365d",
                  marginBottom: "2rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                👤 Personal Details
              </h3>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: isMobile ? "0.9rem" : "1rem",
                      fontWeight: "600",
                      color: "#4a5568",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Username
                  </label>
                  <div
                    style={{
                      padding: isMobile ? "0.8rem" : "1rem",
                      background: "#f7fafc",
                      borderRadius: "8px",
                      fontSize: isMobile ? "1rem" : "1.1rem",
                      color: "#1a365d",
                      fontWeight: "500",
                    }}
                  >
                    {user.userName}
                  </div>
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: isMobile ? "0.9rem" : "1rem",
                      fontWeight: "600",
                      color: "#4a5568",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Email
                  </label>
                  <div
                    style={{
                      padding: isMobile ? "0.8rem" : "1rem",
                      background: "#f7fafc",
                      borderRadius: "8px",
                      fontSize: isMobile ? "1rem" : "1.1rem",
                      color: "#1a365d",
                      fontWeight: "500",
                      wordBreak: "break-all",
                    }}
                  >
                    {user.email}
                  </div>
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: isMobile ? "0.9rem" : "1rem",
                      fontWeight: "600",
                      color: "#4a5568",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Phone
                  </label>
                  <div
                    style={{
                      padding: isMobile ? "0.8rem" : "1rem",
                      background: "#f7fafc",
                      borderRadius: "8px",
                      fontSize: isMobile ? "1rem" : "1.1rem",
                      color: "#1a365d",
                      fontWeight: "500",
                    }}
                  >
                    {user.phone}
                  </div>
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: isMobile ? "0.9rem" : "1rem",
                      fontWeight: "600",
                      color: "#4a5568",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Address
                  </label>
                  <div
                    style={{
                      padding: isMobile ? "0.8rem" : "1rem",
                      background: "#f7fafc",
                      borderRadius: "8px",
                      fontSize: isMobile ? "1rem" : "1.1rem",
                      color: "#1a365d",
                      fontWeight: "500",
                    }}
                  >
                    {user.address}
                  </div>
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: isMobile ? "0.9rem" : "1rem",
                      fontWeight: "600",
                      color: "#4a5568",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Joined On
                  </label>
                  <div
                    style={{
                      padding: isMobile ? "0.8rem" : "1rem",
                      background: "#f7fafc",
                      borderRadius: "8px",
                      fontSize: isMobile ? "1rem" : "1.1rem",
                      color: "#1a365d",
                      fontWeight: "500",
                    }}
                  >
                    {user.createdAt?.substring(0, 10)}
                  </div>
                </div>
              </div>
            </div>

            {/* Account Statistics */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                borderRadius: "20px",
                padding: isMobile ? "2rem 1.5rem" : "2.5rem",
                boxShadow: "0 15px 35px rgba(26, 54, 93, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <h3
                style={{
                  fontSize: isMobile ? "1.5rem" : "1.8rem",
                  fontWeight: "700",
                  color: "#1a365d",
                  marginBottom: "2rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                📊 Account Statistics
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {user.role === "Auctioneer" && (
                  <div
                    style={{
                      padding: isMobile ? "1.2rem" : "1.5rem",
                      background: "linear-gradient(135deg, #fed7d7 0%, #feb2b2 100%)",
                      borderRadius: "12px",
                      textAlign: "center",
                    }}
                  >
                    <h4
                      style={{
                        fontSize: isMobile ? "1rem" : "1.2rem",
                        fontWeight: "600",
                        color: "#c53030",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Unpaid Commissions
                    </h4>
                    <p
                      style={{
                        fontSize: isMobile ? "1.6rem" : "2rem",
                        fontWeight: "700",
                        color: "#c53030",
                        margin: 0,
                      }}
                    >
                      Rs.{user.unpaidCommission}
                    </p>
                  </div>
                )}

                {user.role === "Bidder" && (
                  <>
                    <div
                      style={{
                        padding: isMobile ? "1.2rem" : "1.5rem",
                        background: "linear-gradient(135deg, #c6f6d5 0%, #9ae6b4 100%)",
                        borderRadius: "12px",
                        textAlign: "center",
                      }}
                    >
                      <h4
                        style={{
                          fontSize: isMobile ? "1rem" : "1.2rem",
                          fontWeight: "600",
                          color: "#2f855a",
                          marginBottom: "0.5rem",
                        }}
                      >
                        Auctions Won
                      </h4>
                      <p
                        style={{
                          fontSize: isMobile ? "1.6rem" : "2rem",
                          fontWeight: "700",
                          color: "#2f855a",
                          margin: 0,
                        }}
                      >
                        {user.auctionsWon}
                      </p>
                    </div>

                    <div
                      style={{
                        padding: isMobile ? "1.2rem" : "1.5rem",
                        background: "linear-gradient(135deg, #bee3f8 0%, #90cdf4 100%)",
                        borderRadius: "12px",
                        textAlign: "center",
                      }}
                    >
                      <h4
                        style={{
                          fontSize: isMobile ? "1rem" : "1.2rem",
                          fontWeight: "600",
                          color: "#2b6cb0",
                          marginBottom: "0.5rem",
                        }}
                      >
                        Money Spent
                      </h4>
                      <p
                        style={{
                          fontSize: isMobile ? "1.6rem" : "2rem",
                          fontWeight: "700",
                          color: "#2b6cb0",
                          margin: 0,
                        }}
                      >
                        Rs.{user.moneySpent}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Payment Details (For Auctioneers) */}
          {user.role === "Auctioneer" && (
            <div
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                borderRadius: "20px",
                padding: isMobile ? "2rem 1.5rem" : "2.5rem",
                boxShadow: "0 15px 35px rgba(26, 54, 93, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                marginBottom: "2rem",
              }}
            >
              <h3
                style={{
                  fontSize: isMobile ? "1.5rem" : "1.8rem",
                  fontWeight: "700",
                  color: "#1a365d",
                  marginBottom: "2rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                💳 Payment Details
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "1.5rem",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: isMobile ? "0.9rem" : "1rem",
                      fontWeight: "600",
                      color: "#4a5568",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Bank Name
                  </label>
                  <div
                    style={{
                      padding: isMobile ? "0.8rem" : "1rem",
                      background: "#f7fafc",
                      borderRadius: "8px",
                      fontSize: isMobile ? "1rem" : "1.1rem",
                      color: "#1a365d",
                      fontWeight: "500",
                    }}
                  >
                    {user.paymentMethods?.bankTransfer?.bankName || "Not provided"}
                  </div>
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: isMobile ? "0.9rem" : "1rem",
                      fontWeight: "600",
                      color: "#4a5568",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Bank Account (IBAN)
                  </label>
                  <div
                    style={{
                      padding: isMobile ? "0.8rem" : "1rem",
                      background: "#f7fafc",
                      borderRadius: "8px",
                      fontSize: isMobile ? "1rem" : "1.1rem",
                      color: "#1a365d",
                      fontWeight: "500",
                      wordBreak: "break-all",
                    }}
                  >
                    {user.paymentMethods?.bankTransfer?.iban || "Not provided"}
                  </div>
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: isMobile ? "0.9rem" : "1rem",
                      fontWeight: "600",
                      color: "#4a5568",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Account Holder Name
                  </label>
                  <div
                    style={{
                      padding: isMobile ? "0.8rem" : "1rem",
                      background: "#f7fafc",
                      borderRadius: "8px",
                      fontSize: isMobile ? "1rem" : "1.1rem",
                      color: "#1a365d",
                      fontWeight: "500",
                    }}
                  >
                    {user.paymentMethods?.bankTransfer?.bankAccountName || "Not provided"}
                  </div>
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: isMobile ? "0.9rem" : "1rem",
                      fontWeight: "600",
                      color: "#4a5568",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Easypaisa Account
                  </label>
                  <div
                    style={{
                      padding: isMobile ? "0.8rem" : "1rem",
                      background: "#f7fafc",
                      borderRadius: "8px",
                      fontSize: isMobile ? "1rem" : "1.1rem",
                      color: "#1a365d",
                      fontWeight: "500",
                    }}
                  >
                    {user.paymentMethods?.easypaisa?.easypaisaAccountNumber || "Not provided"}
                  </div>
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: isMobile ? "0.9rem" : "1rem",
                      fontWeight: "600",
                      color: "#4a5568",
                      marginBottom: "0.5rem",
                    }}
                  >
                    PayPal Email
                  </label>
                  <div
                    style={{
                      padding: isMobile ? "0.8rem" : "1rem",
                      background: "#f7fafc",
                      borderRadius: "8px",
                      fontSize: isMobile ? "1rem" : "1.1rem",
                      color: "#1a365d",
                      fontWeight: "500",
                      wordBreak: "break-all",
                    }}
                  >
                    {user.paymentMethods?.paypal?.paypalEmail || "Not provided"}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div
            style={{
              background: "linear-gradient(135deg, #1a365d 0%, #2d5a87 100%)",
              borderRadius: "20px",
              padding: isMobile ? "2rem 1.5rem" : "3rem 2rem",
              textAlign: "center",
              color: "#ffffff",
            }}
          >
            <h3
              style={{
                fontSize: isMobile ? "1.5rem" : "1.8rem",
                fontWeight: "700",
                marginBottom: "1.5rem",
                color: "#ffffff",
              }}
            >
              Quick Actions
            </h3>
            <div
              style={{
                display: "flex",
                gap: "1.5rem",
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
                Edit Profile
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
                View Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
