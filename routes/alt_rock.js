'use strict';

const boom = require('boom');
const express = require('express');
const knex = require('../knex');
const {
  camelizeKeys,
  decamelizeKeys
} = require('humps');
const request = require('request');
const jwt = require('jsonwebtoken');

const authorize = function(req, res, next) {
  jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(boom.create(401, 'Unauthorized'));
    }

    req.token = decoded;
    // You can now access the payload via req.token.userId
    next();
  });
};



let randomNum = Math.floor(Math.random() * 50);

setInterval(() => {
  randomNum = Math.floor(Math.random() * 50);
}, 10000);
// 3600000 for 1 hour
console.log(randomNum);

const router = express.Router();

//send the object to front end via fetch or getJSON query
//build out logic to rerun process every 12 hours
router.get('/altRock', authorize, (_req, res, next) => {
  request('https://api-v2.soundcloud.com/charts?kind=trending&genre=soundcloud%3Agenres%3Aalternativerock&client_id=02gUJC0hH2ct1EGOcYXQIzRFU91c72Ea&limit=50&offset=0&linked_partitioning=1&app_version=1476719521',(error, response, body) => {
    if (error) {
      return next(boom.create(400, 'Bad Request'))
    };

    const obj = JSON.parse(body);
    const newTrack = obj.collection[randomNum].track;
    const insertTrack = {
      genre: newTrack.genre,
      title: newTrack.title,
      scId: newTrack.id,
      embedLink: `<iframe scrolling="no" frameborder="no" id="song" src='https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${newTrack.id}&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true'></iframe>`
      };

      console.log(newTrack);

      knex('tracks')
        .insert(decamelizeKeys(insertTrack), '*')
        .then((rows) => {
          const track = camelizeKeys(rows[0]);

          res.send(track);
        })
        .catch((err) => {
          next(err);
        })

  });
});


module.exports = router;
