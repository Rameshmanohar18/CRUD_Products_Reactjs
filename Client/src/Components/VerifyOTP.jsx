import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyOTP, resendOTP, clearOTPState } from "../Features/Auth/authSlice.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function VerifyOTP() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { otpEmail, user, loading, error } = useSelector((state) => state.auth);

  // 6 individual digit inputs
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  // Countdown timer for resend (60 seconds)
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // If no email in state (user navigated here directly), send back to login
  useEffect(() => {
    if (!otpEmail) {
      navigate("/login");
    }
  }, [otpEmail, navigate]);

  // After OTP verified → go to dashboard
  useEffect(() => {
    if (user) {
      toast.success("Login successful 🎉", {
        position: "top-center",
        autoClose: 1000
      });
      navigate("/dashboard");
    }
  }, [user, navigate]);

  // Show backend error
  useEffect(() => {
    if (error) toast.error(error, { position: "top-center" });
  }, [error]);

  // Countdown timer
  useEffect(() => {
    if (countdown === 0) {
      setCanResend(true);
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  // ── Handle digit input ──────────────────────────────────────────
  const handleChange = (index, value) => {
    // Only allow single digit
    if (!/^\d?$/.test(value)) return;

    const updated = [...digits];
    updated[index] = value;
    setDigits(updated);

    // Auto-focus next box
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Backspace → clear current and move back
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const updated = [...digits];
    pasted.split("").forEach((char, i) => {
      updated[i] = char;
    });
    setDigits(updated);
    // Focus last filled box
    const lastIndex = Math.min(pasted.length, 5);
    inputRefs.current[lastIndex]?.focus();
  };

  // ── Submit ──────────────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();
    const otp = digits.join("");
    if (otp.length < 6) {
      toast.error("Enter the complete 6-digit OTP");
      return;
    }
    dispatch(verifyOTP({ email: otpEmail, otp }));
  };

  // ── Resend ──────────────────────────────────────────────────────
  const handleResend = () => {
    dispatch(resendOTP(otpEmail));
    setDigits(["", "", "", "", "", ""]);
    setCountdown(60);
    setCanResend(false);
    toast.info("OTP resent 📧", { position: "top-center" });
    inputRefs.current[0]?.focus();
  };

  // ── Back to login ───────────────────────────────────────────────
  const handleBack = () => {
    dispatch(clearOTPState());
    navigate("/login");
  };

  return (
    <div className="amazon-container">
      <form className="amazon-card" onSubmit={handleSubmit}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "8px" }}>
          <div style={{ fontSize: "40px", marginBottom: "8px" }}>📧</div>
          <h2 style={{ marginBottom: "6px" }}>Check your email</h2>
          <p style={{ fontSize: "13px", color: "#94a3b8", lineHeight: "1.5" }}>
            We sent a 6-digit OTP to<br />
            <strong style={{ color: "#e2e8f0" }}>{otpEmail}</strong>
          </p>
        </div>

        {/* OTP digit boxes */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            margin: "28px 0"
          }}
          onPaste={handlePaste}
        >
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputRefs.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              style={{
                width: "48px",
                height: "56px",
                textAlign: "center",
                fontSize: "22px",
                fontWeight: "700",
                borderRadius: "10px",
                border: digit ? "2px solid #6366f1" : "1px solid #334155",
                background: "#0f172a",
                color: "#f1f5f9",
                outline: "none",
                transition: "border-color 0.2s",
                caretColor: "#6366f1"
              }}
            />
          ))}
        </div>

        {/* Submit */}
        <button type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {/* Resend */}
        <div style={{ textAlign: "center", marginTop: "18px", fontSize: "13px", color: "#64748b" }}>
          {canResend ? (
            <span
              onClick={handleResend}
              style={{ color: "#6366f1", cursor: "pointer", fontWeight: "600" }}
            >
              Resend OTP
            </span>
          ) : (
            <span>Resend OTP in <strong style={{ color: "#e2e8f0" }}>{countdown}s</strong></span>
          )}
        </div>

        {/* Back */}
        <div style={{ textAlign: "center", marginTop: "14px" }}>
          <span
            onClick={handleBack}
            style={{ fontSize: "13px", color: "#6366f1", cursor: "pointer" }}
          >
            ← Back to Login
          </span>
        </div>

      </form>
    </div>
  );
}
