import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Features/Auth/authSlice.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [isValid, setIsValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Simple validation
  useEffect(() => {
    if (form.email && form.password.length >= 6) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [form]);




  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) {
      toast.error("Enter valid credentials ❌");
      return;
    }
    dispatch(loginUser(form));
  };

  // ✅ Listen for login success
  useEffect(() => {
    if (user) {
      toast.success("Login successful 🎉");

      setTimeout(() => {
        navigate("/dashboard");
      }, 2500);
    }
  }, [user, navigate]);

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
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        {/* PASSWORD */}
        <label>Password</label>
        <div className="password-box">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
          <span onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <button type="submit" disabled={!isValid}>
          Sign-In
        </button>

        <p className="terms">
          By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.
        </p>
        

      </form>
    </div>
  );
}