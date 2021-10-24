const express = require("express");
const router = express.Router();
const {
  registration,
  login,
  logout,
  current,
} = require("../../controllers/users");
const guard = require("../../helpers/guard");
const loginLimit = require("../../helpers/rate-limit-login");
const { validateSignUp, validateLogIn } = require("./validation");

router.post("/registration", validateSignUp, registration);
router.post("/login", validateLogIn, loginLimit, login);
router.post("/logout", guard, logout);
router.get("/current", guard, current);
module.exports = router;
