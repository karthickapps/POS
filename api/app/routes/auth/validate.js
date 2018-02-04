const Joi = require("joi");

const authSchema = Joi.object().keys({
  id: Joi.string()
    .min(4)
    .required(),
  password: Joi.string()
    .min(4)
    .required()
});

module.exports = {
  // eslint-disable-next-line
  validateUserInfo: (req, res, next) => {
    const result = Joi.validate(req.body, authSchema);
    if (result.error) {
      return res.status(400).json(result.error);
    }

    if (!req.value) {
      req.value = {};
    }
    req.value.body = result.value;
    next();
  }
};
