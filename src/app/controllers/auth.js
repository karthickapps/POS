const JWT = require("jsonwebtoken");

const knex = require("../../db/knex");
const { JWT_SECRET } = require("../configuration");

const signToken = id =>
  JWT.sign(
    {
      iss: "Sfk",
      sub: id,
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

      res.status(200).json({ token });
    } catch (err) {
      if (err.errno === 19) {
        res.send("Username already exists. Please use different name.");
      } else {
        res.send(
          `Got an error. Couldn't create the user. The error is ${JSON.stringify(
            err,
          )}`,
        );
      }
    }
  },

  signin: async (req, res) => {
    // eslint-disable-next-line
    const { id, password } = req.value.body;
    let user = [];

    const sendFailureResponse = () => res.status(200).json({ 
      token: "", 
      status: "Server error please try again later.", 
      errorCode: "AUT02"
    });

    try {
      user = await knex
        .select()
        .from("users")
        .where({ id, password });
    } catch (err) {
      return sendFailureResponse();
    };

    if (user.length !== 1) {
      return sendFailureResponse();
    }

    const token = signToken(id);

    return res.status(200).json({ 
      token, 
      status: "SUCCESS", 
      errorCode: "0"
    });
  },
};
