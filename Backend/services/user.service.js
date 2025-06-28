const userModel = require("../models/user.model");

module.exports.createUser = async ({
  firstname,
  lastname,
  email,
  password,
}) => {
  if (!firstname || !lastname || !email || !password) {
    throw new Error("All fields are required");
  }

  const user = userModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
  });

  return user;
};

module.exports.updateUserProfile = async ({ firstname, lastname, userId }) => {
  if (!firstname || !lastname) {
    throw new Error("First and last name are required");
  }

  const isUser = await userModel.findById(userId);
  if (!isUser) {
    throw new Error("This User does not exist");
  }

  const user = await userModel.findOneAndUpdate(
    { _id: userId },
    {
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
    },
    { new: true }
  );

  return user;
};

module.exports.changePassword = async ({
  userId,
  newPassword,
  oldPassword,
}) => {
  if (!userId || !newPassword || !oldPassword) {
    throw new Error("All fields are required");
  }

  const user = await userModel.findById(userId).select("+password");
  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await user.comparePassword(oldPassword);
  if (!isMatch) {
    throw new Error("Incorrect Password");
  }

  if (oldPassword === newPassword) {
    throw new Error("Old and New Password Cannot be Same");
  }

  user.password = await userModel.hashPassword(newPassword);
  await user.save();

  return user;
};
