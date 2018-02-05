const ObjectID = require("mongodb").ObjectID;
const knex = require("../../db/knex");
const tableNames = require("../../db/tableNames");

const {
  getJsonResponse,
  getJsonErrorResponse
} = require("../helpers/response_object");

module.exports = {
  getTransId: async (req, res) => {
    res.send(getJsonResponse({ transId: new ObjectID() }));
  },

  addItemToCart: async (req, res) => {
    try {
      const item = req.value.body;

      const newItem = {};
      newItem.id = item.transId;
      newItem.product_id = item.id;
      newItem.qty = item.qty;

      await knex(tableNames.transactions).insert(newItem);
      res.send(getJsonResponse({}));
    } catch (error) {
      res.send(getJsonErrorResponse("SC01", error.message));
    }
  },

  emptyCart: async (req, res) => {
    try {
      const transId = req.value.body.transId;

      const noOfRowsDeleted = await knex(tableNames.transactions)
        .where("id", "=", transId)
        .delete();
      res.send(getJsonResponse(noOfRowsDeleted));
    } catch (error) {
      console.log(error.message);
      res.send(getJsonErrorResponse("SC02", error.message));
    }
  }
};
