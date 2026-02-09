import { useState, useEffect } from "react";
import { RiAuctionFill } from "react-icons/ri";
import { MdLeaderboard, MdDashboard } from "react-icons/md";
import { SiGooglesearchconsole } from "react-icons/si";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircleOutline, IoIosCreate } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/userSlice";
import { Link } from "react-router-dom";

const SideDrawer = () => {
  const [show, setShow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  
  const handleLogout = () => {
    dispatch(logout());
    setShow(false); // Close mobile menu after logout
  };

  // Check if device is mobile
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShow(false); // Close mobile nav when switching to desktop
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Close mobile menu when clicking on links
  const handleLinkClick = () => {
    if (isMobile) {
      setShow(false);
    }
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      {isMobile && (
        <div
          onClick={() => setShow(!show)}
          style={{
            position: "fixed",
            right: "1.25rem",
            top: "1.25rem",
            background: "linear-gradient(135deg, #d69e2e 0%, #f6ad55 100%)",
            color: "#1a365d",
            fontSize: "1.5rem",
            padding: "0.75rem",
            borderRadius: "12px",
            cursor: "pointer",
            zIndex: 1002,
            boxShadow: "0 4px 15px rgba(214, 158, 46, 0.3)",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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
          <GiHamburgerMenu />
        </div>
      )}

      {/* Sidebar */}
      <div
        style={{
          width: isMobile ? (show ? "100%" : "0") : "250px",
          maxWidth: isMobile ? "300px" : "250px",
          background: "linear-gradient(135deg, #1a365d 0%, #2d5a87 100%)",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: isMobile ? (show ? "0" : "-100%") : "0",
          transition: "all 0.3s ease",
          padding: isMobile ? (show ? "1rem" : "0") : "1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRight: "1px solid rgba(255, 255, 255, 0.1)",
          zIndex: 1001,
          overflow: "hidden",
          boxShadow: isMobile ? "0 0 20px rgba(0, 0, 0, 0.3)" : "none",
        }}
      >
        <div style={{ position: "relative" }}>
          {/* Close Button for Mobile */}
          {isMobile && (
            <IoMdCloseCircleOutline
              onClick={() => setShow(false)}
              style={{
                position: "absolute",
                top: "0",
                right: "0.5rem",
                fontSize: "1.75rem",
                color: "#ffffff",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.color = "#d69e2e";
              }}
              onMouseOut={(e) => {
                e.target.style.color = "#ffffff";
              }}
            />
          )}

          {/* Logo */}
          <Link to="/" onClick={handleLinkClick}>
            <h4
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                marginBottom: "2rem",
                color: "#ffffff",
                fontFamily: "'Inter', 'Montserrat', sans-serif",
              }}
            >
              Quick<span style={{ color: "#d69e2e" }}>Bid</span>
            </h4>
          </Link>

          {/* Main Navigation */}
          <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem", listStyle: "none", padding: 0, margin: 0 }}>
            <li>
              <Link
                to="/auctions"
                onClick={handleLinkClick}
                style={{
                  display: "flex",
                  fontSize: "1rem",
                  fontWeight: "600",
                  gap: "0.75rem",
                  alignItems: "center",
                  color: "#cbd5e0",
                  textDecoration: "none",
                  padding: "0.75rem 1rem",
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.target.style.color = "#d69e2e";
                  e.target.style.background = "rgba(214, 158, 46, 0.1)";
                }}
                onMouseOut={(e) => {
                  e.target.style.color = "#cbd5e0";
                  e.target.style.background = "transparent";
                }}
              >
                <RiAuctionFill /> Auctions
              </Link>
            </li>
            <li>
              <Link
                to="/leaderboard"
                onClick={handleLinkClick}
                style={{
                  display: "flex",
                  fontSize: "1rem",
                  fontWeight: "600",
                  gap: "0.75rem",
                  alignItems: "center",
                  color: "#cbd5e0",
                  textDecoration: "none",
                  padding: "0.75rem 1rem",
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.target.style.color = "#d69e2e";
                  e.target.style.background = "rgba(214, 158, 46, 0.1)";
                }}
                onMouseOut={(e) => {
                  e.target.style.color = "#cbd5e0";
                  e.target.style.background = "transparent";
                }}
              >
                <MdLeaderboard /> Leaderboard
              </Link>
            </li>

            {/* Auctioneer-specific links */}
            {isAuthenticated && user && user.role === "Auctioneer" && (
              <>
                <li>
                  <Link
                    to="/submit-commission"
                    onClick={handleLinkClick}
                    style={{
                      display: "flex",
                      fontSize: "1rem",
                      fontWeight: "600",
                      gap: "0.75rem",
                      alignItems: "center",
                      color: "#cbd5e0",
                      textDecoration: "none",
                      padding: "0.75rem 1rem",
                      borderRadius: "8px",
                      transition: "all 0.3s ease",
                    }}
                    onMouseOver={(e) => {
                      e.target.style.color = "#d69e2e";
                      e.target.style.background = "rgba(214, 158, 46, 0.1)";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.color = "#cbd5e0";
                      e.target.style.background = "transparent";
                    }}
                  >
                    <FaFileInvoiceDollar /> Submit Commission
                  </Link>
                </li>
                <li>
                  <Link
                    to="/create-auction"
                    onClick={handleLinkClick}
                    style={{
                      display: "flex",
                      fontSize: "1rem",
                      fontWeight: "600",
                      gap: "0.75rem",
                      alignItems: "center",
                      color: "#cbd5e0",
                      textDecoration: "none",
                      padding: "0.75rem 1rem",
                      borderRadius: "8px",
                      transition: "all 0.3s ease",
                    }}
                    onMouseOver={(e) => {
                      e.target.style.color = "#d69e2e";
                      e.target.style.background = "rgba(214, 158, 46, 0.1)";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.color = "#cbd5e0";
                      e.target.style.background = "transparent";
                    }}
                  >
                    <IoIosCreate /> Create Auction
                  </Link>
                </li>
                <li>
                  <Link
                    to="/view-my-auctions"
                    onClick={handleLinkClick}
                    style={{
                      display: "flex",
                      fontSize: "1rem",
                      fontWeight: "600",
                      gap: "0.75rem",
                      alignItems: "center",
                      color: "#cbd5e0",
                      textDecoration: "none",
                      padding: "0.75rem 1rem",
                      borderRadius: "8px",
                      transition: "all 0.3s ease",
                    }}
                    onMouseOver={(e) => {
                      e.target.style.color = "#d69e2e";
                      e.target.style.background = "rgba(214, 158, 46, 0.1)";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.color = "#cbd5e0";
                      e.target.style.background = "transparent";
                    }}
                  >
                    <FaEye /> View My Auctions
                  </Link>
                </li>
              </>
            )}

            {/* Super Admin Dashboard */}
            {isAuthenticated && user && user.role === "Super Admin" && (
              <li>
                <Link
                  to="/dashboard"
                  onClick={handleLinkClick}
                  style={{
                    display: "flex",
                    fontSize: "1rem",
                    fontWeight: "600",
                    gap: "0.75rem",
                    alignItems: "center",
                    color: "#cbd5e0",
                    textDecoration: "none",
                    padding: "0.75rem 1rem",
                    borderRadius: "8px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.color = "#d69e2e";
                    e.target.style.background = "rgba(214, 158, 46, 0.1)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.color = "#cbd5e0";
                    e.target.style.background = "transparent";
                  }}
                >
                  <MdDashboard /> Dashboard
                </Link>
              </li>
            )}
          </ul>

          {/* Authentication Buttons */}
          {!isAuthenticated ? (
            <div style={{ margin: "1.5rem 0", display: "flex", gap: "0.75rem", flexDirection: "column" }}>
              <Link
                to="/sign-up"
                onClick={handleLinkClick}
                style={{
                  background: "linear-gradient(135deg, #d69e2e 0%, #f6ad55 100%)",
                  fontWeight: "600",
                  fontSize: "1rem",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "8px",
                  color: "#1a365d",
                  textDecoration: "none",
                  textAlign: "center",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 12px rgba(214, 158, 46, 0.3)",
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 6px 20px rgba(214, 158, 46, 0.4)";
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 4px 12px rgba(214, 158, 46, 0.3)";
                }}
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                onClick={handleLinkClick}
                style={{
                  color: "#38b2ac",
                  background: "transparent",
                  border: "2px solid #38b2ac",
                  fontWeight: "600",
                  fontSize: "1rem",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "8px",
                  textDecoration: "none",
                  textAlign: "center",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.target.style.background = "#38b2ac";
                  e.target.style.color = "#ffffff";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseOut={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.color = "#38b2ac";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                Login
              </Link>
            </div>
          ) : (
            <div style={{ margin: "1.5rem 0" }}>
              <button
                onClick={handleLogout}
                style={{
                  background: "linear-gradient(135deg, #d69e2e 0%, #f6ad55 100%)",
                  fontWeight: "600",
                  fontSize: "1rem",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "8px",
                  color: "#1a365d",
                  border: "none",
                  cursor: "pointer",
                  width: "100%",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 12px rgba(214, 158, 46, 0.3)",
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 6px 20px rgba(214, 158, 46, 0.4)";
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 4px 12px rgba(214, 158, 46, 0.3)";
                }}
              >
                Logout
              </button>
            </div>
          )}

          {/* Divider */}
          <hr style={{ marginBottom: "1rem", border: "none", borderTop: "1px solid rgba(214, 158, 46, 0.3)" }} />

          {/* Secondary Navigation */}
          <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem", listStyle: "none", padding: 0, margin: 0 }}>
            {isAuthenticated && (
              <li>
                <Link
                  to="/me"
                  onClick={handleLinkClick}
                  style={{
                    display: "flex",
                    fontSize: "1rem",
                    fontWeight: "600",
                    gap: "0.75rem",
                    alignItems: "center",
                    color: "#cbd5e0",
                    textDecoration: "none",
                    padding: "0.75rem 1rem",
                    borderRadius: "8px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.color = "#d69e2e";
                    e.target.style.background = "rgba(214, 158, 46, 0.1)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.color = "#cbd5e0";
                    e.target.style.background = "transparent";
                  }}
                >
                  <FaUserCircle /> Profile
                </Link>
              </li>
            )}
            <li>
              <Link
                to="/how-it-works-info"
                onClick={handleLinkClick}
                style={{
                  display: "flex",
                  fontSize: "1rem",
                  fontWeight: "600",
                  gap: "0.75rem",
                  alignItems: "center",
                  color: "#cbd5e0",
                  textDecoration: "none",
                  padding: "0.75rem 1rem",
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.target.style.color = "#d69e2e";
                  e.target.style.background = "rgba(214, 158, 46, 0.1)";
                }}
                onMouseOut={(e) => {
                  e.target.style.color = "#cbd5e0";
                  e.target.style.background = "transparent";
                }}
              >
                <SiGooglesearchconsole /> How it works
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={handleLinkClick}
                style={{
                  display: "flex",
                  fontSize: "1rem",
                  fontWeight: "600",
                  gap: "0.75rem",
                  alignItems: "center",
                  color: "#cbd5e0",
                  textDecoration: "none",
                  padding: "0.75rem 1rem",
                  borderRadius: "8px",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.target.style.color = "#d69e2e";
                  e.target.style.background = "rgba(214, 158, 46, 0.1)";
                }}
                onMouseOut={(e) => {
                  e.target.style.color = "#cbd5e0";
                  e.target.style.background = "transparent";
                }}
              >
                <BsFillInfoSquareFill /> About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Footer Section */}
        <div>
          {/* Social Media Links */}
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "1rem" }}>
            <Link
              to="facebook.com"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                color: "#cbd5e0",
                padding: "0.5rem",
                fontSize: "1.2rem",
                borderRadius: "6px",
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.color = "#3b82f6";
                e.target.style.background = "rgba(255, 255, 255, 0.2)";
              }}
              onMouseOut={(e) => {
                e.target.style.color = "#cbd5e0";
                e.target.style.background = "rgba(255, 255, 255, 0.1)";
              }}
            >
              <FaFacebook />
            </Link>
            <Link
              to="instagram.com"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                color: "#cbd5e0",
                padding: "0.5rem",
                fontSize: "1.2rem",
                borderRadius: "6px",
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.color = "#ec4899";
                e.target.style.background = "rgba(255, 255, 255, 0.2)";
              }}
              onMouseOut={(e) => {
                e.target.style.color = "#cbd5e0";
                e.target.style.background = "rgba(255, 255, 255, 0.1)";
              }}
            >
              <RiInstagramFill />
            </Link>
          </div>

          {/* Contact and Copyright */}
          <Link
            to="/contact"
            onClick={handleLinkClick}
            style={{
              color: "#94a3b8",
              fontWeight: "600",
              fontSize: "0.9rem",
              textDecoration: "none",
              display: "block",
              marginBottom: "0.5rem",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.color = "#d69e2e";
            }}
            onMouseOut={(e) => {
              e.target.style.color = "#94a3b8";
            }}
          >
            Contact Us
          </Link>
          <p style={{ color: "#64748b", fontSize: "0.8rem", margin: "0.25rem 0" }}>
            &copy; QuickBid, LLC.
          </p>
          <p style={{ color: "#64748b", fontSize: "0.8rem", margin: 0 }}>
            Designed By{" "}
            <Link
              to="/"
              style={{
                fontWeight: "600",
                color: "#64748b",
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.color = "#d69e2e";
              }}
              onMouseOut={(e) => {
                e.target.style.color = "#64748b";
              }}
            >
              Harsh, Namman, Sanchit
            </Link>
          </p>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobile && show && (
        <div
          onClick={() => setShow(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          }}
        />
      )}
    </>
  );
};

export default SideDrawer;
