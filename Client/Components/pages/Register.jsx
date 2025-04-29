import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSendOtp = async () => {
    const newErrors = {};
    if (!role) newErrors.role = "Please select a role";
    if (!validateEmail(email)) newErrors.email = "Enter a valid email";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const registerApi =
        role === "chef"
          ? "http://localhost:5000/customer/register"
          : "http://localhost:5000/api/auth/customer/register";

      const response = await axios.post(registerApi, { email });

      if (!response.data.success) {
        toast.error("Email already exists. Please try with a different email.");
        return;
      }

      toast.success("OTP sent successfully to your email.");
      setStep(2);
    } catch (error) {
      setErrors({ apiError: "Failed to send OTP" });
      toast.error("Failed to send OTP. Please try again.");
      console.error(error);
    }
  };

  const handleVerifyOtp = async () => {
    const newErrors = {};
    if (otp.trim().length === 0) newErrors.otp = "Enter the OTP";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const verifyOtpApi =
        role === "chef"
          ? "http://localhost:5000/customer/verify-otp"
          : "http://localhost:5000/api/auth/customer/verify-otp";
      await axios.post(verifyOtpApi, { email, otp });
      toast.success("OTP verified successfully.");
      setStep(3);
    } catch (error) {
      setErrors({ apiError: "Failed to verify OTP" });
      toast.error("Invalid OTP. Please try again.");
      console.error(error);
    }
  };

  const handleRegister = async () => {
    const newErrors = {};
    if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const setPasswordApi =
        role === "chef"
          ? "http://localhost:5000/customer/set-password"
          : "http://localhost:5000/api/auth/customer/set-password";
      await axios.post(setPasswordApi, { email, password, role });
      toast.success("Registration successful! Redirecting to Sign In.");
      setTimeout(() => navigate("/SignIn"),2000);
    } catch (error) {
      setErrors({ apiError: "Registration failed" });
      toast.error("Failed to complete registration. Please try again.");
      console.error(error);
    }
  };

  const handleGoogleSignIn = () => {
    const newErrors = {};
    if (!role) {
      newErrors.role = "Please select a role";
      setErrors(newErrors);
      toast.error("Please select a role before signing up with Google.");
      return;
    }
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <ToastContainer />
      <div className="flex flex-col sm:flex-row w-[90%] lg:w-[70%] h-auto lg:h-[70%] mt-10 bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="hidden sm:flex w-1/2 bg-green-700 flex-col items-center justify-center text-gray-100 text-center p-8">
          <h1 className="text-4xl font-bold mb-4">Join YumRecipe!</h1>
          <p className="text-lg">
            Register to explore, cook, or get cooked for – your culinary journey starts now!
          </p>
        </div>

        <div className="w-full lg:w-1/2 p-4 sm:p-8">
          <h1 className="text-3xl text-green-600 font-bold text-center mb-4">Register</h1>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
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
