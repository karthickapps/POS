const express = require("express");

const Crud = require("../controllers/crud");

const mainRouter = express.Router();

const getCrudRoutes = (routeName, tableName) => {
  const crud = new Crud(tableName, routeName);

  const router = express.Router();

  router.get(`/${routeName}`, crud.selectAll);

  router.get(`/${routeName}/search/:query`, crud.getItem);

  router.get(`/${routeName}/:id`, crud.selectById);

  router.delete(`/${routeName}/:id`, crud.delete);

  router.post(`/${routeName}`, crud.create);

  router.put(`/${routeName}/:id`, crud.update);

  return router;
};

const routes = [
  {
    route: "products",
    table: "products"
  },
  {
    route: "productTypes",
    table: "product_types"
  },
  {
    route: "expenseTypes",
    table: "expense_types"
  },
  {
    route: "expense",
    table: "expense"
  }
];

for (let i = 0; i < routes.length; i++) {
  mainRouter.use("/", getCrudRoutes(routes[i].route, routes[i].table));
}

module.exports = mainRouter;
