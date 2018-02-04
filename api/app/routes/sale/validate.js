const Joi = require("joi");

const schema = Joi.object().keys({
  query: Joi.string().required()
});

module.exports = {
  // eslint-disable-next-line
  validateQuery: (req, res, next) => {
    const result = Joi.validate(req.body, schema);
    if (result.error) {
      return res.status(400).json(result.error);
    }

    if (!req.value) {
      req.value = {};
    }
    req.value.body = result.value;
    next();
  },

  validateSaleQueryString: (req, res, next) => {
    const result = req.params;
    console.log(result);
    next();
  }
};
