const express = require("express");
const { check } = require("express-validator");

const { fileUpload } = require("../middleware/fileUpload");
const {
  getUsers,
  createUser,
  loginUser,
} = require("../controllers/users.controller");

const router = express.Router();

router.get("/", getUsers);

router.post(
  "/signup",
  fileUpload.single("image"),
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  createUser,
);

router.post("/login", loginUser);

module.exports = router;
