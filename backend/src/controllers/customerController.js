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
    const profileData = {
      ...req.body,
      // If file is uploaded, add picUrl from Cloudinary
      picUrl: req.file?.path,
    };
    // console.log(profileData)

    const updated = await updateCustomerProfileService(req.user.id, profileData);
    // console.log("updated :  ")
    // console.log(updated)
    res.json({
      message: 'Profile updated successfully',
      user: updated,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
