const Joi = require('joi');

const userValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  name: Joi.string().min(1).max(100).required(),
  ipaddress: Joi.string().ip({ version: ['ipv4'] }).required()
});

module.exports = { userValidationSchema };

// const userValidationSchema = Joi.object({
//   email: Joi.string().email().required(),
//   username: Joi.string().alphanum().min(3).max(30).required(),
//   name: Joi.string().min(1).max(100).required(),
//   ipaddress: Joi.string().ip({ version: ['ipv4'] }).required()
// });

// module.exports = { userValidationSchema };