import {
  getCustomerProfileService,
  updateCustomerProfileService,
} from '../services/customerService.js';

export const getCustomerProfile = async (req, res) => {
  try {
    const profile = await getCustomerProfileService(req.user.id);
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateCustomerProfile = async (req, res) => {
  try {
    const updated = await updateCustomerProfileService(req.user.id, req.body);
    res.json({
      message: 'Profile updated successfully',
      user: updated,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
