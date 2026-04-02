import { useDispatch } from "react-redux";
import { register } from "../Features/Auth/authSlice.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";



export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ✅ Regex rules
  const regex = {
    name: /^[A-Za-z ]{3,30}$/,
    username: /^[a-zA-Z0-9_]{4,25}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/
  };

  // ✅ Validation function
  const validate = (formData) => {
    let newErrors = {};

    if (!regex.name.test(formData.name)) {
      newErrors.name = "Enter valid name (min 3 letters)";
    }

    if (!regex.username.test(formData.username)) {
      newErrors.username = "Username must be 4-15 chars";
    }

    if (!regex.email.test(formData.email)) {
      newErrors.email = "Invalid email";
    }

    if (!regex.password.test(formData.password)) {
      newErrors.password =
        "Password must have uppercase, lowercase, number";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ✅ Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);

    const valid = validate(updatedForm);
    setIsValid(valid);
  };

  // ✅ Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate(form)) {
      toast.error("Fix errors before submitting ❌");
      return;
    }

    const { ...userData } = form;

    dispatch(register(userData));
    console.log("🐷 dispatch", dispatch);
    console.log("🥘 userData", userData);
    console.log("Submitting...");

    toast.info("Account created successfully 🎉");

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="amazon-container">
      <form className="amazon-card" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        {/* NAME */}
        <label>Your Name</label>
        <input
          name="name"
          placeholder="First and last name"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <p className="error">{errors.name}</p>}

        {/* USERNAME */}
        <label>Username</label>
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />
        {errors.username && <p className="error">{errors.username}</p>}

        {/* EMAIL */}
        <label>Email</label>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        {/* PASSWORD */}
        <label>Password</label>
        <div className="password-box">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="At least 6 characters"
            value={form.password}
            onChange={handleChange}
          />
          <span onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>
        {errors.password && <p className="error">{errors.password}</p>}

        {/* CONFIRM PASSWORD */}
        <label>Re-enter password</label>
        <div className="password-box">
          <input
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm password"
            value={form.confirmPassword}
            onChange={handleChange}
          />
          <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? "🙈" : "👁️"}
          </span>
        </div>
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword}</p>
        )}

        <button type="submit" disabled={!isValid}>
          Create your Amazon account
        </button>

        <p className="terms">
          By creating an account, you agree to our Conditions of Use and Privacy Notice.
        </p>
        <p>Already have an account? <Link to ="/login">   Login here </Link>  </p>
      </form>
    </div>
  );
}