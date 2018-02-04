const router = require("express-promise-router")();

const { validateUserInfo } = require("./validate");

// controllers
const authController = require("../../controllers/auth");

router.post("/signin", validateUserInfo, authController.signin);

router.post("/signup", validateUserInfo, authController.signup);

module.exports = router;
