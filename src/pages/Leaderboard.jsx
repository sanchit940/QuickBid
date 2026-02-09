import Spinner from "@/custom-components/Spinner";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

const Leaderboard = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { loading, leaderboard } = useSelector((state) => state.user);

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
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            borderRadius: isMobile ? "16px" : "24px",
            padding: isMobile ? "2rem 1.5rem" : "4rem 3rem",
            boxShadow: "0 20px 40px rgba(26, 54, 93, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
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
              Top <span style={{ color: "#d69e2e" }}>Bidders</span>
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
              See who&apos;s leading the competition in our auction community
            </p>
          </div>

          {/* Leaderboard Content */}
          {leaderboard && leaderboard.length > 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: isMobile ? "1rem" : "1.5rem",
              }}
            >
              {leaderboard.map((element, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: isMobile ? "1.5rem" : "2rem",
                    background: index < 3 
                      ? "linear-gradient(135deg, #e6fffa 0%, #b2f5ea 100%)"
                      : "linear-gradient(135deg, #f7fafc 0%, #ffffff 100%)",
                    borderRadius: "16px",
                    border: index < 3 ? "2px solid #38b2ac" : "1px solid #e2e8f0",
                    boxShadow: index < 3 
                      ? "0 8px 25px rgba(56, 178, 172, 0.15)"
                      : "0 4px 15px rgba(26, 54, 93, 0.08)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = index < 3 
                      ? "0 12px 30px rgba(56, 178, 172, 0.2)"
                      : "0 8px 20px rgba(26, 54, 93, 0.12)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = index < 3 
                      ? "0 8px 25px rgba(56, 178, 172, 0.15)"
                      : "0 4px 15px rgba(26, 54, 93, 0.08)";
                  }}
                >
                  {/* Rank and User Info */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: isMobile ? "1rem" : "1.5rem",
                    }}
                  >
                    {/* Rank Badge */}
                    <div
                      style={{
                        width: isMobile ? "50px" : "60px",
                        height: isMobile ? "50px" : "60px",
                        borderRadius: "50%",
                        background: index === 0 
                          ? "linear-gradient(135deg, #d69e2e 0%, #f6ad55 100%)"
                          : index === 1
                          ? "linear-gradient(135deg, #a0aec0 0%, #cbd5e0 100%)"
                          : index === 2
                          ? "linear-gradient(135deg, #d69e2e 0%, #f6ad55 100%)"
                          : "linear-gradient(135deg, #38b2ac 0%, #4fd1c7 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: index === 1 ? "#1a365d" : "#ffffff",
                        fontWeight: "700",
                        fontSize: isMobile ? "1.2rem" : "1.5rem",
                        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                      }}
                    >
                      {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1}
                    </div>

                    {/* User Details */}
                    <div>
                      <h3
                        style={{
                          fontSize: isMobile ? "1.2rem" : "1.4rem",
                          fontWeight: "700",
                          color: "#1a365d",
                          marginBottom: "0.5rem",
                          margin: 0,
                        }}
                      >
                        {element.userName}
                      </h3>
                      <p
                        style={{
                          fontSize: isMobile ? "0.9rem" : "1rem",
                          color: "#4a5568",
                          margin: 0,
                        }}
                      >
                        {element.auctionsWon} auctions won
                      </p>
                    </div>
                  </div>

                  {/* Money Spent */}
                  <div
                    style={{
                      textAlign: "right",
                    }}
                  >
                    <p
                      style={{
                        fontSize: isMobile ? "1.3rem" : "1.5rem",
                        fontWeight: "700",
                        color: index < 3 ? "#38b2ac" : "#d69e2e",
                        margin: 0,
                      }}
                    >
                      Rs.{element.moneySpent}
                    </p>
                    <p
                      style={{
                        fontSize: isMobile ? "0.8rem" : "0.9rem",
                        color: "#4a5568",
                        margin: 0,
                      }}
                    >
                      Total Spent
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: isMobile ? "3rem 1.5rem" : "4rem 2rem",
                background: "linear-gradient(135deg, #f7fafc 0%, #ffffff 100%)",
                borderRadius: "20px",
                border: "1px solid #e2e8f0",
              }}
            >
              <div
                style={{
                  fontSize: isMobile ? "3rem" : "4rem",
                  marginBottom: "1rem",
                  color: "#cbd5e0",
                }}
              >
                🏆
              </div>
              <h3
                style={{
                  fontSize: isMobile ? "1.5rem" : "1.8rem",
                  fontWeight: "600",
                  color: "#1a365d",
                  marginBottom: "1rem",
                }}
              >
                No Leaderboard Data
              </h3>
              <p
                style={{
                  fontSize: isMobile ? "1rem" : "1.1rem",
                  color: "#4a5568",
                  maxWidth: "400px",
                  margin: "0 auto",
                }}
              >
                Start bidding on auctions to appear on the leaderboard!
              </p>
            </div>
          )}

          {/* Call to Action */}
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
            <h3
              style={{
                fontSize: isMobile ? "1.5rem" : "1.8rem",
                fontWeight: "700",
                marginBottom: "1rem",
                color: "#ffffff",
              }}
            >
              🎯 Ready to Climb the Leaderboard?
            </h3>
            <p
              style={{
                fontSize: isMobile ? "1rem" : "1.2rem",
                marginBottom: "2rem",
                color: "#cbd5e0",
                maxWidth: "600px",
                margin: "0 auto 2rem auto",
              }}
            >
              Start bidding on exciting auctions and compete with other bidders to reach the top!
            </p>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                flexWrap: "wrap",
                flexDirection: isMobile ? "column" : "row",
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
              <Link to="/auctions">
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
                View Auctions
              </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
