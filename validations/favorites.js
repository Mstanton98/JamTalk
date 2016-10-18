'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
    trackId: Joi.number()
      .integer()
      .required()
      .label('Track Id')
      .min(0),

  }
};
