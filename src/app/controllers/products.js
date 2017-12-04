const knex = require("../../db/knex");

module.exports = {
  getAllProducts: async (req, res) => {
    knex
      .select()
      .from("products")
      .then(todos => {
        res.send(todos);
      })
      .catch(err => {
        res.end(`Got an error. Couldn't get producst \n ${err}`);
      });
  },
  deleteProduct: async (req, res) => {
    knex("products")
      .where({
        id: req.params.id,
      })
      .del()
      .then(products => {
        res.send(`No of products deleted :- ${products}`);
      })
      .catch(err => {
        res.end(
          `Got an error. Couldn't delete the product. The err is ${JSON.stringify(
            err,
          )}`,
        );
      });
  },
  getProductById: async (req, res) => {
    knex
      .select()
      .from("products")
      .where({
        id: req.params.id,
      })
      .then(products => {
        res.send(products);
      })
      .catch(err => {
        res.end(`Got an error. Couldn't get the required product \n ${err}`);
      });
  },
  createProduct: async (req, res) => {
    const product = req.body;

    knex("products")
      .insert(product)
      .then(() => {
        knex
          .select()
          .from("products")
          .then(products => {
            res.send(products);
          });
      })
      .catch(err => {
        res.end(
          `Got an error. Couldn't create the product. The error is ${JSON.stringify(
            err,
          )}`,
        );
      });
  },
};
