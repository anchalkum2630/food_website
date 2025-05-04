import prisma from '../config/prismaConfig.js';

export const getCustomerProfileService = async (userId) => {
  const user = await prisma.User.findUnique({
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
    country,
    address,
    addressCity,
    addressState,
    addressPincode,
  } = data;

  // console.log("customer data: ", data);

  // Convert string "null"/"undefined" to actual null
  const sanitizeValue = (val) =>
    val === 'null' || val === 'undefined' ? null : val;

  const fieldsToUpdate = {};
  if (name !== undefined) fieldsToUpdate.name = sanitizeValue(name);
  if (phoneNo !== undefined) fieldsToUpdate.phoneNo = sanitizeValue(phoneNo);
  if (gender !== undefined) fieldsToUpdate.gender = sanitizeValue(gender);
  if (picUrl !== undefined) fieldsToUpdate.picUrl = sanitizeValue(picUrl);
  if (country !== undefined) fieldsToUpdate.country = sanitizeValue(country);
  if (address !== undefined) fieldsToUpdate.address = sanitizeValue(address);
  if (addressCity !== undefined) fieldsToUpdate.addressCity = sanitizeValue(addressCity);
  if (addressState !== undefined) fieldsToUpdate.addressState = sanitizeValue(addressState);
  if (addressPincode !== undefined) fieldsToUpdate.addressPincode = sanitizeValue(addressPincode);

  // console.log("fields to update: ", fieldsToUpdate);

  const updatedUser = await prisma.User.update({
    where: { id: userId },
    data: fieldsToUpdate,
  });

  return updatedUser;
};
