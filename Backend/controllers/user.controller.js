const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const blacklistTokenModel = require("../models/blacklist.model");

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    fullname: { firstname, lastname },
    email,
    password,
  } = req.body;

  const existingUser = await userModel.findOne({ email: email });
  if (existingUser) {
    return res
      .status(400)
      .json({ error: "User with this email already exists" });
  }

  const hashedPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
    firstname,
    lastname,
    email,
    password: hashedPassword,
  });

  const token = user.generateAuthToken();
  res.status(201).json({ token, user });
};

module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = user.generateAuthToken();
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV == "production",
    maxAge: 360000,
  });
  return res.status(200).json({ token, user });
};

module.exports.getUserProfile = async (req, res, next) => {
  res.status(200).json(req.user);
};

module.exports.updateUserProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstname, lastname } = req.body;
  const userId = req.user._id;

  try {
    const user = await userService.updateUserProfile({
      firstname,
      lastname,
      userId,
    });

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: `${err}` });
  }
};

module.exports.changePassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { oldPassword, newPassword } = req.body;
  const userId = req.user._id;

  if (!newPassword || !oldPassword) {
    return res.status(400).json({
      message: "Both old and new passwords are required to update password",
    });
  }

  try {
    const user = await userService.changePassword({
      userId,
      newPassword,
      oldPassword,
    });
    const userObj = user.toObject ? user.toObject() : user;
    delete userObj.password;

    return res.status(200).json({ user: userObj });
  } catch (err) {
    return res
      .status(400)
      .json({ message: err.message || "Password update failed" });
  }
};

module.exports.logoutUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  await blacklistTokenModel.create({ token });
  res.clearCookie("token");
  res.status(200).json({ message: "Loggout Out" });
};
