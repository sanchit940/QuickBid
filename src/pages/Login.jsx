import { login } from "@/store/slices/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, isAuthenticated } = useSelector((state) => state.user);

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    dispatch(login(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          width: "100%",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          borderRadius: isMobile ? "16px" : "24px",
          padding: isMobile ? "2rem 1.5rem" : "3rem 2.5rem",
          boxShadow: "0 20px 40px rgba(26, 54, 93, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: isMobile ? "2rem" : "2.5rem" }}>
          <h1
            style={{
              fontSize: isMobile ? "2rem" : "2.5rem",
              fontWeight: "800",
              color: "#1a365d",
              marginBottom: "0.5rem",
              letterSpacing: "-0.02em",
            }}
          >
            Welcome Back
          </h1>
          <p
            style={{
              fontSize: isMobile ? "1rem" : "1.1rem",
              color: "#38b2ac",
              fontWeight: "500",
            }}
          >
            Sign in to your QuickBid account
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              marginBottom: "2rem",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: isMobile ? "1rem" : "1.1rem",
                  fontWeight: "600",
                  color: "#1a365d",
                  marginBottom: "0.5rem",
                }}
              >
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                style={{
                  width: "100%",
                  padding: isMobile ? "0.8rem" : "1rem",
                  fontSize: isMobile ? "0.9rem" : "1rem",
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
                required
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: isMobile ? "1rem" : "1.1rem",
                  fontWeight: "600",
                  color: "#1a365d",
                  marginBottom: "0.5rem",
                }}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                style={{
                  width: "100%",
                  padding: isMobile ? "0.8rem" : "1rem",
                  fontSize: isMobile ? "0.9rem" : "1rem",
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
                required
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: isMobile ? "1rem" : "1.2rem",
              fontSize: isMobile ? "1rem" : "1.1rem",
              fontWeight: "600",
              color: "#1a365d",
              background: loading 
                ? "linear-gradient(135deg, #cbd5e0 0%, #a0aec0 100%)"
                : "linear-gradient(135deg, #d69e2e 0%, #f6ad55 100%)",
              border: "none",
              borderRadius: "12px",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 15px rgba(214, 158, 46, 0.3)",
              marginBottom: "1.5rem",
            }}
            onMouseOver={(e) => {
              if (!loading) {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 20px rgba(214, 158, 46, 0.4)";
              }
            }}
            onMouseOut={(e) => {
              if (!loading) {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 15px rgba(214, 158, 46, 0.3)";
              }
            }}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Sign Up Link */}
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              fontSize: isMobile ? "0.9rem" : "1rem",
              color: "#4a5568",
              marginBottom: "1rem",
            }}
          >
            Don't have an account?{" "}
            <span
              onClick={() => navigateTo("/sign-up")}
              style={{
                color: "#38b2ac",
                fontWeight: "600",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Sign up here
            </span>
          </p>
        </div>

        {/* Features */}
        <div
          style={{
            background: "linear-gradient(135deg, #e6fffa 0%, #b2f5ea 100%)",
            borderRadius: "12px",
            padding: isMobile ? "1.2rem" : "1.5rem",
            marginTop: "1.5rem",
            border: "1px solid #81e6d9",
          }}
        >
          <h4
            style={{
              fontSize: isMobile ? "1rem" : "1.1rem",
              fontWeight: "600",
              color: "#234e52",
              marginBottom: "0.8rem",
            }}
          >
            🎯 Why Choose QuickBid?
          </h4>
          <ul
            style={{
              fontSize: isMobile ? "0.8rem" : "0.9rem",
              color: "#234e52",
              margin: 0,
              paddingLeft: "1.2rem",
              lineHeight: "1.5",
            }}
          >
            <li>Secure and transparent bidding process</li>
            <li>Wide variety of auction categories</li>
            <li>Real-time bidding updates</li>
            <li>24/7 customer support</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;
