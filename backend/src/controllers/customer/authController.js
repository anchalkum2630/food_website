// src/controllers/customer/authController.js
import { registerCustomer, verifyOtp } from '../../services/customer/customerService.js';

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await registerCustomer(email, password);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verify = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const response = await verifyOtp(email, otp);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
