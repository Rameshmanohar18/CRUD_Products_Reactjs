import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Features/Auth/authSlice.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { otpSent, loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const isValid = form.email && form.password.length >= 6;

  // After login step 1 succeeds → go to OTP page
  useEffect(() => {
    if (otpSent) {
      toast.info("OTP sent to your email 📧", {
        position: "top-center",
        autoClose: 2000
      });
      navigate("/verify-otp");
    }
  }, [otpSent, navigate]);

  // Show backend error
  useEffect(() => {
    if (error) toast.error(error, { position: "top-center" });
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) {
      toast.error("Enter valid credentials ❌");
      return;
    }
    dispatch(loginUser(form));
  };

  return (
    <div className="amazon-container">
      <form className="amazon-card" onSubmit={handleSubmit}>
        <h2>Sign-In</h2>

        {/* EMAIL */}
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        {/* PASSWORD */}
        <label>Password</label>
        <div className="password-box">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <span onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <button type="submit" disabled={!isValid || loading}>
          {loading ? "Sending OTP..." : "Sign-In"}
        </button>

        <p className="terms">
          By continuing, you agree to our Conditions of Use and Privacy Notice.
        </p>

        <p style={{ marginTop: "12px", fontSize: "13px", color: "#94a3b8" }}>
          Don't have an account?{" "}
          <Link to="/" style={{ color: "#6366f1" }}>Register here</Link>
        </p>
      </form>
    </div>
  );
}
