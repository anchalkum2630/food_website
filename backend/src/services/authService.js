import prisma from '../config/prismaConfig.js'; // Assuming you're using Prisma as your ORM

export const findOrCreateUser = async (profile) => {
  const { id, emails, displayName ,photos } = profile;
  const email = emails[0].value;
  const image= photos ? photos[0].value : null;

  // Check if the user already exists with this email (from email/password login)
  let user = await prisma.User.findUnique({ where: { email } });

  if (!user) {
    // If user doesn't exist, create a new one
    user = await prisma.User.create({
      data: {
        email,
        name: displayName,
        picUrl:image,
        googleId: id, // Store the Google ID to link accounts
      },
    });
    const customer = await prisma.Customer.create({
    data: {
      user: {
        connect: { id: user.id },
      },
      // Add other customer-specific fields if needed
    },
  });
  } else if (user.googleId && user.googleId !== id) {
    // If user exists but is not linked to this Google account yet
    throw new Error('This email is already associated with another Google account');
  } else if (!user.googleId) {
    // If the user exists and is linked to email/password login, update them with the Google ID
    user = await prisma.User.update({
      where: { email },
      data: { googleId: id }, // Linking Google account with the existing user
    });
  }

  return user;
};

export const findUserById = async (id) => {
  return await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
};
