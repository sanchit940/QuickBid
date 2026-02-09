import {
  clearAllSuperAdminSliceErrors,
  getAllPaymentProofs,
  getAllUsers,
  getMonthlyRevenue,
} from "@/store/slices/superAdminSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuctionItemDelete from "./sub-components/AuctionItemDelete";
import BiddersAuctioneersGraph from "./sub-components/BiddersAuctioneersGraph";
import PaymentGraph from "./sub-components/PaymentGraph";
import PaymentProofs from "./sub-components/PaymentProofs";
import Spinner from "@/custom-components/Spinner";

const Dashboard = () => {
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useDispatch();
  const { loading, totalAuctioneers, totalBidders, totalRevenue, monthlyRevenue } = useSelector(
    (state) => state.superAdmin
  );
  const { user, isAuthenticated } = useSelector((state) => state.user);
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
    if (user.role !== "Super Admin" || !isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated, navigateTo, user.role]);

  useEffect(() => {
    dispatch(getMonthlyRevenue());
    dispatch(getAllUsers());
    dispatch(getAllPaymentProofs());
    dispatch(clearAllSuperAdminSliceErrors());
  }, [dispatch]);

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
            maxWidth: "1600px",
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
              Admin <span style={{ color: "#d69e2e" }}>Dashboard</span>
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
              Monitor platform performance and manage auction operations
            </p>
          </div>

          {/* Key Metrics Section */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(auto-fit, minmax(280px, 1fr))",
              gap: isMobile ? "1rem" : "2rem",
              marginBottom: isMobile ? "2rem" : "3rem",
            }}
          >
            <div
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                borderRadius: "20px",
                padding: isMobile ? "1.5rem" : "2.5rem",
                boxShadow: "0 15px 35px rgba(26, 54, 93, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                textAlign: "center",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(26, 54, 93, 0.15)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 15px 35px rgba(26, 54, 93, 0.08)";
              }}
            >
              <div
                style={{
                  width: isMobile ? "60px" : "80px",
                  height: isMobile ? "60px" : "80px",
                  background: "linear-gradient(135deg, #38b2ac 0%, #4fd1c7 100%)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  fontSize: isMobile ? "1.5rem" : "2rem",
                  margin: "0 auto 1.5rem auto",
                  boxShadow: "0 8px 25px rgba(56, 178, 172, 0.3)",
                }}
              >
                👥
              </div>
              <h3
                style={{
                  fontSize: isMobile ? "2rem" : "2.5rem",
                  fontWeight: "700",
                  color: "#1a365d",
                  marginBottom: "0.5rem",
                }}
              >
                {totalBidders || 0}
              </h3>
              <p
                style={{
                  fontSize: isMobile ? "1rem" : "1.1rem",
                  color: "#4a5568",
                  fontWeight: "500",
                  margin: 0,
                }}
              >
                Total Bidders
              </p>
            </div>

            <div
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                borderRadius: "20px",
                padding: isMobile ? "1.5rem" : "2.5rem",
                boxShadow: "0 15px 35px rgba(26, 54, 93, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                textAlign: "center",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(26, 54, 93, 0.15)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 15px 35px rgba(26, 54, 93, 0.08)";
              }}
            >
              <div
                style={{
                  width: isMobile ? "60px" : "80px",
                  height: isMobile ? "60px" : "80px",
                  background: "linear-gradient(135deg, #d69e2e 0%, #f6ad55 100%)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#1a365d",
                  fontSize: isMobile ? "1.5rem" : "2rem",
                  margin: "0 auto 1.5rem auto",
                  boxShadow: "0 8px 25px rgba(214, 158, 46, 0.3)",
                }}
              >
                🏛️
              </div>
              <h3
                style={{
                  fontSize: isMobile ? "2rem" : "2.5rem",
                  fontWeight: "700",
                  color: "#1a365d",
                  marginBottom: "0.5rem",
                }}
              >
                {totalAuctioneers || 0}
              </h3>
              <p
                style={{
                  fontSize: isMobile ? "1rem" : "1.1rem",
                  color: "#4a5568",
                  fontWeight: "500",
                  margin: 0,
                }}
              >
                Total Auctioneers
              </p>
            </div>

            <div
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                borderRadius: "20px",
                padding: isMobile ? "1.5rem" : "2.5rem",
                boxShadow: "0 15px 35px rgba(26, 54, 93, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                textAlign: "center",
                transition: "all 0.3s ease",
                gridColumn: isMobile ? "1 / -1" : "auto",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(26, 54, 93, 0.15)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 15px 35px rgba(26, 54, 93, 0.08)";
              }}
            >
              <div
                style={{
                  width: isMobile ? "60px" : "80px",
                  height: isMobile ? "60px" : "80px",
                  background: "linear-gradient(135deg, #1a365d 0%, #2d5a87 100%)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  fontSize: isMobile ? "1.5rem" : "2rem",
                  margin: "0 auto 1.5rem auto",
                  boxShadow: "0 8px 25px rgba(26, 54, 93, 0.3)",
                }}
              >
                💰
              </div>
              <h3
                style={{
                  fontSize: isMobile ? "2rem" : "2.5rem",
                  fontWeight: "700",
                  color: "#1a365d",
                  marginBottom: "0.5rem",
                }}
              >
                Rs.{totalRevenue || 0}
              </h3>
              <p
                style={{
                  fontSize: isMobile ? "1rem" : "1.1rem",
                  color: "#4a5568",
                  fontWeight: "500",
                  margin: 0,
                }}
              >
                Total Revenue
              </p>
            </div>

            {!isMobile && (
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "20px",
                  padding: "2.5rem",
                  boxShadow: "0 15px 35px rgba(26, 54, 93, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  textAlign: "center",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(26, 54, 93, 0.15)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 15px 35px rgba(26, 54, 93, 0.08)";
                }}
              >
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    background: "linear-gradient(135deg, #805ad5 0%, #b794f6 100%)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ffffff",
                    fontSize: "2rem",
                    margin: "0 auto 1.5rem auto",
                    boxShadow: "0 8px 25px rgba(128, 90, 213, 0.3)",
                  }}
                >
                  📈
                </div>
                <h3
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: "700",
                    color: "#1a365d",
                    marginBottom: "0.5rem",
                  }}
                >
                  Rs.{monthlyRevenue || 0}
                </h3>
                <p
                  style={{
                    fontSize: "1.1rem",
                    color: "#4a5568",
                    fontWeight: "500",
                    margin: 0,
                  }}
                >
                  Monthly Revenue
                </p>
              </div>
            )}
          </div>

          {/* Charts Section */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: "2rem",
              marginBottom: isMobile ? "2rem" : "3rem",
            }}
          >
            {/* Users Chart */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                borderRadius: isMobile ? "16px" : "24px",
                padding: isMobile ? "2rem 1.5rem" : "2.5rem",
                boxShadow: "0 20px 40px rgba(26, 54, 93, 0.1)",
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
                📊 Users Analytics
              </h3>
              <BiddersAuctioneersGraph />
            </div>

            {/* Revenue Chart */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                borderRadius: isMobile ? "16px" : "24px",
                padding: isMobile ? "2rem 1.5rem" : "2.5rem",
                boxShadow: "0 20px 40px rgba(26, 54, 93, 0.1)",
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
                💹 Revenue Analytics
              </h3>
              <PaymentGraph />
            </div>
          </div>

          {/* Management Sections */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: "2rem",
              marginBottom: "2rem",
            }}
          >
            {/* Payment Proofs Management */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                borderRadius: isMobile ? "16px" : "24px",
                padding: isMobile ? "2rem 1.5rem" : "2.5rem",
                boxShadow: "0 20px 40px rgba(26, 54, 93, 0.1)",
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
                💳 Payment Proofs
              </h3>
              <PaymentProofs />
            </div>

            {/* Auction Management */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                borderRadius: isMobile ? "16px" : "24px",
                padding: isMobile ? "2rem 1.5rem" : "2.5rem",
                boxShadow: "0 20px 40px rgba(26, 54, 93, 0.1)",
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
                🔨 Auction Management
              </h3>
              <AuctionItemDelete />
            </div>
          </div>

          {/* Admin Actions Section */}
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
              🛠️ Quick Admin Actions
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(200px, 1fr))",
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
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.transform = "translateY(0)";
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
                  User Management
                </h4>
                <p
                  style={{
                    fontSize: isMobile ? "0.8rem" : "0.9rem",
                    color: "#cbd5e0",
                    margin: 0,
                  }}
                >
                  Manage user accounts and permissions
                </p>
              </div>

              <div
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.transform = "translateY(0)";
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
                  System Settings
                </h4>
                <p
                  style={{
                    fontSize: isMobile ? "0.8rem" : "0.9rem",
                    color: "#cbd5e0",
                    margin: 0,
                  }}
                >
                  Configure platform settings and preferences
                </p>
              </div>

              <div
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  gridColumn: isMobile ? "1 / -1" : "auto",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.transform = "translateY(0)";
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
                  Reports & Analytics
                </h4>
                <p
                  style={{
                    fontSize: isMobile ? "0.8rem" : "0.9rem",
                    color: "#cbd5e0",
                    margin: 0,
                  }}
                >
                  Generate detailed platform reports
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
