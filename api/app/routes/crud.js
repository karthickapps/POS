const express = require("express");

const Crud = require("../controllers/crud");


const router = express.Router();

const getCrudRoutes = function (routeName, tableName) {
  const crud = new Crud(tableName, routeName);

  const router = express.Router();

  router.get(`/${routeName}`, crud.selectAll);

  router.get(`/${routeName}/:id`, crud.selectById);

  router.delete(`/${routeName}/:id`, crud.delete);

  router.post(`/${routeName}`, crud.create);

  router.put(`/${routeName}/:id`, crud.update);

  return router;
};

const routes = [
  {
    route: "products",
    table: "products",
  },
  {
    route: "productTypes",
    table: "product_types",
  },
];

for (let i = 0; i < routes.length; i++) {

	const r = getCrudRoutes(routes[i].route, routes[i].table);

  router.use("/", getCrudRoutes(routes[i].route, routes[i].table));
}

module.exports = router;
