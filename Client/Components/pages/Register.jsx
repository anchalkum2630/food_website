import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1); // 1: email, 2: otp, 3: password
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Step 1: Send OTP
  const handleSendOtp = async () => {
  const newErrors = {};
  if (!role) newErrors.role = "Please select a role";
  if (!validateEmail(email)) newErrors.email = "Enter a valid email";
  setErrors(newErrors);
  if (Object.keys(newErrors).length > 0) return;

  try {
    // Check if email already exists by calling the register API
    const registerApi =
      role === "chef"
        ? "http://localhost:5000/customer/register"
        : "http://localhost:5000/api/customer/register";

    const response = await axios.post(registerApi, { email });

    // Assuming the response contains a field `emailExists` that indicates if email already exists
    if (!response.data.success) {
      alert("Email already exists. Please try with a different email.");
      console.log(response);
      return; // Stop further execution
    }

    console.log(response);
    setStep(2); // Move to OTP verification step

  } catch (error) {
    setErrors({ apiError: "Failed to send OTP" });
    console.error(error);
  }
};


  // Step 2: Verify OTP
  const handleVerifyOtp = async () => {
    const newErrors = {};
    if (otp.trim().length === 0) newErrors.otp = "Enter the OTP";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      // Call the verify OTP API
      const verifyOtpApi =
        role === "chef"
          ? "http://localhost:5000/customer/verify-otp"
          : "http://localhost:5000/api/customer/verify-otp";
      await axios.post(verifyOtpApi, { email, otp });
      setStep(3); // Move to password set step
    } catch (error) {
      setErrors({ apiError: "Failed to verify OTP" });
    }
  };

  // Step 3: Set Password
  const handleRegister = async () => {
    const newErrors = {};
    if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      // Call the set password API
      const setPasswordApi =
        role === "chef"
          ? "http://localhost:5000/customer/set-password"
          : "http://localhost:5000/api/customer/set-password";
      await axios.post(setPasswordApi, { email, password });
      navigate("/SignIn"); // Navigate to login page
    } catch (error) {
      setErrors({ apiError: "Registration failed" });
    }
  };

  // Step 4: Google Sign-In
 const handleGoogleSignIn = () => {
  const newErrors = {};

  if (!role) {
    newErrors.role = "Please select a role";
    setErrors(newErrors); // assuming you have a state to show the error
    return; // ⛔ stop execution here
  }

  // ✅ role is selected, proceed to redirect
  window.location.href = "http://localhost:5000/api/auth/google";
};




  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex flex-col sm:flex-row w-[90%] lg:w-[70%] h-auto lg:h-[70%] mt-10 bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Left Side */}
        <div className="hidden sm:flex w-1/2 bg-green-700 flex-col items-center justify-center text-gray-100 text-center p-8">
          <h1 className="text-4xl font-bold mb-4">Join YumRecipe!</h1>
          <p className="text-lg">
            Register to explore, cook, or get cooked for – your culinary journey starts now!
          </p>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8">
          <h1 className="text-3xl text-green-600 font-bold text-center mb-4">
            Register
          </h1>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-green-700 mb-1">
                Select Role
              </label>
              <div className="flex gap-6">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="role"
                    value="customer"
                    checked={role === "customer"}
                    onChange={(e) => setRole(e.target.value)}
                    className="accent-green-600"
                  />
                  <span>Customer</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="role"
                    value="chef"
                    checked={role === "chef"}
                    onChange={(e) => setRole(e.target.value)}
                    className="accent-green-600"
                  />
                  <span>Chef</span>
                </label>
              </div>
              {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-green-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full p-2 border text-sm rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:ring-green-400`}
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Send OTP Button */}
            {step === 1 && (
              <div className="flex justify-center">
                <button
                  onClick={handleSendOtp}
                  className="w-full bg-green-600 text-white font-semibold rounded-md shadow-sm p-1 hover:bg-green-900"
                >
                  Send OTP
                </button>
              </div>
            )}

            {/* OTP Input */}
            {step === 2 && (
              <div>
                <label className="block text-sm font-medium text-green-700 mb-1">OTP</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className={`w-full p-2 border text-sm rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                    errors.otp ? "border-red-500" : "border-gray-300"
                  } focus:ring-green-400`}
                  placeholder="Enter the OTP"
                />
                {errors.otp && <p className="text-red-500 text-xs mt-1">{errors.otp}</p>}
                <div className="flex justify-center mt-2">
                  <button
                    onClick={handleVerifyOtp}
                    className="w-full bg-green-600 text-white font-semibold rounded-md shadow-sm p-1 hover:bg-green-900"
                  >
                    Verify OTP
                  </button>
                </div>
              </div>
            )}

            {/* Password Input */}
            {step === 3 && (
              <div>
                <label className="block text-sm font-medium text-green-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full p-2 border text-sm rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } focus:ring-green-400`}
                    placeholder="Create a password"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-green-700"
                  >
                    {showPassword ? "👁️" : "🙈"}
                  </span>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                <div className="flex justify-center">
                  <button
                    onClick={handleRegister}
                    className="w-full bg-green-600 text-white font-semibold rounded-md shadow-sm p-1 hover:bg-green-900"
                  >
                    Register
                  </button>
                </div>
              </div>
            )}
          </form>

          {/* Google Sign-Up */}
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              className="w-full bg-white text-gray-700 font-semibold border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 flex items-center justify-center gap-2 p-1"
              onClick={handleGoogleSignIn}
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Sign up with Google
            </button>
          </div>

          {/* Sign In Link */}
          <p className="text-gray-400 mt-4 text-center">
            Already have an account?{" "}
            <a href="/SignIn" className="text-green-500 font-semibold">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
