'use strict';

const Joi =require('joi');

module.exports.post = {
  body: {
    username: Joi.string()
      .label('User Name')
      .required()
      .trim()
      .min(1),
    email: Joi.string()
      .label('Email')
      .required()
      .email()
      .trim(),
    password: Joi.string()
     .label('Password')
     .required()
     .trim()
     .min(8)
  }
};
