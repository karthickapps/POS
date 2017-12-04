const knex = require("../../db/knex");

module.exports = {
  getAllProducts: async (req, res, next) => {
    knex
      .select()
      .from("products")
      .then(function(todos) {
        res.send(todos);
      })
      .catch(err => {
        res.end("Got an error. Couldn't get producst");
      });
  },
  deleteProduct: async (req, res, next) => {
    knex("products")
      .where({
        id: req.params.id
      })
      .del()
      .then(function(products) {
        res.send(`No of products deleted :- ${products}`);
      })
      .catch(err => {
        res.end(
          "Got an error. Couldn't delete the product. The err is " +
            JSON.stringify(err)
        );
      });
  },
  getProductById: async (req, res, next) => {
    knex
      .select()
      .from("products")
      .where({
        id: req.params.id
      })
      .then(function(products) {
        res.send(products);
      })
      .catch(err => {
        res.end("Got an error. Couldn't get the required product");
      });
  },
  createProduct: async (req, res, next) => {
    const product = req.body;

    knex("products")
      .insert(product)
      .then(() => {
        knex
          .select()
          .from("products")
          .then(function(products) {
            res.send(products);
          });
      })
      .catch(err => {
        res.end(
          "Got an error. Couldn't create the product. The error is " +
            JSON.stringify(err)
        );
      });
  }
};
