'use strict'

$(function() {

  const socket = io('/metal');
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

  $.getJSON('/metal')
    .done((track) => {
      $song.html(track.embedLink);
    })
    .fail(() => {
      Materialize.toast('nable to retrieve song.  Default song playing.', 3000);
    });

    $(sendButton).on('click')

  $(".button-collapse").sideNav();

});
