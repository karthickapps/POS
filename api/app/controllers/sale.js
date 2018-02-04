const ObjectID = require("mongodb").ObjectID;
const knex = require("../../db/knex");

const {
  getJsonResponse,
  getJsonErrorResponse
} = require("../helpers/response_object");

module.exports = {
  getTransId: async (req, res) => {
    res.send(getJsonResponse({ transId: new ObjectID() }));
  }
};
