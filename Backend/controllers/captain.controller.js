const { validationResult } = require("express-validator");
const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const blacklistTokenModel = require("../models/blacklist.model");

module.exports.registerCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    fullname: { firstname, lastname },
    email,
    password,
    vehicle: { color, plate, capacity, vehicleType },
  } = req.body;

  const existingCaptain = await captainModel.findOne({ email: email });
  if (existingCaptain) {
    return res
      .status(400)
      .json({ error: "Captain with this email already exists" });
  }

  const hashedPassword = await captainModel.hashPassword(password);

  const captain = await captainService.createCaptain({
    firstname,
    lastname,
    email,
    password: hashedPassword,
    color,
    plate,
    capacity,
    vehicleType,
  });

  const token = captain.generateAuthToken();
  res.status(201).json({ token, captain });
};

module.exports.loginCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const captain = await captainModel.findOne({ email }).select("+password");
  if (!captain) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await captain.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = captain.generateAuthToken();
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV == "production",
    maxAge: 360000,
  });
  res.status(200).json({ token, captain });
};

module.exports.getCaptainProfile = async (req, res, next) => {
  res.status(200).json(req.captain);
};

module.exports.updateProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    fullname: { firstname, lastname },
    vehicle: { color, plate, capacity, vehicleType },
  } = req.body;
  const captainId = req.captain._id;

  try {
    const captain = await captainService.updateProfile({
      fullname: { firstname, lastname },
      vehicle: { color, plate, capacity, vehicleType },
      captainId,
    });
    return res.status(200).json(captain);
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
  const captainId = req.captain._id;

  if (!newPassword || !oldPassword) {
    return res.status(400).json({
      message: "Both old and new passwords are required to update password",
    });
  }

  try {
    const captain = await captainService.changePassword({
      oldPassword,
      newPassword,
      captainId,
    });

    const captainObj = captain.toObject ? captain.toObject() : captain;
    delete captainObj.password;

    return res.status(200).json({ captain: captainObj });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Password update failed" });
  }
};

module.exports.logoutCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  await blacklistTokenModel.create({ token });
  res.clearCookie("token");
  res.status(200).json({ message: "Loggout Out" });
};
