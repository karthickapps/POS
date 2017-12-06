const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");

const knex = require("../db/knex");
const { JWT_SECRET } = require("./configuration");

// JSON WEB TOKENS STRATEGY
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      secretOrKey: JWT_SECRET,
    },
    async (payload, done) => {
      try {
        const result = await knex
          .select()
          .from("users")
          .where({
            id: payload.sub,
          });

        if (!result || result.length === 0) {
          return done(null, false);
        }

        return done(null, result[0]);
      } catch (err) {
        return done(err, false);
      }
    },
  ),
);
