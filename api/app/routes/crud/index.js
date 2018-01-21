const express = require("express");

const routes = require("./routesConfig");
const CommonEndPoints = require("../../controllers/commonEndPoints");

const mainRouter = express.Router();

const getcommonEndPointsRoutes = (routeName, tableName) => {
  const commonEndPoints = new CommonEndPoints(tableName, routeName);

  const router = express.Router();

  // Fetch all
  router.get(`/${routeName}`, commonEndPoints.selectAll);

  // Gets the total count of rows present.
  router.get(`/${routeName}/count/`, commonEndPoints.getCount);

  // Gets the total count of rows with filter
  router.get(`/${routeName}/count/:query`, commonEndPoints.getCount);

  // Fetach by Id
  router.get(`/${routeName}/:id`, commonEndPoints.selectById);

  // Delete the record by Id
  router.delete(`/${routeName}/:id`, commonEndPoints.delete);

  // Creates the record
  router.post(`/${routeName}`, commonEndPoints.create);

  // Updates the record.
  router.put(`/${routeName}/:id`, commonEndPoints.update);

  // Gets the records - pagination implementation.
  router.get(`/${routeName}/page/:no`, commonEndPoints.getPage);

  // Gets the records with the filter sent as query
  router.get(`/${routeName}/search/:query`, commonEndPoints.getItem);

  // Search with pagination
  router.get(`/${routeName}/search/:query/:pageNo`, commonEndPoints.getItem);

  return router;
};

for (let i = 0; i < routes.length; i++) {
  mainRouter.use(
    "/",
    getcommonEndPointsRoutes(routes[i].route, routes[i].table)
  );
}

module.exports = mainRouter;
