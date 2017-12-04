const passport = require("passport");
const express = require("express");

// eslint-disable-next-line
const passportConf = require("../passport");
const products = require("./products");
const auth = require("./auth");

const router = express.Router();

router.use("/api", auth);

// Placing here will make all the routes below needs to go through
// this middleware and hence needs authentication token.

router.use((req, res, next) => {
  console.log("Authentication middleware");
  passport.authenticate("jwt", { session: false })(req, res, next);
});

router.use("/api", products);

module.exports = router;
