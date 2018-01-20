const express = require("express");

const routes = require("./routesConfig");
const Crud = require("../../controllers/crud");

const mainRouter = express.Router();

const getCrudRoutes = (routeName, tableName) => {
  const crud = new Crud(tableName, routeName);

  const router = express.Router();

  router.get(`/${routeName}`, crud.selectAll);

  router.get(`/${routeName}/page/:no`, crud.getPage);

  router.get(`/${routeName}/search/:query`, crud.getItem);

  router.get(`/${routeName}/search/:query/:pageNo`, crud.getItem);

  router.get(`/${routeName}/:id`, crud.selectById);

  router.delete(`/${routeName}/:id`, crud.delete);

  router.post(`/${routeName}`, crud.create);

  router.put(`/${routeName}/:id`, crud.update);

  return router;
};

for (let i = 0; i < routes.length; i++) {
  mainRouter.use("/", getCrudRoutes(routes[i].route, routes[i].table));
}

module.exports = mainRouter;
