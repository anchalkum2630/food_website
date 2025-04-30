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
    country,
    address,
    addressCity,
    addressState,
    addressPincode,
  } = data;
  // console.log(data)
  const fieldsToUpdate = {};
  if (name !== undefined) fieldsToUpdate.name = name;
  if (phoneNo !== undefined) fieldsToUpdate.phoneNo = phoneNo;
  if (gender !== undefined) fieldsToUpdate.gender = gender;
  if (picUrl !== undefined) fieldsToUpdate.picUrl = picUrl;
  if (country !== undefined) fieldsToUpdate.country = country;
  if (address !== undefined) fieldsToUpdate.address = address;
  if (addressCity !== undefined) fieldsToUpdate.addressCity = addressCity;
  if (addressState !== undefined) fieldsToUpdate.addressState = addressState;
  if (addressPincode !== undefined) fieldsToUpdate.addressPincode = addressPincode;
  // console.log("field update:   ");
  // console.log(fieldsToUpdate)
  const updatedUser = await prisma.User.update({
    where: { id: userId },
    data: fieldsToUpdate,
  });

  return updatedUser;
};
