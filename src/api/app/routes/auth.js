const express = require("express");
const router = require("express-promise-router")();

const { validateBody, schemas } = require("../helpers/routeHelpers");

// controllers
const authController = require("../controllers/auth");

router.post("/signin", validateBody(schemas.authSchema), authController.signin);

router.post("/signup", validateBody(schemas.authSchema), authController.signup);

module.exports = router;
