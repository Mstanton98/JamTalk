'use strict'

$(function() {

  const socket = io('/rock');
  const $song = $('#songDiv');
  const $subminButton = $('');
  const $sidebarUsername = $('#username');

    $('#chatForm').submit(function(){
      socket.emit('chat message', $('#chatPH').val());
      $('#chatPH').val('');
      return false;
    });
    socket.on('chat message', function(msg){
      $('#msgBox').append($('<li>').text(msg));
      console.log(msg);
    });

  $.getJSON('/alt_rock')
    .done((track) => {
      $song.html(track.embedLink);
    })
    .fail(() => {
      window.location.href = '/index.html';
    });

    $(sendButton).on('click')

  $(".button-collapse").sideNav();

});
