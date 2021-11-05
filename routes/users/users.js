const express = require("express");
const router = express.Router();
const {
  registration,
  login,
  logout,
  current,
  uploadAvatar,
} = require("../../controllers/users");
const guard = require("../../helpers/guard");
const loginLimit = require("../../helpers/rate-limit-login");
const { validateSignUp, validateLogIn } = require("./validation");
const upload = require("../../helpers/uploads");

router.post("/registration", validateSignUp, registration);
router.post("/login", validateLogIn, loginLimit, login);
router.post("/logout", guard, logout);
router.get("/current", guard, current);
router.patch("/avatar", guard, upload.single("avatar"), uploadAvatar);
module.exports = router;
