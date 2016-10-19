'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const port = process.env.PORT || 8000;
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.disable('x-powered-by');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

const path = require('path');

app.use(express.static(path.join('public')));

const altRock = require('./routes/alt_rock');
const blues = require('./routes/blues');
const edm = require('./routes/edm');
const favorites = require('./routes/favorites');
const folk = require('./routes/folk');
const metal = require('./routes/metal');
const rap = require('./routes/rap');
const token = require('./routes/token');
const users = require('./routes/users');

const metalChat = io.of('/metal-chat');
const altRockChat = io.of('/rock-chat');
const bluesChat = io.of('/blues-chat');
const folkChat = io.of('/folk-chat');
const rapChat = io.of('/rap-chat');
const edmChat = io.of('/edm-chat');

altRockChat.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

metalChat.on('connection', function(socket){
  metalChat.on('chat message', function(msg){
    metalChat.emit('chat message', msg);
  });
});

bluesChat.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

folkChat.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

rapChat.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

edmChat.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
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
})

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
      .send(err.statusText)
  }

  console.error(err.stack);
  res.sendStatus(500);
})

app.listen(port, () => {
  console.log('Listening on port', port);
});
