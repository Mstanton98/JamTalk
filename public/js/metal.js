'use strict'

$(function() {

  const $song = $('#songDiv');
  const $subminButton = $('');
  const $sidebarUsername = $('#username');
  //const socket = io('/metal-chat');

  $(".button-collapse").sideNav();
  // const socket = io();

  $.getJSON('/metal')
    .done((track) => {
      $song.attr('src', track.embedLink);
    })
    .fail(() => {
      Materialize.toast('Unable to retrieve song.  Default song playing.', 3000);
    });

  //   var socket = io('/metal-chat');
  // $('#c').submit(function() {
  //   socket.emit('chat message', $('#m').val());
  //   $('#m').val('');
  //   return false;
  // });
  // socket.on('chat message', function(msg) {
  //   $('#messages').append($('<li>').text(msg));
  // });


  // $('#c').submit(function() {
  //   socket.emit('chat message', $('#m').val());
  //   $('#m').val('');
  //   return false;
  // });
  // socket.on('chat message', function(msg) {
  //   $('#messages').append($('<li>').text(msg));
  // });


});
