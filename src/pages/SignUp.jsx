import { register } from "@/store/slices/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  /* ------------- state ------------- */
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [easypaisaAccountNumber, setEasypaisaAccountNumber] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [profileImagePreview, setProfileImagePreview] = useState("");

  /* ------------- redux ------------- */
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  /* ------------- handlers ------------- */
  const handleRegister = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("userName", userName);
    fd.append("email", email);
    fd.append("phone", phone);
    fd.append("password", password);
    fd.append("address", address);
    fd.append("role", role);
    fd.append("profileImage", profileImage);

    if (role === "Auctioneer") {
      fd.append("bankAccountName", bankAccountName);
      fd.append("bankAccountNumber", bankAccountNumber);
      fd.append("bankName", bankName);
      fd.append("easypaisaAccountNumber", easypaisaAccountNumber);
      fd.append("paypalEmail", paypalEmail);
    }
    dispatch(register(fd));
  };

  useEffect(() => {
    if (isAuthenticated) navigateTo("/");
  }, [isAuthenticated, navigateTo]);

  const imageHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setProfileImagePreview(reader.result);
      setProfileImage(file);
    };
    reader.readAsDataURL(file);
  };

  /* ------------- JSX ------------- */
  return (
    <section
      /* full width on mobile – padding-left only on lg screens to clear the sidebar */
      className="w-full min-h-screen flex flex-col justify-center px-4 py-6 lg:pl-[320px] lg:px-8"
    >
      <div className="mx-auto w-full max-w-3xl bg-white rounded-xl shadow-xl py-8 px-6 md:px-10 flex flex-col gap-6">
        <h1 className="text-[#d6482b] text-3xl md:text-5xl font-bold text-center">
          Register
        </h1>

        {/* ---------- form ---------- */}
        <form onSubmit={handleRegister} className="flex flex-col gap-8">
          {/* personal */}
          <div className="flex flex-col gap-6">
            <p className="font-semibold text-xl md:text-2xl">Personal Details</p>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex flex-col">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="form-label">Phone</label>
                <input
                  type="number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="form-label">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="form-input"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="Auctioneer">Auctioneer</option>
                  <option value="Bidder">Bidder</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* profile image */}
            <div className="flex flex-col gap-3">
              <label className="form-label">Profile Image</label>
              <div className="flex items-center gap-4">
                <img
                  src={profileImagePreview || "/imageHolder.jpg"}
                  alt="preview"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <input type="file" accept="image/*" onChange={imageHandler} />
              </div>
            </div>
          </div>

          {/* payment */}
          <div className="flex flex-col gap-6">
            <p className="font-semibold text-xl md:text-2xl">
              Payment Method Details
              <span className="block text-sm text-stone-500 font-normal mt-1">
                Only for Auctioneer registrations
              </span>
            </p>

            {/* bank */}
            <div className="flex flex-col gap-4">
              <label className="text-base font-medium text-stone-600">
                Bank Details
              </label>
              <div className="grid gap-4 md:grid-cols-3">
                <select
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="form-input"
                  disabled={role === "Bidder"}
                >
                  <option value="">Select Bank</option>
                  <option value="Meezan Bank">Meezan Bank</option>
                  <option value="UBL">UBL</option>
                  <option value="HBL">HBL</option>
                  <option value="Allied Bank">Allied Bank</option>
                </select>

                <input
                  type="text"
                  placeholder="IBAN / IFSC"
                  value={bankAccountNumber}
                  onChange={(e) => setBankAccountNumber(e.target.value)}
                  className="form-input"
                  disabled={role === "Bidder"}
                />

                <input
                  type="text"
                  placeholder="Account Holder Name"
                  value={bankAccountName}
                  onChange={(e) => setBankAccountName(e.target.value)}
                  className="form-input"
                  disabled={role === "Bidder"}
                />
              </div>
            </div>

            {/* easypaisa / paypal */}
            <div className="flex flex-col gap-4">
              <label className="text-base font-medium text-stone-600">
                Easypaisa & Paypal
              </label>
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="number"
                  placeholder="Easypaisa Acc No."
                  value={easypaisaAccountNumber}
                  onChange={(e) => setEasypaisaAccountNumber(e.target.value)}
                  className="form-input"
                  disabled={role === "Bidder"}
                />
                <input
                  type="email"
                  placeholder="Paypal Email"
                  value={paypalEmail}
                  onChange={(e) => setPaypalEmail(e.target.value)}
                  className="form-input"
                  disabled={role === "Bidder"}
                />
              </div>
            </div>
          </div>

          {/* submit */}
          <button
            type="submit"
            disabled={loading}
            className="mx-auto w-full md:w-2/3 lg:w-1/2 bg-[#d6482b] hover:bg-[#b8381e] transition text-white font-semibold py-3 rounded-md text-lg"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </section>
  );
};

/* ----- small utility classes (Tailwind) ----- */
/* Add these once in your global CSS / tailwind.css file:
.form-label { @apply text-[16px] text-stone-600; }
.form-input { @apply bg-transparent border-b border-stone-500 py-2 focus:outline-none text-[16px]; }
*/

export default SignUp;
