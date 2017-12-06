const passport = require("passport");
const express = require("express");

// eslint-disable-next-line
const passportConf = require("../passport");
const crud = require("./crud");
const auth = require("./auth");

const router = express.Router();

router.use("/api", auth);

// Placing here will make all the routes below needs to go through
// this middleware and hence needs authentication token.

router.use((req, res, next) => {
  passport.authenticate("jwt", { session: false })(req, res, next);
});

// All routes below this needs token for authentication.
router.use("/api", crud);

module.exports = router;
