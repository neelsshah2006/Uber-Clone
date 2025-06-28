const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/user.controller");
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
  ],
  userController.registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be atleast 8 characters long"),
  ],
  userController.loginUser
);

router.get("/profile", authMiddleware.authUser, userController.getUserProfile);

router.patch(
  "/profile",
  authMiddleware.authUser,
  body("firstname")
    .isLength({ min: 3 })
    .withMessage("First Name must be atleast 3 characters long"),
  body("lastname")
    .isLength({ min: 3 })
    .withMessage("Last Name must be atleast 3 characters long"),
  userController.updateUserProfile
);

router.patch(
  "/change-password",
  authMiddleware.authUser,
  body("oldPassword").isLength({ min: 8 }).withMessage("Old password is required and should be minimum 8 characters long"),
  body("newPassword")
    .isLength({ min: 8 })
    .withMessage("New password must be at least 8 characters long"),
  userController.changePassword
);

router.get("/logout", authMiddleware.authUser, userController.logoutUser);

module.exports = router;
