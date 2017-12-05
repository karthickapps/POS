const knex = require("../../db/knex");

const { getJsonResponse, getJsonErrorResponse, FAILED, SUCCESS } = require("../helpers/response_object");

module.exports = {
  getAllProducts: async (req, res) => {
    try {
      const products = await  knex
        .select()
        .from("products");
      res.send(getJsonResponse(products));
    } catch (err) {
      res.send(getJsonErrorResponse("CP01"));
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const noOfRowsDeleted = await knex("products")
        .where("id", "=", req.params.id)
        .delete();
      res.send(getJsonResponse(noOfRowsDeleted));
    } catch (err) {
      res.send(getJsonErrorResponse("CP02"));
    }      
  },
  getProductById: async (req, res) => {
    try {
      const product = await knex
        .select()
        .from("products")
        .where({
          id: req.params.id,
        });
      res.send(getJsonResponse(product));
    } catch (err) {
      res.send(getJsonErrorResponse("CP03"));
    }
  },
  createProduct: async (req, res) => {
    const product = req.body;

    try {
      await knex("products")
        .insert(product);

      const result = await knex("products")
        .count('id as rows');

      const noOfRowsAvailable = result[0].rows;

      res.send(getJsonResponse(noOfRowsAvailable))
    } catch (err) {
      res.send(getJsonErrorResponse("CP04"));
    }
  },
  updateProduct: async (req, res) => {
    const product = req.body;
    
    try {
      const noOfRowsAffected = await knex("products")
        .where("id", "=", req.params.id)
        .update(product);
      res.send(getJsonResponse(noOfRowsAffected));
    } catch (err) {
      res.send(getJsonErrorResponse("CP05"));
    }
  }
};
