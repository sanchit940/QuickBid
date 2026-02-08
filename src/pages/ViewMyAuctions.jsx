import CardTwo from "@/custom-components/CardTwo";
import Spinner from "@/custom-components/Spinner";
import { getMyAuctionItems } from "@/store/slices/auctionSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const ViewMyAuctions = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { myAuctions, loading } = useSelector((state) => state.auction);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
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
    if (!isAuthenticated || user.role !== "Auctioneer") {
      navigateTo("/");
    }
    dispatch(getMyAuctionItems());
  }, [dispatch, isAuthenticated, navigateTo, user.role]);

  // Calculate statistics
  const activeAuctions = myAuctions.filter(auction => 
    new Date(auction.endTime) > new Date()
  ).length;
  
  const completedAuctions = myAuctions.filter(auction => 
    new Date(auction.endTime) <= new Date()
  ).length;

  const totalBids = myAuctions.reduce((total, auction) => 
    total + (auction.bids ? auction.bids.length : 0), 0
  );

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
            maxWidth: "1400px",
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
              My <span style={{ color: "#d69e2e" }}>Auctions</span>
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
              Manage and track all your auction listings in one place
            </p>
          </div>

          {/* Statistics Section */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1.5rem",
              marginBottom: isMobile ? "2rem" : "3rem",
            }}
          >
            <div
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                borderRadius: "20px",
                padding: isMobile ? "1.5rem" : "2rem",
                boxShadow: "0 15px 35px rgba(26, 54, 93, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: isMobile ? "50px" : "60px",
                  height: isMobile ? "50px" : "60px",
                  background: "linear-gradient(135deg, #38b2ac 0%, #4fd1c7 100%)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  fontSize: isMobile ? "1.2rem" : "1.5rem",
                  margin: "0 auto 1rem auto",
                  boxShadow: "0 8px 25px rgba(56, 178, 172, 0.3)",
                }}
              >
                📊
              </div>
              <h3
                style={{
                  fontSize: isMobile ? "1.8rem" : "2.2rem",
                  fontWeight: "700",
                  color: "#1a365d",
                  marginBottom: "0.5rem",
                }}
              >
                {myAuctions.length}
              </h3>
              <p
                style={{
                  fontSize: isMobile ? "0.9rem" : "1rem",
                  color: "#4a5568",
                  fontWeight: "500",
                }}
              >
                Total Auctions
              </p>
            </div>

            <div
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                borderRadius: "20px",
                padding: isMobile ? "1.5rem" : "2rem",
                boxShadow: "0 15px 35px rgba(26, 54, 93, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: isMobile ? "50px" : "60px",
                  height: isMobile ? "50px" : "60px",
                  background: "linear-gradient(135deg, #d69e2e 0%, #f6ad55 100%)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#1a365d",
                  fontSize: isMobile ? "1.2rem" : "1.5rem",
                  margin: "0 auto 1rem auto",
                  boxShadow: "0 8px 25px rgba(214, 158, 46, 0.3)",
                }}
              >
                🔥
              </div>
              <h3
                style={{
                  fontSize: isMobile ? "1.8rem" : "2.2rem",
                  fontWeight: "700",
                  color: "#1a365d",
                  marginBottom: "0.5rem",
                }}
              >
                {activeAuctions}
              </h3>
              <p
                style={{
                  fontSize: isMobile ? "0.9rem" : "1rem",
                  color: "#4a5568",
                  fontWeight: "500",
                }}
              >
                Active Auctions
              </p>
            </div>

            <div
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                borderRadius: "20px",
                padding: isMobile ? "1.5rem" : "2rem",
                boxShadow: "0 15px 35px rgba(26, 54, 93, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: isMobile ? "50px" : "60px",
                  height: isMobile ? "50px" : "60px",
                  background: "linear-gradient(135deg, #1a365d 0%, #2d5a87 100%)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  fontSize: isMobile ? "1.2rem" : "1.5rem",
                  margin: "0 auto 1rem auto",
                  boxShadow: "0 8px 25px rgba(26, 54, 93, 0.3)",
                }}
              >
                ✅
              </div>
              <h3
                style={{
                  fontSize: isMobile ? "1.8rem" : "2.2rem",
                  fontWeight: "700",
                  color: "#1a365d",
                  marginBottom: "0.5rem",
                }}
              >
                {completedAuctions}
              </h3>
              <p
                style={{
                  fontSize: isMobile ? "0.9rem" : "1rem",
                  color: "#4a5568",
                  fontWeight: "500",
                }}
              >
                Completed Auctions
              </p>
            </div>

            <div
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                borderRadius: "20px",
                padding: isMobile ? "1.5rem" : "2rem",
                boxShadow: "0 15px 35px rgba(26, 54, 93, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                textAlign: "center",
                gridColumn: isMobile ? "1 / -1" : "auto",
              }}
            >
              <div
                style={{
                  width: isMobile ? "50px" : "60px",
                  height: isMobile ? "50px" : "60px",
                  background: "linear-gradient(135deg, #805ad5 0%, #b794f6 100%)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  fontSize: isMobile ? "1.2rem" : "1.5rem",
                  margin: "0 auto 1rem auto",
                  boxShadow: "0 8px 25px rgba(128, 90, 213, 0.3)",
                }}
              >
                🎯
              </div>
              <h3
                style={{
                  fontSize: isMobile ? "1.8rem" : "2.2rem",
                  fontWeight: "700",
                  color: "#1a365d",
                  marginBottom: "0.5rem",
                }}
              >
                {totalBids}
              </h3>
              <p
                style={{
                  fontSize: isMobile ? "0.9rem" : "1rem",
                  color: "#4a5568",
                  fontWeight: "500",
                }}
              >
                Total Bids Received
              </p>
            </div>
          </div>

          {/* Main Content */}
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
            {/* Action Bar */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "2rem",
                flexWrap: "wrap",
                gap: "1rem",
                flexDirection: isMobile ? "column" : "row",
              }}
            >
              <h2
                style={{
                  fontSize: isMobile ? "1.6rem" : "2rem",
                  fontWeight: "700",
                  color: "#1a365d",
                  margin: 0,
                }}
              >
                Auction Listings
              </h2>
              <Link
                to="/submit-auction"
                style={{
                  textDecoration: "none",
                  width: isMobile ? "100%" : "auto",
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
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
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
                  ➕ Create New Auction
                </button>
              </Link>
            </div>

            {/* Auctions Grid */}
            {myAuctions.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(350px, 1fr))",
                  gap: isMobile ? "1.5rem" : "2rem",
                }}
              >
                {myAuctions.map((element) => (
                  <div
                    key={element._id}
                    style={{
                      background: "linear-gradient(135deg, #ffffff 0%, #f7fafc 100%)",
                      borderRadius: "20px",
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 8px 25px rgba(26, 54, 93, 0.08)",
                      transition: "all 0.3s ease",
                      overflow: "hidden",
                      position: "relative",
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
                    {/* Status Badge */}
                    <div
                      style={{
                        position: "absolute",
                        top: "1rem",
                        right: "1rem",
                        padding: "0.5rem 1rem",
                        borderRadius: "20px",
                        fontSize: isMobile ? "0.7rem" : "0.8rem",
                        fontWeight: "600",
                        zIndex: 2,
                        background: new Date(element.endTime) > new Date()
                          ? "linear-gradient(135deg, #48bb78 0%, #68d391 100%)"
                          : "linear-gradient(135deg, #f56565 0%, #fc8181 100%)",
                        color: "#ffffff",
                      }}
                    >
                      {new Date(element.endTime) > new Date() ? "Active" : "Ended"}
                    </div>
                    <CardTwo
                  
                    id={element._id}
                    imgSrc={element.images?.[0]?.url}
                    title={element.title}
                    startingBid={element.startingBid}
                    startTime={element.startTime}
                    endTime={element.endTime}
/>

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
                  🏛️
                </div>
                <h3
                  style={{
                    fontSize: isMobile ? "1.5rem" : "1.8rem",
                    fontWeight: "600",
                    color: "#1a365d",
                    marginBottom: "1rem",
                  }}
                >
                  No Auctions Created Yet
                </h3>
                <p
                  style={{
                    fontSize: isMobile ? "1rem" : "1.1rem",
                    color: "#4a5568",
                    marginBottom: "2rem",
                    maxWidth: "400px",
                    margin: "0 auto 2rem auto",
                  }}
                >
                  Start your auction journey by creating your first listing. It&apos;s easy and takes just a few minutes!
                </p>
                <Link
                  to="/submit-auction"
                  style={{
                    textDecoration: "none",
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
                    Create Your First Auction
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Tips Section */}
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
              💡 Auction Tips for Success
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "1.5rem",
                marginBottom: "2rem",
              }}
            >
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  backdropFilter: "blur(10px)",
                }}
              >
                <h4
                  style={{
                    fontSize: isMobile ? "1rem" : "1.1rem",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                    color: "#d69e2e",
                  }}
                >
                  High-Quality Images
                </h4>
                <p
                  style={{
                    fontSize: isMobile ? "0.8rem" : "0.9rem",
                    color: "#cbd5e0",
                    margin: 0,
                  }}
                >
                  Use clear, well-lit photos from multiple angles to attract more bidders
                </p>
              </div>
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  backdropFilter: "blur(10px)",
                }}
              >
                <h4
                  style={{
                    fontSize: isMobile ? "1rem" : "1.1rem",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                    color: "#d69e2e",
                  }}
                >
                  Detailed Descriptions
                </h4>
                <p
                  style={{
                    fontSize: isMobile ? "0.8rem" : "0.9rem",
                    color: "#cbd5e0",
                    margin: 0,
                  }}
                >
                  Provide comprehensive item details including condition and specifications
                </p>
              </div>
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  backdropFilter: "blur(10px)",
                }}
              >
                <h4
                  style={{
                    fontSize: isMobile ? "1rem" : "1.1rem",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                    color: "#d69e2e",
                  }}
                >
                  Competitive Starting Bids
                </h4>
                <p
                  style={{
                    fontSize: isMobile ? "0.8rem" : "0.9rem",
                    color: "#cbd5e0",
                    margin: 0,
                  }}
                >
                  Set reasonable starting prices to encourage early bidding activity
                </p>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                flexWrap: "wrap",
                flexDirection: isMobile ? "column" : "row",
              }}
            >
              <Link
                to="/how-it-works"
                style={{
                  textDecoration: "none",
                  width: isMobile ? "100%" : "auto",
                }}
              >
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
                  Learn More Tips
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewMyAuctions;
