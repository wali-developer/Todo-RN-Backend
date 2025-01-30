const { authController } = require("../controlers");

const router = require("express").Router();

// Authentication
router.post("/sign-up", authController.registerUser);
router.post("/sign-in", authController.loginUser);

module.exports = router;
