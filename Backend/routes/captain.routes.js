const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const captainController = require("../controllers/captain.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be atleast 3 characters long"),
    body("fullname.lastname")
      .isLength({ min: 3 })
      .withMessage("Last name must be atleast 3 characters long"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be atleast 8 characters long"),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Color must be atleast 3 character long"),
    body("vehicle.plate")
      .isLength({ min: 10, max: 10 })
      .withMessage("Color must be exactly 10 characters long"),
    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Capacity must be atleast 1"),
    body("vehicle.vehicleType")
      .isIn(["car", "motorcycle", "auto"])
      .withMessage("Vehicle type must be either car, motorcycle or auto"),
  ],
  captainController.registerCaptain
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be atleast 8 characters long"),
  ],
  captainController.loginCaptain
);

router.get(
  "/profile",
  authMiddleware.authCaptain,
  captainController.getCaptainProfile
);

router.patch(
  "/profile",
  authMiddleware.authCaptain,
  body("fullname.firstname")
    .isLength({ min: 3 })
    .withMessage("First name must be atleast 3 characters long"),
  body("fullname.lastname")
    .isLength({ min: 3 })
    .withMessage("Last name must be atleast 3 characters long"),
  body("vehicle.color")
    .isLength({ min: 3 })
    .withMessage("Color must be atleast 3 character long"),
  body("vehicle.plate")
    .isLength({ min: 10, max: 10 })
    .withMessage("Color must be exactly 10 characters long"),
  body("vehicle.capacity")
    .isInt({ min: 1 })
    .withMessage("Capacity must be atleast 1"),
  body("vehicle.vehicleType")
    .isIn(["car", "motorcycle", "auto"])
    .withMessage("Vehicle type must be either car, motorcycle or auto"),
  captainController.updateProfile
);

router.patch(
  "/change-password",
  authMiddleware.authCaptain,
  body("oldPassword")
    .isLength({ min: 8 })
    .withMessage(
      "Old password is required and should be minimum 8 characters long"
    ),
  body("newPassword")
    .isLength({ min: 8 })
    .withMessage("New password must be at least 8 characters long"),
  captainController.changePassword
);

router.get(
  "/logout",
  authMiddleware.authCaptain,
  captainController.logoutCaptain
);

module.exports = router;
