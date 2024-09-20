import axios from 'axios';
import React, { useState } from 'react';

const SignIn = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const validate = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{10}$/; // Adjust phone number pattern as needed

    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email || !emailPattern.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.phone || !phonePattern.test(formData.phone)) newErrors.phone = 'Valid phone number is required';
    if (!formData.password || formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters long';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:3081/register', formData, {
        headers: { 'Content-Type': 'application/json' }
      });
        setMessage(response.data.message);
        console.log(response.data.message);
        // console.log(response.data.token) // You might want to save this token in localStorage or context
        // localStorage.setItem('token', response.data.token);
      } catch (error) {
        if (error.response) {
          setMessage(error.response.data.message || 'An error occurred. Please try again.');
        } else {
          setMessage('An error occurred. Please try again.');
        }
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className='mt-20'>
    <div className="w-full max-w-md mx-auto p-6 bg-white shadow-md shadow-black rounded-lg my-10 ">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign In</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:ring-yellow-500`}
            placeholder="Enter your name"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-yellow-500`}
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:ring-yellow-500`}
            placeholder="Enter your phone number"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:ring-yellow-500`}
            placeholder="Enter your password"
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          Sign In
        </button>
        {message && <p className="text-green-500 text-xs mt-2">{message}</p>} {/* Display message */}
      </form>
    </div>
    </div>
  );
};

export default SignIn;
