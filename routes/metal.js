'use strict';

const boom = require('boom');
const express = require('express');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');
const request = require('request');

const router = express.Router();

//make request to api
//build random function to get random song
//once song is selected, send to database and build out object
//interpolate the embed link as a string to contain the random songs id
//send the object to front end via fetch or getJSON query
//build out logic to rerun process every 12 hours
router.get('/metal', (_req, res, next) => {

})
