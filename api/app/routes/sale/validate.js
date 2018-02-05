const Joi = require("joi");

const addToCartSchema = Joi.object().keys({
  transId: Joi.string().required(),
  id: Joi.string().required(),
  qty: Joi.number()
    .integer()
    .required()
});

const emptyCartSchema = Joi.object().keys({
  transId: Joi.string().required()
});

module.exports = {
  // eslint-disable-next-line
  validateAddToCartItemRequest: (req, res, next) => {
    const result = Joi.validate(req.body, addToCartSchema);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    if (!req.value) {
      req.value = {};
    }
    req.value.body = result.value;
    next();
  },

  // eslint-disable-next-line
  validateEmptyCartRequest: (req, res, next) => {
    const result = Joi.validate(req.body, emptyCartSchema);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    if (!req.value) {
      req.value = {};
    }
    req.value.body = result.value;
    next();
  }
};
