const Joi = require("joi");

module.exports = {
  // eslint-disable-next-line
  validateUserInfo: schema => (req, res, next) => {
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

  schemas: {
    authSchema: Joi.object().keys({
      id: Joi.string()
        .min(4)
        .required(),
      password: Joi.string()
        .min(4)
        .required(),
    }),
  },
};
