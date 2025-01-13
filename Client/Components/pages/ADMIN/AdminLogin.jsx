import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [timer, setTimer] = useState(120);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const navigate = useNavigate();

  // Function to start or restart the timer
  const startTimer = () => {
    if (intervalId) {
      clearInterval(intervalId); // Clear any existing interval before starting a new one
    }

    const newIntervalId = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime === 1) {
          clearInterval(newIntervalId); // Stop timer when it reaches 0
          setIsTimerActive(false); // Disable further actions once timer ends
        }
        return prevTime - 1;
      });
    }, 1000);

    setIntervalId(newIntervalId);
    setIsTimerActive(true);
  };

  // Function to handle sending the OTP
  const sendOtp = async () => {
    try {
      const response = await axios.post('http://localhost:3081/send-otp', { email });
      if (response.status === 200) {
        setOtpSent(true);
        setOtp('');
        startTimer();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  // Function to handle submitting the OTP
  const submitOtp = async () => {
    try {
      const response = await axios.post('http://localhost:3081/verify-otp', { email, otp });
      if (response.status === 200) {
        setIsVerified(true);
        alert('OTP Verified');
        navigate('/admin/homepage');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  // Function to handle resending the OTP
  const resendOtp = () => {
    setTimer(120); // Reset the timer to 2 minutes
    sendOtp(); // Send the OTP and restart the timer
  };

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return (
    <div className="mt-20 p-4 max-w-sm mx-auto border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-center mb-4">Admin Login</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter your email"
          />
        </div>

        {!otpSent ? (
          <button
            onClick={sendOtp}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md mt-4"
          >
            Send OTP
          </button>
        ) : (
          <div>
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">OTP</label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter OTP"
              />
            </div>
            <button
              onClick={submitOtp}
              className="w-full py-2 px-4 bg-green-600 text-white rounded-md mt-4"
            >
              Submit
            </button>
            <div className="mt-4 text-center">
              {isTimerActive && (
                <p className="text-red-500">
                  Time remaining: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                </p>
              )}
              {!isTimerActive && (
                <p className="text-red-500">OTP expired. Please request a new OTP.</p>
              )}
            </div>
            <div className="text-center mt-4">
              <button
                onClick={resendOtp}
                className="text-blue-500 hover:underline"
                disabled={isTimerActive}
              >
                Resend OTP
              </button>
            </div>
          </div>
        )}
      </div>

      {isVerified && <p className="text-center text-green-500 mt-4">OTP Verified! You can now proceed.</p>}
    </div>
  );
};

export default AdminLogin;
