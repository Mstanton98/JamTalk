'use strict';

$(() => {
  const socket = io('/folk');
  const $song = $('#songDiv');
  const $sidebarUsername = $('#username');
  const $logout = $('#signOut');
  let trackObj;

  $sidebarUsername.html(`Hello ${localStorage.getItem('username')}!`);

  $('#chatForm').submit(() => {
    socket.emit('chat message', `${localStorage.getItem('username')}: ${$('#chatPH').val()}`);
    $('#chatPH').val('');

    return false;
  });
  socket.on('chat message', (msg) => {
    $('#msgBox').append($('<li>').text(msg));
    const scroll = $('#msgBox');
    const height = scroll[0].scrollHeight;

    scroll.scrollTop(height);
  });

  $.getJSON('/folk')
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

  $logout.click((event) => {
    event.preventDefault();

    const options = {
      dataType: 'json',
      type: 'DELETE',
      url: '/token'
    };

    $.ajax(options)
      .done(() => {
        localStorage.setItem('username', null);
        window.location.href = '/index.html';
      })
      .fail(() => {
        Materialize.toast('Unable to log out. Please try again.', 5000);
      });
  });

  $('.button-collapse').sideNav();
});
