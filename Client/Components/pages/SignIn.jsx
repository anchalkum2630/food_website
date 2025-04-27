import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useViewContext } from "../Context/Context_view";

const SignIn = () => {
  const navigate = useNavigate();
  const { setUserName, FetchSavedRecipe } = useViewContext();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [role, setRole] = useState(""); // Role must be selected
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email || !emailPattern.test(formData.email)) {
      newErrors.email = "Valid email is required";
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }
    if (!role) {
      newErrors.role = "Please select a role (Customer or Chef)";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      try {
        const apiUrl =
          role === "chef"
            ? "http://localhost:3081/sign_in_chef"
            : "http://localhost:5000/api/customer/login";

        const response = await axios.post(apiUrl, formData, {
          withCredentials: true,
        });
        localStorage.setItem("accessToken", response.data.token);
        FetchSavedRecipe();
        navigate("/");
      } catch (error) {
        console.error(
          "Error submitting form:",
          error.response?.data || error.message
        );
        setErrors({
          apiError: "Something went wrong. Please try again.",
        });
      }
    } else {
      setErrors(validationErrors);
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
          <h1 className="text-4xl font-bold mb-4">Welcome to YumRecipe!</h1>
          <p className="text-lg">
            Discover delicious recipes, call top chefs, and enjoy an
            unforgettable culinary experience.
          </p>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8">
          <h1 className="text-3xl text-green-600 font-bold text-center mb-4">
            Login
          </h1>

          <form onSubmit={handleSubmit} className="space-y-2">
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
              {errors.role && (
                <p className="text-red-500 text-xs mt-1">{errors.role}</p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-green-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-2 border text-sm rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:ring-green-400`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-green-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } focus:ring-green-400`}
                  placeholder="Enter your password"
                />
                <span
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-green-700"
                >
                  {showPassword ? "👁️" : "🙈"}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password}
                </p>
              )}
              <a href="/reset-password" className="text-gray-500 text-xs">
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-[100%] bg-green-600 text-white font-semibold rounded-md shadow-sm p-1 hover:bg-green-900"
              >
                Submit
              </button>
            </div>
          </form>

          {/* Google Sign-In */}
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              className="w-[100%] bg-white text-gray-700 font-semibold border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 flex items-center justify-center gap-2 p-1"
              onClick={handleGoogleSignIn}
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Sign in with Google
            </button>
          </div>

          {/* Register Link */}
          <p className="text-gray-400 mt-4 text-center">
            Don't have an account yet?{" "}
            <a href="/register" className="text-green-500 font-semibold">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
