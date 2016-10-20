'use strict'

$(function() {

  const socket = io('/metal');
  const $song = $('#songDiv');
  const $subminButton = $('');
  const $sidebarUsername = $('#username');
  const $logout = $('#signOut');

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
      window.location.href = '/index.html';
    });

    $(sendButton).on('click')

    $logout.click((event) => {
        event.preventDefault();

        const options = {
          dataType: 'json',
          type: 'DELETE',
          url: '/token'
        };

        $.ajax(options)
          .done(() => {
            window.location.href = '/index.html';
          })
          .fail(() => {
            Materialize.toast('Unable to log out. Please try again.', 3000);
          });
      });

  $(".button-collapse").sideNav();

});
