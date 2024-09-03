const express = require("express");
const router = express.Router();
const user_controller = require("./user.controller");

router.post("/signup", user_controller.createUser);
router.post("/login", user_controller.loginUser);
router.post("/otp-less", user_controller.sendOTP);

router.post("/verifyOTP-less", user_controller.verifyOTP);
router.post("/agents", user_controller.createAgent);


module.exports = router;
