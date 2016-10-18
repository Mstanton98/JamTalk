'use strict';

const boom = require('boom');
const express = require('express');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');
const request = require('request');
const timer = require('../timer').timer;
let randomNum = Math.floor(Math.random() * 50);

setInterval(() => {
  randomNum = Math.floor(Math.random() * 50);
}, 10000);
console.log(randomNum);

const router = express.Router();

//make request to api
//build random function to get random song
//interpolate the embed link as a string to contain the random songs id
//once song is selected, build out object and send to tracks table
//send the object to front end via fetch or getJSON query
//build out logic to rerun process every 12 hours
router.get('/metal', (_req, res, next) => {
  request('https://api-v2.soundcloud.com/charts?kind=top&genre=soundcloud%3Agenres%3Ametal&client_id=02gUJC0hH2ct1EGOcYXQIzRFU91c72Ea&limit=50&offset=0&linked_partitioning=1&app_version=1476719521',(error, response, body) => {
  if (error) throw new Error(error);


  const obj = JSON.parse(body);
  console.log(randomNum);
  res.send(obj.collection[randomNum]);
});

});

module.exports = router;
