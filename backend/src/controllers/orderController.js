import { getSavedRecipes, prepareEmailOptions, sendOrderEmails } from '../services/orderService.js';

export const order = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1. Fetch saved recipes
    const savedRecipes = await getSavedRecipes(userId);

    // 2. Prepare email options
    const { userMailOptions, chefMailOptions } = prepareEmailOptions(req.user, savedRecipes);

    // 3. Send emails
    await sendOrderEmails(userMailOptions, chefMailOptions);

    res.json({ message: 'Order placed and emails sent successfully!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: err.message || 'Failed to place order' });
  }
};
