import prisma from '../config/prismaConfig.js';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Fetch saved recipes for a user
 * @param {number} userId
 * @returns {Array} savedRecipes
 */
export const getSavedRecipes = async (userId) => {
  const savedRecipes = await prisma.savedRecipe.findMany({
    where: { userId },
    include: { recipe: true },
  });

  if (!savedRecipes.length) {
    throw new Error('No saved recipes found for this user');
  }

  return savedRecipes;
};

/**
 * Prepare email content for user and chef
 * @param {Object} user
 * @param {Array} savedRecipes
 * @returns {Object} { userMailOptions, chefMailOptions }
 */
export const prepareEmailOptions = (user, savedRecipes) => {
  const recipeNames = savedRecipes.map(r => r.recipe.name).join(', ');

  const userDetails = `
Name: ${user.name}
Email: ${user.email}
Phone: ${user.phoneNo || 'N/A'}
Address: ${user.address || 'N/A'}, ${user.addressCity || ''}, ${user.addressState || ''}, ${user.addressPincode || ''}
Country: ${user.country || 'N/A'}
`;

  const userMailOptions = {
    from: `"YumRecipe" <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: 'Your Food Order Confirmation',
    text: `Hello ${user.name},\n\nThank you for your order! Here are the recipes you ordered:\n\n${recipeNames}\n\nYour details:\n${userDetails}\n\nRegards,\nYumRecipe Team`,
  };

  const chefMailOptions = {
    from: `"YumRecipe" <${process.env.EMAIL_USER}>`,
    to: 'anchalkum2630@gmail.com',
    subject: 'New Order Assigned',
    text: `Hello Chef,\n\nA new order has been placed by ${user.name}.\n\nRecipes:\n${recipeNames}\n\nCustomer details:\n${userDetails}\n\nPlease start preparing the order.\n\nRegards,\nYumRecipe Team`,
  };
  console.log(userMailOptions)

  return { userMailOptions, chefMailOptions };
};

/**
 * Send emails to user and chef
 * @param {Object} userMailOptions
 * @param {Object} chefMailOptions
 */
export const sendOrderEmails = async (userMailOptions, chefMailOptions) => {
  await Promise.all([
    transporter.sendMail(userMailOptions),
    transporter.sendMail(chefMailOptions),
  ]);
};
