const router = require("express-promise-router")();
const validate = require("./validate");

const saleController = require("../../controllers/sale");

router.get("/sale/transId", saleController.getTransId);

router.post(
  "/sale",
  validate.validateAddToCartItemRequest,
  saleController.addItemToCart
);

router.delete(
  "/sale",
  validate.validateEmptyCartRequest,
  saleController.emptyCart
);

module.exports = router;
