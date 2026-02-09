import Spinner from "@/custom-components/Spinner";
import { placeBid } from "@/store/slices/bidSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAuctionDetail } from "@/store/slices/auctionSlice";

const ViewAuctionDetails = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [amount, setAmount] = useState("");
  const { id } = useParams();
  const { loading, auctionDetail, auctionBidders } = useSelector((state) => state.auction);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleBid = () => {
    const formData = new FormData();
    formData.append("amount", amount);
    dispatch(placeBid(id, formData));
    setAmount("");
  };

  useEffect(() => {
    if (id) {
      dispatch(getAuctionDetail(id));
    }
  }, [id, dispatch]);

  const timeRemaining = () => {
    const now = new Date().getTime();
    const endTime = new Date(auctionDetail.endTime).getTime();
    const difference = endTime - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      
      return `${days}d ${hours}h ${minutes}m`;
    }
    return "Auction Ended";
  };

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
              Auction <span style={{ color: "#d69e2e" }}>Details</span>
            </h1>
          </div>

          {/* Status Banner */}
          <div
            style={{
              background: Date.now() <= new Date(auctionDetail.endTime)
                ? "linear-gradient(135deg, #48bb78 0%, #68d391 100%)"
                : "linear-gradient(135deg, #f56565 0%, #fc8181 100%)",
              borderRadius: "16px",
              padding: isMobile ? "1rem" : "1.5rem",
              textAlign: "center",
              color: "#ffffff",
              marginBottom: "2rem",
            }}
          >
            <h3
              style={{
                fontSize: isMobile ? "1.2rem" : "1.4rem",
                fontWeight: "700",
                marginBottom: "0.5rem",
              }}
            >
              {Date.now() <= new Date(auctionDetail.endTime) ? "🔥 Live Auction" : "⏰ Auction Ended"}
            </h3>
            <p
              style={{
                fontSize: isMobile ? "1rem" : "1.1rem",
                margin: 0,
              }}
            >
              {Date.now() <= new Date(auctionDetail.endTime) 
                ? `Time Remaining: ${timeRemaining()}`
                : "This auction has concluded"
              }
            </p>
          </div>

          {/* Main Content Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: isMobile ? "2rem" : "3rem",
              marginBottom: "3rem",
            }}
          >
            {/* Left Column - Auction Details */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                borderRadius: isMobile ? "16px" : "24px",
                padding: isMobile ? "2rem 1.5rem" : "3rem",
                boxShadow: "0 20px 40px rgba(26, 54, 93, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              {/* Auction Image */}
              <div
                style={{
                  width: "100%",
                  height: isMobile ? "250px" : "300px",
                  borderRadius: "16px",
                  overflow: "hidden",
                  marginBottom: "2rem",
                  background: "#f7fafc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {auctionDetail.image?.url ? (
                  <img
                    src={auctionDetail.image.url}
                    alt={auctionDetail.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      fontSize: isMobile ? "3rem" : "4rem",
                      color: "#cbd5e0",
                    }}
                  >
                    📷
                  </div>
                )}
              </div>

              {/* Auction Info */}
              <h2
                style={{
                  fontSize: isMobile ? "1.8rem" : "2.2rem",
                  fontWeight: "700",
                  color: "#1a365d",
                  marginBottom: "1.5rem",
                }}
              >
                {auctionDetail.title}
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                  gap: "1rem",
                  marginBottom: "2rem",
                }}
              >
                <div
                  style={{
                    padding: "1rem",
                    background: "#f7fafc",
                    borderRadius: "12px",
                  }}
                >
                  <p
                    style={{
                      fontSize: isMobile ? "0.9rem" : "1rem",
                      fontWeight: "600",
                      color: "#4a5568",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Condition
                  </p>
                  <p
                    style={{
                      fontSize: isMobile ? "1rem" : "1.1rem",
                      fontWeight: "700",
                      color: "#1a365d",
                      margin: 0,
                    }}
                  >
                    {auctionDetail.condition}
                  </p>
                </div>

                <div
                  style={{
                    padding: "1rem",
                    background: "#f7fafc",
                    borderRadius: "12px",
                  }}
                >
                  <p
                    style={{
                      fontSize: isMobile ? "0.9rem" : "1rem",
                      fontWeight: "600",
                      color: "#4a5568",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Starting Bid
                  </p>
                  <p
                    style={{
                      fontSize: isMobile ? "1rem" : "1.1rem",
                      fontWeight: "700",
                      color: "#d69e2e",
                      margin: 0,
                    }}
                  >
                    Rs.{auctionDetail.startingBid}
                  </p>
                </div>
              </div>

              {/* Current Highest Bid */}
              {auctionBidders && auctionBidders.length > 0 && (
                <div
                  style={{
                    padding: "1.5rem",
                    background: "linear-gradient(135deg, #e6fffa 0%, #b2f5ea 100%)",
                    borderRadius: "16px",
                    border: "2px solid #38b2ac",
                    marginBottom: "2rem",
                  }}
                >
                  <h3
                    style={{
                      fontSize: isMobile ? "1.2rem" : "1.4rem",
                      fontWeight: "700",
                      color: "#234e52",
                      marginBottom: "0.5rem",
                    }}
                  >
                    🏆 Current Highest Bid
                  </h3>
                  <p
                    style={{
                      fontSize: isMobile ? "1.5rem" : "1.8rem",
                      fontWeight: "800",
                      color: "#38b2ac",
                      margin: 0,
                    }}
                  >
                    Rs.{auctionBidders[0].amount}
                  </p>
                  <p
                    style={{
                      fontSize: isMobile ? "1rem" : "1.1rem",
                      color: "#234e52",
                      marginTop: "0.5rem",
                      margin: "0.5rem 0 0 0",
                    }}
                  >
                    by {auctionBidders[0].userName}
                  </p>
                </div>
              )}

              {/* Description */}
              <div>
                <h3
                  style={{
                    fontSize: isMobile ? "1.3rem" : "1.5rem",
                    fontWeight: "700",
                    color: "#1a365d",
                    marginBottom: "1rem",
                  }}
                >
                  Description
                </h3>
                <p
                  style={{
                    fontSize: isMobile ? "1rem" : "1.1rem",
                    color: "#4a5568",
                    lineHeight: "1.7",
                  }}
                >
                  {auctionDetail.description}
                </p>
              </div>
            </div>

            {/* Right Column - Bidding Section */}
            <div>
              {/* Bidding History */}
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(10px)",
                  borderRadius: isMobile ? "16px" : "24px",
                  padding: isMobile ? "2rem 1.5rem" : "3rem",
                  boxShadow: "0 20px 40px rgba(26, 54, 93, 0.1)",
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
                  }}
                >
                  Bidding History
                </h3>

                {auctionBidders && auctionBidders.length > 0 ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                      maxHeight: isMobile ? "300px" : "400px",
                      overflowY: "auto",
                    }}
                  >
                    {auctionBidders.map((element, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "1rem",
                          background: index === 0 ? "#e6fffa" : "#f7fafc",
                          borderRadius: "12px",
                          border: index === 0 ? "2px solid #38b2ac" : "1px solid #e2e8f0",
                        }}
                      >
                        <div>
                          <p
                            style={{
                              fontSize: isMobile ? "1rem" : "1.1rem",
                              fontWeight: "600",
                              color: "#1a365d",
                              margin: 0,
                            }}
                          >
                            {element.userName}
                          </p>
                          <p
                            style={{
                              fontSize: isMobile ? "0.8rem" : "0.9rem",
                              color: "#4a5568",
                              margin: 0,
                            }}
                          >
                            {index === 0 ? "🥇 Highest Bid" : 
                             index === 1 ? "🥈 2nd Place" : 
                             index === 2 ? "🥉 3rd Place" : 
                             `${index + 1}th Place`}
                          </p>
                        </div>
                        <p
                          style={{
                            fontSize: isMobile ? "1.1rem" : "1.2rem",
                            fontWeight: "700",
                            color: index === 0 ? "#38b2ac" : "#d69e2e",
                            margin: 0,
                          }}
                        >
                          Rs.{element.amount}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "3rem 2rem",
                      background: "#f7fafc",
                      borderRadius: "12px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: isMobile ? "2.5rem" : "3rem",
                        marginBottom: "1rem",
                      }}
                    >
                      🎯
                    </div>
                    <p
                      style={{
                        fontSize: isMobile ? "1rem" : "1.1rem",
                        color: "#4a5568",
                        margin: 0,
                      }}
                    >
                      No bids placed yet. Be the first to bid!
                    </p>
                  </div>
                )}
              </div>

              {/* Bidding Form */}
              {isAuthenticated && user.role === "Bidder" ? (
                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(10px)",
                    borderRadius: isMobile ? "16px" : "24px",
                    padding: isMobile ? "2rem 1.5rem" : "3rem",
                    boxShadow: "0 20px 40px rgba(26, 54, 93, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                >
                  {Date.now() >= new Date(auctionDetail.startTime) && Date.now() <= new Date(auctionDetail.endTime) ? (
                    <>
                      <h3
                        style={{
                          fontSize: isMobile ? "1.5rem" : "1.8rem",
                          fontWeight: "700",
                          color: "#1a365d",
                          marginBottom: "2rem",
                        }}
                      >
                        Place Your Bid
                      </h3>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: isMobile ? "column" : "row",
                          gap: "1rem",
                        }}
                      >
                        <input
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder={`Minimum: Rs.${auctionBidders.length > 0 ? parseInt(auctionBidders[0].amount) + 1 : auctionDetail.startingBid}`}
                          style={{
                            flex: 1,
                            padding: isMobile ? "1rem" : "1.2rem",
                            fontSize: isMobile ? "1rem" : "1.1rem",
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
                        />
                        <button
                          onClick={handleBid}
                          style={{
                            padding: isMobile ? "1rem 2rem" : "1.2rem 2rem",
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
                          Place Bid
                        </button>
                      </div>
                    </>
                  ) : Date.now() < new Date(auctionDetail.startTime) ? (
                    <div
                      style={{
                        textAlign: "center",
                        padding: "2rem",
                        background: "#fff3cd",
                        borderRadius: "12px",
                        border: "1px solid #ffeaa7",
                      }}
                    >
                      <h3
                        style={{
                          fontSize: isMobile ? "1.3rem" : "1.5rem",
                          fontWeight: "600",
                          color: "#856404",
                          marginBottom: "1rem",
                        }}
                      >
                        ⏳ Auction Not Started
                      </h3>
                      <p
                        style={{
                          fontSize: isMobile ? "1rem" : "1.1rem",
                          color: "#856404",
                          margin: 0,
                        }}
                      >
                        This auction hasn&apos;t started yet. Please check back later.
                      </p>
                    </div>
                  ) : (
                    <div
                      style={{
                        textAlign: "center",
                        padding: "2rem",
                        background: "#f8d7da",
                        borderRadius: "12px",
                        border: "1px solid #f5c6cb",
                      }}
                    >
                      <h3
                        style={{
                          fontSize: isMobile ? "1.3rem" : "1.5rem",
                          fontWeight: "600",
                          color: "#721c24",
                          marginBottom: "1rem",
                        }}
                      >
                        🔒 Auction Ended
                      </h3>
                      <p
                        style={{
                          fontSize: isMobile ? "1rem" : "1.1rem",
                          color: "#721c24",
                          margin: 0,
                        }}
                      >
                        This auction has ended. No more bids can be placed.
                      </p>
                    </div>
                  )}
                </div>
              ) : !isAuthenticated ? (
                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(10px)",
                    borderRadius: isMobile ? "16px" : "24px",
                    padding: isMobile ? "2rem 1.5rem" : "3rem",
                    boxShadow: "0 20px 40px rgba(26, 54, 93, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    textAlign: "center",
                  }}
                >
                  <h3
                    style={{
                      fontSize: isMobile ? "1.3rem" : "1.5rem",
                      fontWeight: "600",
                      color: "#1a365d",
                      marginBottom: "1rem",
                    }}
                  >
                    🔐 Login Required
                  </h3>
                  <p
                    style={{
                      fontSize: isMobile ? "1rem" : "1.1rem",
                      color: "#4a5568",
                      marginBottom: "2rem",
                    }}
                  >
                    Please log in as a bidder to place bids on this auction.
                  </p>
                  <Link
                    to="/login"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <button
                      style={{
                        padding: isMobile ? "1rem 2rem" : "1.2rem 2rem",
                        fontSize: isMobile ? "1rem" : "1.1rem",
                        fontWeight: "600",
                        color: "#1a365d",
                        background: "linear-gradient(135deg, #d69e2e 0%, #f6ad55 100%)",
                        border: "none",
                        borderRadius: "12px",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        boxShadow: "0 4px 15px rgba(214, 158, 46, 0.3)",
                      }}
                    >
                      Login to Bid
                    </button>
                  </Link>
                </div>
              ) : (
                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(10px)",
                    borderRadius: isMobile ? "16px" : "24px",
                    padding: isMobile ? "2rem 1.5rem" : "3rem",
                    boxShadow: "0 20px 40px rgba(26, 54, 93, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    textAlign: "center",
                  }}
                >
                  <h3
                    style={{
                      fontSize: isMobile ? "1.3rem" : "1.5rem",
                      fontWeight: "600",
                      color: "#1a365d",
                      marginBottom: "1rem",
                    }}
                  >
                    👨‍💼 Auctioneer Account
                  </h3>
                  <p
                    style={{
                      fontSize: isMobile ? "1rem" : "1.1rem",
                      color: "#4a5568",
                      margin: 0,
                    }}
                  >
                    Only bidders can place bids on auctions. Auctioneers can view bidding activity.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAuctionDetails;

