'use strict'


$(function() {

  const $song = $('#songDiv');
  const $subminButton = $('');
  const $sidebarUsername = $('#username');
  const socket = io();
>>>>>>> .io

  $.getJSON('/metal')
    .done((track) => {
      $song.attr('src', track.embedLink);
    })
    .fail(() => {
      Materialize.toast('Unable to retrieve song', 3000);
    });




  $('#c').submit(function() {
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
  socket.on('chat message', function(msg) {
    $('#messages').append($('<li>').text(msg));
  });

  $(".button-collapse").sideNav();










=======
>>>>>>> socket.io
});
