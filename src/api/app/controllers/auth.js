const JWT = require("jsonwebtoken");

const knex = require("../../db/knex");
const { JWT_SECRET } = require("../configuration");

const signToken = (id, password) => {
  return JWT.sign(
    {
      iss: "Sfk",
      sub: id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
    },
    JWT_SECRET
  );
};

module.exports = {
  signup: async (req, res, next) => {
    const { id, password } = req.value.body;

    try {
      // gives no of rows here incase of sqlite3
      const noOfRows = await knex("users").insert({ id, password });

      const token = signToken(id, password);

      res.status(200).json({ token });
    } catch (err) {
      if (err.errno == 19) {
        res.send("Username already exists. Please use different name.");
      } else {
        res.send(
          "Got an error. Couldn't create the product. The error is " +
            JSON.stringify(err)
        );
      }
    }
  },

  signin: async (req, res, next) => {
    const { user_id, password } = req.value.body;

    res.send("Logged in");
  }
};
