import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    gender: '',
    password: '',
    // created: new Date().toISOString(),
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const newErrors = {};
    const phonePattern = /^\d{10}$/;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!formData.name || formData.name.trim() === '')
      newErrors.name = 'First name is required';
    if (!formData.phone || !phonePattern.test(formData.phone))
      newErrors.phone = 'Valid phone number is required (10 digits)';
    if (!formData.email || !emailPattern.test(formData.email))
      newErrors.email = 'Please enter a valid email address';
    if (!formData.password || formData.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters long';
    if (!formData.gender)
      newErrors.gender = 'Gender is required';

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

const handleSubmit = async (e) => {
  e.preventDefault();
  const validationErrors = validate();
  if (Object.keys(validationErrors).length === 0) {
    try {
      console.log(formData)
      const response = await axios.post('http://localhost:3081/register', formData);
      console.log('Form submitted successfully:', response.data);
      navigate('/SignIn');
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
            <div className="mt-40 ">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-1">
          
          {/* First Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-1 border text-sm rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                errors.firstName ? 'border-red-500' : 'border-gray-300'
              } focus:ring-yellow-500`}
              placeholder="Enter your first name"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

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

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-1 border text-sm rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } focus:ring-yellow-500`}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Gender Input */}
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-600 mb-1">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`w-full p-1 text-gray-400 border text-sm rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                errors.gender ? 'border-red-500' : 'border-gray-300'
              } focus:ring-yellow-500`}
            >
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <div className="relative mb-5">
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
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            Register
          </button>
        </form>
        <p className="text-gray-600 mt-6">Already have an account? <a href="/SignIn" className="text-blue-500 font-semibold">Login</a></p>
      </div>
    </div>
        </div>
      </div>
    </div>
  )
}

export default Register;
