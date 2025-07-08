import { createAuction } from "@/store/slices/auctionSlice";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateAuction = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  // Define auction categories locally to fix the import error
  const auctionCategories = [
    "Electronics",
    "Furniture", 
    "Art & Collectibles",
    "Jewelry & Watches",
    "Clothing & Accessories",
    "Home & Garden",
    "Sports & Recreation",
    "Books & Media",
    "Automotive",
    "Real Estate",
    "Antiques",
    "Other"
  ];

  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [startingBid, setStartingBid] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImagePreview(reader.result);
      setImage(file);
    };
  };

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auction);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const navigateTo = useNavigate();

  const handleCreateAuction = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("condition", condition);
    formData.append("startingBid", startingBid);
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    dispatch(createAuction(formData));
  };

  useEffect(() => {
    if (!isAuthenticated || user.role !== "Auctioneer") {
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
      <div
        style={{
          maxWidth: "1000px",
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
            Create <span style={{ color: "#d69e2e" }}>Auction</span>
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
            List your item and start receiving bids from interested buyers
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleCreateAuction}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: isMobile ? "2rem" : "3rem",
              alignItems: "start",
            }}
          >
            {/* Left Column - Basic Details */}
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
                📝 Auction Details
              </h2>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
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
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
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
                  >
                    <option value="">Select Category</option>
                    {auctionCategories.map((element) => (
                      <option key={element} value={element}>
                        {element}
                      </option>
                    ))}
                  </select>
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
                    Condition
                  </label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
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
                  >
                    <option value="">Select Condition</option>
                    <option value="New">New</option>
                    <option value="Used">Used</option>
                  </select>
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
                    Starting Bid (Rs.)
                  </label>
                  <input
                    type="number"
                    value={startingBid}
                    onChange={(e) => setStartingBid(e.target.value)}
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
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={isMobile ? 4 : 6}
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
                    required
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Timing & Image */}
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
                🕒 Timing & Media
              </h2>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
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
                    Auction Start Time
                  </label>
                  <DatePicker
                    selected={startTime}
                    onChange={(date) => setStartTime(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
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
                    Auction End Time
                  </label>
                  <DatePicker
                    selected={endTime}
                    onChange={(date) => setEndTime(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
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
                    Auction Item Image
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
                      minHeight: isMobile ? "200px" : "250px",
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
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        style={{
                          width: "100%",
                          maxHeight: isMobile ? "150px" : "200px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          marginBottom: "1rem",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          fontSize: isMobile ? "2.5rem" : "3rem",
                          color: "#cbd5e0",
                          marginBottom: "1rem",
                        }}
                      >
                        📷
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={imageHandler}
                      style={{
                        display: "none",
                      }}
                      id="image-upload"
                      required
                    />
                    <label
                      htmlFor="image-upload"
                      style={{
                        display: "block",
                        cursor: "pointer",
                        color: "#4a5568",
                        fontSize: isMobile ? "0.9rem" : "1rem",
                        textAlign: "center",
                      }}
                    >
                      Click to upload or drag and drop
                      <br />
                      <span style={{ fontSize: isMobile ? "0.8rem" : "0.9rem", color: "#718096" }}>
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div
            style={{
              textAlign: "center",
              marginTop: isMobile ? "2rem" : "3rem",
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
                minWidth: isMobile ? "100%" : "200px",
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
              {loading ? "Creating Auction..." : "Create Auction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAuction;
