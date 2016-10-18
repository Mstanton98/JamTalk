'use strict';

const boom = require('boom');
const express = require('express');
const knex = require('../knex');
const {
  camelizeKeys,
  decamelizeKeys
} = require('humps');
const request = require('request');
const timer = require('../timer').timer;
let randomNum = Math.floor(Math.random() * 50);

setInterval(() => {
  randomNum = Math.floor(Math.random() * 50);
}, 10000);
console.log(randomNum);

const router = express.Router();

router.get('/metal', (_req, res, next) => {
  request('https://api-v2.soundcloud.com/charts?kind=top&genre=soundcloud%3Agenres%3Ametal&client_id=02gUJC0hH2ct1EGOcYXQIzRFU91c72Ea&limit=50&offset=0&linked_partitioning=1&app_version=1476719521', (error, response, body) => {
    if (error) throw new Error(error);

    const obj = JSON.parse(body);
    const newTrack = obj.collection[randomNum].track;
    console.log(newTrack);
    const insertTrack = {
      genre: newTrack.genre,
      title: newTrack.title,
      sc_id: newTrack.id,
      embed_link: `<iframe scrolling="no" frameborder="no" id="song" src='https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${newTrack.id}&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true'>`
    };
    console.log(insertTrack);
    knex('tracks')
      .insert(decamelizeKeys(insertTrack), '*')
      .then((rows) => {
        const track = camelizeKeys(rows[0]);

        res.send(track);
      })
      .catch((err) => {
        next(err);
      });
  });
});


module.exports = router;
