import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useViewContext } from "../Context/Context_view";
// import { useViewContext } from './Context/Context_view';
const SignIn = () => {
  const navigate = useNavigate();
  const {setUserName,setUserPhone,setsearchUrl,UserPhone}=useViewContext(); 
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const newErrors = {};
    const phonePattern = /^\d{10}$/;

    if (!formData.phone || !phonePattern.test(formData.phone))
      newErrors.phone = 'Valid phone number is required (10 digits)';
    if (!formData.password || formData.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters long';

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const validationErrors = validate();
  if (Object.keys(validationErrors).length === 0) {
    try {
      console.log(formData)
      const response = await axios.post('http://localhost:3081/sign_in', formData);
      console.log('Form submitted successfully:', response.data);
      setUserName(response.data.name)
      setUserPhone(response.data.phone)
      console.log(response.data.name + response.data.phone)
      navigate('/');
    } catch (error) {
      console.error('Error submitting form:', error.response?.data || error.message);
      setErrors({ apiError: 'Something went wrong. Please try again.' });
    }
  } else {
    setErrors(validationErrors);
  }
};

  return (
    <div className="fixed inset-0 flex justify-center backdrop-blur-sm bg-opacity-50 top-6 bg-black">
      <div className="bg-white opacity-100 w-[80%] max-w-3xl h-[80vh] overflow-hidden mt-20 shadow-lg flex ">
        
          <img
          src="https://i.pinimg.com/736x/fb/fd/87/fbfd87d4563de51689b50210614d3568.jpg"
          alt="profilePic"
          className="w-[100%] h-[100%] bg-cover bg-center "
        />
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="mt-28 ">
      <div className="w-full max-w-md">
        {/* <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2> */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Phone Number Input */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-600 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full p-1 border text-sm rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              } focus:ring-yellow-500`}
              placeholder="Enter your phone number"
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full p-1 border rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } focus:ring-yellow-500`}
                placeholder="Enter your password"
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
              >
                {showPassword ? '👁️' : '🙈'}
              </span>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            <a href="/reset-password" className="text-gray-600 text-xs">Forgot Password?</a>
          </div>

          <button
            type="submit"
            className="w-full  bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            Submit
          </button>
        </form>
        <p className="text-gray-600 mt-6">Don't have an account yet? <a href="/register" className="text-blue-500 font-semibold">Register</a></p>
      </div>
    </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

// https://i.pinimg.com/736x/df/6f/a4/df6fa40267999c567d1c0c2718abcb3b.jpg