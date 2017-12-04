const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
// const LocalStrategy = require("passport-local").Strategy;
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

// LOCAL STRATEGY
// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: "id",
//     },
//     async (id, password, done) => {
//       const result = await knex
//         .select()
//         .from("users")
//         .where({
//           id,
//         });

//       if (!result || result.length === 0) {
//         return done(null, false);
//       }
//       return done("Something went wrong", false);
//     },
//   ),
// );
