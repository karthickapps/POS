const router = require("express-promise-router")();

const { validateUserInfo, schemas } = require("../helpers/validate");

// controllers
const authController = require("../controllers/auth");

router.post("/signin", validateUserInfo(schemas.authSchema), authController.signin);

router.post("/signup", validateUserInfo(schemas.authSchema), authController.signup);

module.exports = router;
