'use strict'

$(function() {

  const socket = io('/metal');
  const $song = $('#songDiv');
  const $sidebarUsername = $('#username');
  const $logout = $('#signOut');

  let trackObj;

  $sidebarUsername.html(`Hello ${localStorage.getItem('username')}!`);

    $('#chatForm').submit(function(){
      socket.emit('chat message', $('#chatPH').val());
      $('#chatPH').val('');
      return false;
    });
    socket.on('chat message', function(msg){
      $('#msgBox').append($('<li>').text(`${localStorage.getItem('username')}:` + '  ' + msg));
      console.log(msg);
    });

  $.getJSON('/metal')
    .done((track) => {
      trackObj = track;

      $song.html(track.embedLink);
    })
    .fail(() => {
      window.location.href = '/index.html';
    });

    $('#favButton').on('click', () => {
      event.preventDefault();

        const options = {
          contentType: 'application/json',
          data: JSON.stringify({ trackId: trackObj.id, embedLink: trackObj.embedLink }),
          dataType: 'json',
          type: 'POST',
          url: '/favorites'
        };

        $.ajax(options)
          .done(() => {
            $('#favButton').addClass('hide');
            Materialize.toast('Track added to your favorites', 5000);
          })
          .fail(() => {
            Materialize.toast('Unable to add this track to your favorites', 5000);
          });
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
            localStorage.setItem('username', null)
            window.location.href = '/index.html';
          })
          .fail(() => {
            Materialize.toast('Unable to log out. Please try again.', 3000);
          });
      });

  $(".button-collapse").sideNav();

});
