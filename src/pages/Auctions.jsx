import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Card     from "@/custom-components/Card";
import Spinner  from "@/custom-components/Spinner";

/* ─────────────────────────────────────────────
   1.  Small helper to watch the viewport width
   ───────────────────────────────────────────── */
const useBreakpoints = () => {
  const [vw, setVw] = useState(window.innerWidth);

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return {
    isDesktop: vw >= 1024,
    isTablet : vw >= 768 && vw < 1024,
    isMobile : vw < 768,
  };
};

/* ─────────────────────────────────────────────
   2.  Main component
   ───────────────────────────────────────────── */
const Auctions = () => {
  const { allAuctions, loading } = useSelector((s) => s.auction);

  const { isDesktop, isTablet, isMobile } = useBreakpoints();

  const sideMargin = isMobile ? 0 : 250;
  const topGap = isMobile ? 60 : 0;

  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#f7fafc 0%,#e2e8f0 100%)",
        fontFamily: "'Inter','Montserrat',sans-serif",
        padding: isDesktop ? "2rem 1rem" : isTablet ? "1.5rem 1rem" : "1rem",
        paddingTop: `calc(${topGap}px + 1rem)`,
        marginLeft: sideMargin,
        paddingLeft: isMobile ? "1rem" : "2rem",
        boxSizing: "border-box",
        width: isMobile ? "100vw" : `calc(100vw - ${sideMargin}px)`,
        transition: "all .3s ease",
      }}
    >
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
          <Spinner />
        </div>
      ) : (
        <div
          style={{
            maxWidth: 1230,
            margin: "0 auto",
            background: "rgba(255,255,255,.95)",
            backdropFilter: "blur(10px)",
            borderRadius: isMobile ? 16 : 24,
            padding: isDesktop ? "4rem 3rem" : isTablet ? "3rem 2rem" : "2rem 1.5rem",
            boxShadow: "0 20px 40px rgba(26,54,93,.1)",
            border: "1px solid rgba(255,255,255,.2)",
          }}
        >
          {/* ─ HEADER ─ */}
          <div style={{ textAlign: "center", marginBottom: isMobile ? "3rem" : "4rem" }}>
            <h1
              style={{
                fontSize: isDesktop ? "3.5rem" : isTablet ? "2.8rem" : "2.2rem",
                fontWeight: 800,
                color: "#1a365d",
                marginBottom: "1.5rem",
                letterSpacing: "-.02em",
              }}
            >
              Live <span style={{ color: "#d69e2e" }}>Auctions</span>
            </h1>
            <p
              style={{
                fontSize: isDesktop ? "1.4rem" : isTablet ? "1.2rem" : "1.1rem",
                color: "#38b2ac",
                fontWeight: 500,
                maxWidth: 700,
                margin: "0 auto",
                lineHeight: 1.6,
              }}
            >
              Discover amazing items and place your bids on active auctions
            </p>
          </div>

          {/* ─ STAT CARDS ─ */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit,minmax(200px,1fr))",
              gap: "1.5rem",
              marginBottom: isMobile ? "2.5rem" : "3rem",
            }}
          >
            {[
              { bg: "linear-gradient(135deg,#38b2ac 0%,#4fd1c7 100%)", color: "#fff", value: allAuctions.length, label: "Active Auctions" },
              { bg: "linear-gradient(135deg,#d69e2e 0%,#f6ad55 100%)", color: "#1a365d", value: "24/7", label: "Bidding Available" },
              { bg: "linear-gradient(135deg,#1a365d 0%,#2d5a87 100%)", color: "#fff", value: "100%", label: "Secure Bidding" },
            ].map((c, i) => (
              <div
                key={i}
                style={{
                  padding: isMobile ? "1.2rem" : "1.5rem",
                  background: c.bg,
                  borderRadius: 16,
                  textAlign: "center",
                  color: c.color,
                  boxShadow: "0 8px 25px rgba(0,0,0,.15)",
                }}
              >
                <h3 style={{ fontSize: isMobile ? "1.6rem" : "2rem", fontWeight: 700, marginBottom: ".5rem" }}>{c.value}</h3>
                <p style={{ fontSize: isMobile ? ".9rem" : "1rem", opacity: .9 }}>{c.label}</p>
              </div>
            ))}
          </div>

          {/* ─ GRID OR EMPTY ─ */}
          {allAuctions.length ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  isDesktop ? "repeat(auto-fill,minmax(350px,1fr))"
                  : isTablet ? "repeat(auto-fill,minmax(300px,1fr))"
                  : "1fr",
                gap: isMobile ? "1.5rem" : "2rem",
                marginBottom: isMobile ? "2.5rem" : "3rem",
              }}
            >
              {allAuctions.map((a) => (
                <div
                  key={a._id}
                  style={{
                    background: "linear-gradient(135deg,#fff 0%,#f7fafc 100%)",
                    borderRadius: 20,
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 8px 25px rgba(26,54,93,.08)",
                    transition: "all .3s",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    if (!isMobile) Object.assign(e.currentTarget.style, { transform: "translateY(-5px)", boxShadow: "0 15px 35px rgba(26,54,93,.15)" });
                  }}
                  onMouseLeave={(e) => {
                    if (!isMobile) Object.assign(e.currentTarget.style, { transform: "translateY(0)", boxShadow: "0 8px 25px rgba(26,54,93,.08)" });
                  }}
                >
                  <Card element={a} />
                </div>
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: isMobile ? "3rem 1.5rem" : "4rem 2rem",
                background: "linear-gradient(135deg,#f7fafc 0%,#fff 100%)",
                borderRadius: 20,
                border: "1px solid #e2e8f0",
                marginBottom: isMobile ? "2.5rem" : "3rem",
              }}
            >
              <div style={{ fontSize: isMobile ? "3rem" : "4rem", marginBottom: "1rem", color: "#cbd5e0" }}>🏛️</div>
              <h3 style={{ fontSize: isMobile ? "1.5rem" : "1.8rem", fontWeight: 600, color: "#1a365d", marginBottom: "1rem" }}>
                No Active Auctions
              </h3>
              <p style={{
                fontSize: isMobile ? "1rem" : "1.1rem",
                color: "#4a5568",
                marginBottom: "2rem",
                maxWidth: 400,
                margin: "0 auto 2rem",
              }}>
                There are currently no active auctions. Check back soon for new exciting items!
              </p>
              <button
                onClick={() => navigate("/create-auction")}
                style={{
                  padding: isMobile ? ".8rem 1.5rem" : "1rem 2rem",
                  fontSize: isMobile ? "1rem" : "1.1rem",
                  fontWeight: 600,
                  color: "#1a365d",
                  background: "linear-gradient(135deg,#d69e2e 0%,#f6ad55 100%)",
                  border: "none",
                  borderRadius: 12,
                  cursor: "pointer",
                  transition: "all .3s",
                  boxShadow: "0 4px 15px rgba(214,158,46,.3)",
                }}
              >
                Create Your First Auction
              </button>
            </div>
          )}

          {/* ─ CTA ─ */}
          <div
            style={{
              background: "linear-gradient(135deg,#1a365d 0%,#2d5a87 100%)",
              borderRadius: 20,
              padding: isMobile ? "2rem 1.5rem" : "3rem 2rem",
              textAlign: "center",
              color: "#fff",
            }}
          >
            <h2 style={{ fontSize: isMobile ? "1.8rem" : "2.2rem", fontWeight: 700, marginBottom: "1rem" }}>
              Ready to Start Bidding?
            </h2>
            <p style={{
              fontSize: isMobile ? "1.1rem" : "1.2rem",
              marginBottom: "2rem",
              color: "#cbd5e0",
              maxWidth: 600,
              margin: "0 auto 2rem",
            }}>
              Join the excitement! Browse through our active auctions and place your bids on items you love.
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
              <Link to="/auctions">
                <button
                  style={{
                    padding: isMobile ? ".8rem 1.5rem" : "1rem 2rem",
                    fontSize: isMobile ? "1rem" : "1.1rem",
                    fontWeight: 600,
                    color: "#1a365d",
                    background: "linear-gradient(135deg,#d69e2e 0%,#f6ad55 100%)",
                    border: "none",
                    borderRadius: 12,
                    cursor: "pointer",
                    transition: "all .3s",
                    boxShadow: "0 4px 15px rgba(214,158,46,.3)",
                    width: isMobile ? "100%" : "auto",
                  }}
                >
                  Browse All Auctions
                </button>
              </Link>

              <Link to="/how-it-works-info">
                <button
                  style={{
                    padding: isMobile ? ".8rem 1.5rem" : "1rem 2rem",
                    fontSize: isMobile ? "1rem" : "1.1rem",
                    fontWeight: 600,
                    color: "#fff",
                    background: "transparent",
                    border: "2px solid #38b2ac",
                    borderRadius: 12,
                    cursor: "pointer",
                    transition: "all .3s",
                    width: isMobile ? "100%" : "auto",
                  }}
                  onMouseEnter={(e) => { e.target.style.background = "#38b2ac"; }}
                  onMouseLeave={(e) => { e.target.style.background = "transparent"; }}
                >
                  How It Works
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Auctions;
