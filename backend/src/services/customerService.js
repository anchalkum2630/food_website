import prisma from '../config/prismaConfig.js';

export const getCustomerProfileService = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) throw new Error('User not found');
  return user;
};

export const updateCustomerProfileService = async (userId, data) => {
  const {
    name,
    phoneNo,
    gender,
    picUrl,
    address,
    addressCity,
    addressState,
    addressPincode,
  } = data;

  const fieldsToUpdate = {};
  if (name !== undefined) fieldsToUpdate.name = name;
  if (phoneNo !== undefined) fieldsToUpdate.phoneNo = phoneNo;
  if (gender !== undefined) fieldsToUpdate.gender = gender;
  if (picUrl !== undefined) fieldsToUpdate.picUrl = picUrl;
  if (address !== undefined) fieldsToUpdate.address = address;
  if (addressCity !== undefined) fieldsToUpdate.addressCity = addressCity;
  if (addressState !== undefined) fieldsToUpdate.addressState = addressState;
  if (addressPincode !== undefined) fieldsToUpdate.addressPincode = addressPincode;

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: fieldsToUpdate,
  });

  return updatedUser;
};
