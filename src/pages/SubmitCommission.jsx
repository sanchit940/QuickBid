import { postCommissionProof } from "@/store/slices/commissionSlice";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const SubmitCommission = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [proof, setProof] = useState("");
  const [proofPreview, setProofPreview] = useState("");
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const proofHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setProofPreview(reader.result);
        setProof(file);
      };
    }
  };

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.commission);

  const handlePaymentProof = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("proof", proof);
    formData.append("amount", amount);
    formData.append("comment", comment);
    dispatch(postCommissionProof(formData));
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
      <div
        style={{
          maxWidth: "900px",
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
            Submit <span style={{ color: "#d69e2e" }}>Commission</span>
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
            Upload your payment proof and commission details for verification
          </p>
        </div>

        {/* Information Card */}
        <div
          style={{
            background: "linear-gradient(135deg, #fed7d7 0%, #feb2b2 100%)",
            borderRadius: "16px",
            padding: isMobile ? "1.5rem" : "2rem",
            marginBottom: isMobile ? "2rem" : "3rem",
            border: "1px solid #fc8181",
          }}
        >
          <h3
            style={{
              fontSize: isMobile ? "1.1rem" : "1.3rem",
              fontWeight: "700",
              color: "#c53030",
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            ⚠️ Important Information
          </h3>
          <p
            style={{
              fontSize: isMobile ? "1rem" : "1.1rem",
              color: "#c53030",
              lineHeight: "1.6",
              margin: 0,
            }}
          >
            Please ensure your payment proof screenshot is clear and shows all transaction details. 
            The commission amount should match exactly with your payment. Once submitted, our admin 
            team will review and approve your commission payment.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handlePaymentProof}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: isMobile ? "2rem" : "3rem",
              alignItems: "start",
            }}
          >
            {/* Left Column - Payment Details */}
            <div>
              <h2
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
                💰 Payment Details
              </h2>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2rem",
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
                    Commission Amount (Rs.)
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter the exact amount you paid"
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
                    Additional Comments
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={isMobile ? 4 : 6}
                    placeholder="Add any additional information about your payment..."
                    style={{
                      width: "100%",
                      padding: isMobile ? "0.8rem" : "1rem",
                      fontSize: isMobile ? "0.9rem" : "1rem",
                      border: "2px solid #e2e8f0",
                      borderRadius: "12px",
                      background: "#ffffff",
                      transition: "all 0.3s ease",
                      outline: "none",
                      resize: "vertical",
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
                </div>
              </div>
            </div>

            {/* Right Column - Payment Proof Upload */}
            <div>
              <h2
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
                📸 Payment Proof
              </h2>

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
                  Upload Screenshot
                </label>
                <div
                  style={{
                    border: "2px dashed #e2e8f0",
                    borderRadius: "12px",
                    padding: isMobile ? "1.5rem" : "2rem",
                    textAlign: "center",
                    background: "#f7fafc",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    minHeight: isMobile ? "250px" : "300px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.currentTarget.style.borderColor = "#38b2ac";
                    e.currentTarget.style.background = "#e6fffa";
                  }}
                  onDragLeave={(e) => {
                    e.currentTarget.style.borderColor = "#e2e8f0";
                    e.currentTarget.style.background = "#f7fafc";
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files[0];
                    if (file && file.type.startsWith('image/')) {
                      const reader = new FileReader();
                      reader.readAsDataURL(file);
                      reader.onload = () => {
                        setProofPreview(reader.result);
                        setProof(file);
                      };
                    }
                    e.currentTarget.style.borderColor = "#e2e8f0";
                    e.currentTarget.style.background = "#f7fafc";
                  }}
                >
                  {proofPreview ? (
                    <div style={{ width: "100%" }}>
                      <img
                        src={proofPreview}
                        alt="Payment Proof Preview"
                        style={{
                          width: "100%",
                          maxHeight: isMobile ? "200px" : "250px",
                          objectFit: "contain",
                          borderRadius: "8px",
                          marginBottom: "1rem",
                        }}
                      />
                      <p
                        style={{
                          fontSize: isMobile ? "0.8rem" : "0.9rem",
                          color: "#4a5568",
                          margin: 0,
                        }}
                      >
                        Click to change image
                      </p>
                    </div>
                  ) : (
                    <>
                      <div
                        style={{
                          fontSize: isMobile ? "3rem" : "4rem",
                          color: "#cbd5e0",
                          marginBottom: "1rem",
                        }}
                      >
                        📷
                      </div>
                      <p
                        style={{
                          fontSize: isMobile ? "1rem" : "1.1rem",
                          color: "#4a5568",
                          marginBottom: "0.5rem",
                          fontWeight: "500",
                        }}
                      >
                        Click to upload or drag and drop
                      </p>
                      <p
                        style={{
                          fontSize: isMobile ? "0.8rem" : "0.9rem",
                          color: "#718096",
                          margin: 0,
                        }}
                      >
                        PNG, JPG, JPEG (MAX. 5MB)
                      </p>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={proofHandler}
                    style={{
                      display: "none",
                    }}
                    id="proof-upload"
                    required
                  />
                </div>
                <label
                  htmlFor="proof-upload"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    cursor: "pointer",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Guidelines Section */}
          <div
            style={{
              background: "linear-gradient(135deg, #e6fffa 0%, #b2f5ea 100%)",
              borderRadius: "16px",
              padding: isMobile ? "1.5rem" : "2rem",
              margin: isMobile ? "2rem 0" : "3rem 0",
              border: "1px solid #81e6d9",
            }}
          >
            <h3
              style={{
                fontSize: isMobile ? "1.1rem" : "1.3rem",
                fontWeight: "700",
                color: "#234e52",
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              📋 Submission Guidelines
            </h3>
            <ul
              style={{
                fontSize: isMobile ? "0.9rem" : "1rem",
                color: "#234e52",
                lineHeight: "1.6",
                margin: 0,
                paddingLeft: "1.5rem",
              }}
            >
              <li style={{ marginBottom: "0.5rem" }}>
                Ensure your screenshot clearly shows the transaction details
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                Include transaction ID, amount, and date in the screenshot
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                The amount entered must match exactly with the payment made
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                Processing time is typically 24-48 hours after submission
              </li>
              <li>
                Contact support if you have any questions about the commission process
              </li>
            </ul>
          </div>

          {/* Submit Button */}
          <div
            style={{
              textAlign: "center",
              paddingTop: "2rem",
              borderTop: "1px solid #e2e8f0",
            }}
          >
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: isMobile ? "1rem 2rem" : "1.2rem 3rem",
                fontSize: isMobile ? "1rem" : "1.2rem",
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
                minWidth: isMobile ? "100%" : "250px",
              }}
              onMouseOver={(e) => {
                if (!loading) {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 8px 25px rgba(214, 158, 46, 0.4)";
                }
              }}
              onMouseOut={(e) => {
                if (!loading) {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 4px 15px rgba(214, 158, 46, 0.3)";
                }
              }}
            >
              {loading ? "Uploading Payment Proof..." : "Submit Commission Proof"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitCommission;
