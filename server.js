'use strict';

/* eslint-disable max-params, no-console */

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const port = process.env.PORT || 8000;
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path');

app.disable('x-powered-by');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join('public')));

// CSRF protection
app.use((req, res, next) => {
  if (/json/.test(req.get('Accept'))) {
    return next();
  }

  res.sendStatus(406);
});

const altRock = require('./routes/alt_rock');
const blues = require('./routes/blues');
const edm = require('./routes/edm');
const favorites = require('./routes/favorites');
const folk = require('./routes/folk');
const metal = require('./routes/metal');
const rap = require('./routes/rap');
const token = require('./routes/token');
const users = require('./routes/users');

const metalChat = io.of('/metal');
const folkChat = io.of('/folk');
const rockChat = io.of('/rock');
const edmChat = io.of('/edm');
const rapChat = io.of('/rap');
const bluesChat = io.of('/blues');

metalChat.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    metalChat.emit('chat message', msg);
  });
});

folkChat.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    folkChat.emit('chat message', msg);
  });
});

rockChat.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    rockChat.emit('chat message', msg);
  });
});

edmChat.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    edmChat.emit('chat message', msg);
  });
});

rapChat.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    rapChat.emit('chat message', msg);
  });
});

bluesChat.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    bluesChat.emit('chat message', msg);
  });
});

app.use(altRock);
app.use(blues);
app.use(edm);
app.use(favorites);
app.use(folk);
app.use(metal);
app.use(rap);
app.use(token);
app.use(users);

app.use((_req, res) => {
  res.sendStatus(404);
});

app.use((err, _req, res, _next) => {
  if (err.output && err.output.statusCode) {
    return res
      .status(err.output.statusCode)
      .set('Content-Type', 'text/plain')
      .send(err.message);
  }

  console.error(JSON.stringify(err, null, 2));

  if (err.status) {
    return res
      .status(err.status)
      .set('Content-Type', 'text/plain')
      .send(err.statusText);
  }

  console.error(err.stack);
  res.sendStatus(500);
});

server.listen(port, () => {
  console.log('Listening on port', port);
});
