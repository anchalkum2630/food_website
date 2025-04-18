import { registerUser, verifyUser, insertPassword, loginUser } from '../../services/customer/customerService.js';

const register = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }
  const response = await registerUser(email);
  res.status(200).json(response);
};

const verify = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required' });
  }
  const response = await verifyUser(email, otp);
  if (response.message === 'OTP verified successfully. Proceed to set your password.') {
    res.status(200).json(response);
  } else {
    res.status(400).json(response);
  }
};

const setPassword = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  const response = await insertPassword(email, password);
  res.status(201).json(response);
};


const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const response = await loginUser(email, password);
    res.status(200).json(response);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export { register, verify, setPassword,login };
