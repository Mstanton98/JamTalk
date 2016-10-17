'use strict';

const boom = require('boom');
const express = require('express');
const knex = require('../knex');
const {
  camelizeKeys,
  decamelizeKeys
} = require('humps');

const router = express.Router();

router.get('/metal', (_req, res, next) => {
  
})

module.exports = router;
