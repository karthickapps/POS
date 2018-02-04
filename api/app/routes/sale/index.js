const router = require("express-promise-router")();
const validate = require("./validate");

// controllers
const saleController = require("../../controllers/sale");

router.get(
  "/sale",
  validate.validateSaleQueryString,
  saleController.getTransId
);

module.exports = router;
