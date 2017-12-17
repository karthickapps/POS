const JWT = require("jsonwebtoken");

const knex = require("../../db/knex");
const { JWT_SECRET } = require("../configuration");

const {
  getJsonResponse,
  getJsonErrorResponse,
} = require("../helpers/response_object");

const signToken = id =>
  JWT.sign(
    {
      iss: "Sfk",
      sub: id,
      id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1), // current time + 1 day ahead
    },
    JWT_SECRET,
  );

module.exports = {
  signup: async (req, res) => {
    const { id, password } = req.value.body;

    try {
      // gives no of rows here incase of sqlite3
      await knex("users").insert({ id, password });

      const token = signToken(id);

      res.send(getJsonResponse({ token }));
    } catch (err) {
      if (err.errno === 19) {
        const errorResponse = getJsonErrorResponse(
          "CA01",
          "Username already exists. Please use different name.",
        );
        res.send(errorResponse);
      } else {
        const errorResponse = getJsonErrorResponse(
          "CA01-B",
          "Internal error plase try after sometime.",
        );
        res.send(errorResponse);
      }
    }
  },

  signin: async (req, res) => {
    // eslint-disable-next-line
    const { id, password } = req.value.body;
    let user = [];

    try {
      user = await knex
        .select()
        .from("users")
        .where({ id, password });
    } catch (err) {
      const errorResponse = getJsonErrorResponse(
        "CA02-A",
        "Internal error plase try after sometime.",
      );
      return res.send(errorResponse);
    }

    if (user.length !== 1) {
      const errorResponse = getJsonErrorResponse(
        "CA02-B",
        "Invalid credentials. Please try again",
      );
      return res.send(errorResponse);
    }

    const token = signToken(id);

    return res.send(getJsonResponse({ token }));
  },
};
