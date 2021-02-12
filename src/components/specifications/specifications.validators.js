// base joi 
const BaseJoi = require('joi');
// joi date extension 
const Extension = require('joi-date-extensions');
const Joi = BaseJoi.extend(Extension);

// handling the joi response 
const Response = require('../../responses/response');

// add joi schema 
const schemas = {
  joiGetSpecifications: Joi.object().keys({
    moduleName: Joi.string().trim().label('Module Name').valid(['finance', 'tradeLicense']).required(),
    screenName: Joi
      .when('moduleName', {
        is: 'finance',
        then: Joi.string().trim().lowercase().valid(['collect']),
      })
      .when('moduleName', {
        is: 'tradeLicense',
        then: Joi.string().trim().lowercase().valid(['apply', 'search']),
      }).required(),
  }),
};

const options = {
  // generic option
  basic: {
    abortEarly: false,
    convert: true,
    allowUnknown: false,
    stripUnknown: true
  },
};

module.exports = {
  // exports validate admin signin 
  joiGetSpecifications: (req, res, next) => {
    // getting the schemas 
    let schema = schemas.joiGetSpecifications;
    let option = options.basic;

    // validating the schema 
    schema.validate(req.params, option).then(() => {
      return next();
      // if error occured
    }).catch((err) => {
      let error = [];
      err.details.forEach(element => {
        error.push(element.message);
      });

      // returning the response 
      Response.joierrors(req, res, err);
    });
  },

}
