const captainModel = require("../models/captain.model");

module.exports.createCaptain = async ({
  firstname,
  lastname,
  email,
  password,
  color,
  plate,
  capacity,
  vehicleType,
}) => {
  if (
    !firstname ||
    !lastname ||
    !email ||
    !password ||
    !color ||
    !plate ||
    !capacity ||
    !vehicleType
  ) {
    throw new Error("All fields are required");
  }

  const captain = captainModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
    vehicle: {
      color,
      plate,
      capacity,
      vehicleType,
    },
  });

  return captain;
};

module.exports.updateProfile = async ({
  fullname: { firstname, lastname },
  vehicle: { color, plate, capacity, vehicleType },
  captainId,
}) => {
  if (!firstname || !lastname) {
    throw new Error("Both First and Last Name are required");
  }

  if (!color || !plate || !capacity || !vehicleType) {
    throw new Error("All Vehicle Details are necessary");
  }

  const isCaptain = await captainModel.findById(captainId);
  if (!isCaptain) {
    throw new Error("This Captain does not exist");
  }

  const captain = await captainModel.findOneAndUpdate(
    { _id: captainId },
    {
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      vehicle: {
        color: color,
        plate: plate,
        capacity: capacity,
        vehicleType: vehicleType,
      },
    },
    { new: true }
  );

  return captain;
};

module.exports.changePassword = async ({
  oldPassword,
  newPassword,
  captainId,
}) => {
  if (!captainId || !newPassword || !oldPassword) {
    throw new Error("All fields are required");
  }

  const captain = await captainModel.findById(captainId).select("+password");
  if (!captain) {
    throw new Error("Captain not found");
  }

  const isMatch = await captain.comparePassword(oldPassword);
  if (!isMatch) {
    throw new Error("Incorrect Password");
  }

  if (oldPassword === newPassword) {
    throw new Error("Old and New Password Cannot be Same");
  }

  captain.password = await captainModel.hashPassword(newPassword);
  await captain.save();

  return captain;
};
