import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import FeaturedAuctions   from "./home-sub-components/FeaturedAuctions";
import UpcomingAuctions   from "./home-sub-components/UpcomingAuctions";
import Leaderboard        from "./home-sub-components/Leaderboard";

/* —————————————————————————————————————————————————————————— */
/*  tiny helper – keeps track of screen-size break-points     */
/* —————————————————————————————————————————————————————————— */
const useScreen = () => {
  const [w, setW] = useState(window.innerWidth);
  useEffect(() => {
    const onResize = () => setW(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return {
    mobile : w <  640,         // < 640 px   → phones
    tablet : w >= 640 && w < 1024,
    desktop: w >= 1024,
    full   : w,
  };
};

const Home = () => {
  /* ------------------------------------------------------------------ */
  const { mobile, tablet } = useScreen();                   // break-points
  const { isAuthenticated }  = useSelector((s) => s.user);  // redux state
  /* ------------------------------------------------------------------ */

  const howItWorks = [
    { title: "Post Items",      description: "Auctioneer posts items for bidding." },
    { title: "Place Bids",      description: "Bidders place bids on listed items." },
    { title: "Win Notification",description: "Highest bidder receives a winning email." },
    { title: "Payment & Fees",  description: "Bidder pays; auctioneer pays 5 % fee." },
  ];

  /* ------------------------------------------------------------------ */
  /*  layout helpers – sidebar is fixed 250 px on ≥ tablet screens      */
  /* ------------------------------------------------------------------ */
  const sideWidth = tablet || mobile ? 0 : 250.5;          // sidebar width
  const topOffset = mobile ? 60 : 0;                     // mobile header

  return (
    <div
      style={{
        minHeight   : "100vh",
        background  : "linear-gradient(135deg,#f7fafc 0%,#e2e8f0 100%)",
        fontFamily  : "'Inter','Montserrat',sans-serif",
        marginLeft  : sideWidth,
        marginTop   : topOffset,
        paddingLeft : mobile ? "0" : "2rem",
        boxSizing   : "border-box",
        width       : mobile ? "100vw" : `calc(100vw - ${sideWidth}px)`,
        transition  : "margin 0.3s ease",
      }}
    >

      {/* ==================== HERO SECTION ==================== */}
      <section
        style={{
          background   : "linear-gradient(135deg,#1a365d 0%,#2d5a87 100%)",
          color        : "#fff",
          padding      : mobile ? "3rem 1rem" : "5rem 2rem",
          textAlign    : "center",
          position     : "relative",
          overflow     : "hidden",
          marginLeft   : mobile ? 0 : "-2rem",
          marginRight  : mobile ? 0 : "-1rem",
          paddingLeft  : mobile ? "1rem" : "3rem",
          paddingRight : mobile ? "1rem" : "3rem",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <h1
            style={{
              fontSize       : mobile ? "2.2rem" : "4rem",
              fontWeight     : 800,
              marginBottom   : "1.5rem",
              letterSpacing  : "-0.02em",
              background     : "linear-gradient(135deg,#fff 0%,#d69e2e 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor : "transparent",
              backgroundClip : "text",
              lineHeight     : 1.2,
            }}
          >
            Transparency Leads to Your Victory
          </h1>

          <p style={{
            fontSize     : mobile ? "1.2rem" : "1.5rem",
            color        : "#cbd5e0",
            fontWeight   : 500,
            marginBottom : "1rem",
          }}>
            Transparent Auctions
          </p>

          <p style={{
            fontSize     : mobile ? "1.6rem" : "2rem",
            color        : "#38b2ac",
            fontWeight   : 600,
            marginBottom : "3rem",
          }}>
            Be The Winner
          </p>

          {/* CTA Buttons – hidden when logged-in */}
          {!isAuthenticated && (
            <div style={{
              display       : "flex",
              flexDirection : mobile ? "column" : "row",
              gap           : "1.5rem",
              justifyContent: "center",
              alignItems    : "center",
            }}>
              <Link to="/sign-up" style={{ width: mobile ? "100%" : "auto", textDecoration:"none" }}>
                <button style={{
                  width         : "100%",
                  padding       : "1rem 2.5rem",
                  fontSize      : "1.2rem",
                  fontWeight    : 600,
                  color         : "#1a365d",
                  border        : "none",
                  borderRadius  : 12,
                  cursor        : "pointer",
                  transition    : "all .3s",
                  background    : "linear-gradient(135deg,#d69e2e 0%,#f6ad55 100%)",
                  boxShadow     : "0 4px 15px rgba(214,158,46,.3)",
                }}>
                  Sign Up
                </button>
              </Link>

              <Link to="/login" style={{ width: mobile ? "100%" : "auto", textDecoration:"none" }}>
                <button style={{
                  width         : "100%",
                  padding       : "1rem 2.5rem",
                  fontSize      : "1.2rem",
                  fontWeight    : 600,
                  color         : "#fff",
                  background    : "transparent",
                  border        : "2px solid #38b2ac",
                  borderRadius  : 12,
                  cursor        : "pointer",
                  transition    : "all .3s",
                }}>
                  Login
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* decorative blob */}
        {!mobile && (
          <div style={{
            position   : "absolute",
            top        : "-50%",
            right      : "-20%",
            width      : "40%",
            height     : "200%",
            background : "linear-gradient(45deg,rgba(214,158,46,.1) 0%,transparent 70%)",
            borderRadius: "50%",
            zIndex     : 1,
          }}/>
        )}
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section style={{
        padding         : mobile ? "3rem 1rem" : "5rem 2rem",
        background      : "rgba(255,255,255,.95)",
        backdropFilter  : "blur(10px)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <header style={{ textAlign:"center", marginBottom: mobile ? "3rem" : "4rem" }}>
            <h2 style={{
              fontSize   : mobile ? "2rem" : "3rem",
              fontWeight : 700,
              color      : "#1a365d",
              marginBottom: "1.5rem",
            }}>
              How It <span style={{ color:"#d69e2e" }}>Works</span>
            </h2>
            <p style={{
              fontSize : mobile ? "1.1rem" : "1.3rem",
              color    : "#4a5568",
              maxWidth : 600,
              margin   : "0 auto",
            }}>
              Simple steps to start your auction journey with QuickBid
            </p>
          </header>

          <div style={{
            display        : "grid",
            gridTemplateColumns: mobile ? "1fr"
                                        : "repeat(auto-fit,minmax(280px,1fr))",
            gap            : mobile ? "1.5rem" : "2rem",
          }}>
            {howItWorks.map(({title,description},i) => (
              <article key={title} style={{
                padding       : mobile ? "2rem 1.5rem" : "2.5rem 2rem",
                background    : "linear-gradient(135deg,#fff 0%,#f7fafc 100%)",
                borderRadius  : 20,
                border        : "1px solid #e2e8f0",
                boxShadow     : "0 8px 25px rgba(26,54,93,.08)",
                textAlign     : "center",
              }}>
                <div style={{
                  width       : mobile ? "2.5rem" : "3rem",
                  height      : mobile ? "2.5rem" : "3rem",
                  margin      : "0 auto 1.5rem",
                  borderRadius: "50%",
                  background  : "linear-gradient(135deg,#38b2ac 0%,#4fd1c7 100%)",
                  color       : "#fff",
                  fontWeight  : 700,
                  fontSize    : mobile ? "1rem" : "1.2rem",
                  display     : "flex",
                  alignItems  : "center",
                  justifyContent:"center",
                  boxShadow   : "0 4px 15px rgba(56,178,172,.3)",
                }}>
                  {i+1}
                </div>
                <h3 style={{
                  fontSize   : mobile ? "1.2rem" : "1.4rem",
                  fontWeight : 600,
                  color      : "#1a365d",
                  marginBottom: "1rem",
                }}>
                  {title}
                </h3>
                <p style={{
                  fontSize : mobile ? "1rem" : "1.1rem",
                  color    : "#4a5568",
                  lineHeight: 1.6,
                }}>
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =============== FEATURED & UPCOMING AUCTIONS =============== */}
      <section style={{ padding: mobile ? "3rem 1rem" : "4rem 2rem",
                        background:"linear-gradient(135deg,#f7fafc 0%,#e2e8f0 100%)" }}>
        <div style={{
          maxWidth   : 1400,
          margin     : "0 auto",
          background : "rgba(255,255,255,.95)",
          backdropFilter:"blur(10px)",
          borderRadius: mobile ? 16 : 24,
          padding    : mobile ? "2rem 1.5rem" : "3rem",
          boxShadow  : "0 20px 40px rgba(26,54,93,.1)",
        }}>
          <header style={{ textAlign:"center", marginBottom:"3rem" }}>
            <h2 style={{ fontSize: mobile?"2rem":"2.5rem", fontWeight:700, color:"#1a365d" }}>
              Featured <span style={{color:"#d69e2e"}}>Auctions</span>
            </h2>
            <p style={{ fontSize: mobile?"1.1rem":"1.2rem", color:"#4a5568", maxWidth:500, margin:"0 auto" }}>
              Discover the most exciting auctions happening right now
            </p>
          </header>
          <FeaturedAuctions />
        </div>
      </section>

      <section style={{
        padding      : mobile ? "3rem 1rem" : "4rem 2rem",
        background   : "rgba(255,255,255,.95)",
        backdropFilter:"blur(10px)",
      }}>
        <div style={{
          maxWidth   : 1400,
          margin     : "0 auto",
          background : "linear-gradient(135deg,#fff 0%,#f7fafc 100%)",
          borderRadius: mobile ? 16 : 24,
          padding    : mobile ? "2rem 1.5rem" : "3rem",
          boxShadow  : "0 20px 40px rgba(26,54,93,.1)",
          border     : "1px solid #e2e8f0",
        }}>
          <header style={{ textAlign:"center", marginBottom:"3rem" }}>
            <h2 style={{ fontSize: mobile?"2rem":"2.5rem", fontWeight:700, color:"#1a365d" }}>
              Upcoming <span style={{color:"#38b2ac"}}>Auctions</span>
            </h2>
            <p style={{ fontSize: mobile?"1.1rem":"1.2rem", color:"#4a5568", maxWidth:500, margin:"0 auto" }}>
              Don’t miss out on these exciting upcoming opportunities
            </p>
          </header>
          <UpcomingAuctions />
        </div>
      </section>

      {/* ==================== LEADERBOARD ==================== */}
      <section style={{
        padding      : mobile ? "3rem 1rem" : "4rem 2rem",
        background   : "linear-gradient(135deg,#1a365d 0%,#2d5a87 100%)",
        color        : "#fff",
        marginLeft   : mobile ? 0 : "-2rem",
        marginRight  : mobile ? 0 : "-1rem",
        paddingLeft  : mobile ? "1rem" : "3rem",
        paddingRight : mobile ? "1rem" : "3rem",
      }}>
        <div style={{
          maxWidth     : 1400,
          margin       : "0 auto",
          background   : "rgba(255,255,255,.1)",
          backdropFilter:"blur(10px)",
          borderRadius : mobile ? 16 : 24,
          padding      : mobile ? "2rem 1.5rem" : "3rem",
        }}>
          <header style={{ textAlign:"center", marginBottom:"3rem" }}>
            <h2 style={{ fontSize: mobile?"2rem":"2.5rem", fontWeight:700, color:"#fff" }}>
              Top <span style={{color:"#d69e2e"}}>Bidders</span>
            </h2>
            <p style={{ fontSize: mobile?"1.1rem":"1.2rem", color:"#cbd5e0", maxWidth:500, margin:"0 auto" }}>
              See who’s leading the competition in our auction community
            </p>
          </header>
          <Leaderboard />
        </div>
      </section>

      {/* ==================== FINAL CALL-TO-ACTION ==================== */}
      <section style={{ padding: mobile?"3rem 1rem":"5rem 2rem",
                        background:"linear-gradient(135deg,#f7fafc 0%,#e2e8f0 100%)",
                        textAlign:"center" }}>
        <div style={{
          maxWidth   : 800,
          margin     : "0 auto",
          background : "rgba(255,255,255,.95)",
          backdropFilter:"blur(10px)",
          borderRadius: mobile ? 16 : 24,
          padding    : mobile ? "3rem 2rem" : "4rem 3rem",
          boxShadow  : "0 20px 40px rgba(26,54,93,.1)",
        }}>
          <h2 style={{
            fontSize   : mobile?"2.2rem":"2.8rem",
            fontWeight : 700,
            color      : "#1a365d",
            marginBottom:"1.5rem",
          }}>
            Ready to Start Your Auction Journey?
          </h2>
          <p style={{
            fontSize : mobile?"1.1rem":"1.3rem",
            color    : "#4a5568",
            marginBottom:"2.5rem",
            lineHeight:1.6,
          }}>
            Join thousands of satisfied users who trust QuickBid for their auction needs. Whether you're buying or selling, we make it simple and secure.
          </p>

          <div style={{
            display       : "flex",
            flexDirection : mobile ? "column" : "row",
            gap           : "1.5rem",
            justifyContent: "center",
            alignItems    : "center",
          }}>
            <Link to="/auctions" style={{ width: mobile?"100%":"auto", textDecoration:"none" }}>
              <button style={{
                width        : "100%",
                padding      : "1rem 2.5rem",
                fontSize     : "1.2rem",
                fontWeight   : 600,
                color        : "#1a365d",
                border       : "none",
                borderRadius : 12,
                cursor       : "pointer",
                background   : "linear-gradient(135deg,#d69e2e 0%,#f6ad55 100%)",
                boxShadow    : "0 4px 15px rgba(214,158,46,.3)",
                transition   : "all .3s",
              }}>
                Explore Auctions
              </button>
            </Link>

            <Link to="/how-it-works" style={{ width: mobile?"100%":"auto", textDecoration:"none" }}>
              <button style={{
                width        : "100%",
                padding      : "1rem 2.5rem",
                fontSize     : "1.2rem",
                fontWeight   : 600,
                color        : "#38b2ac",
                background   : "transparent",
                border       : "2px solid #38b2ac",
                borderRadius : 12,
                cursor       : "pointer",
                transition   : "all .3s",
              }}>
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
