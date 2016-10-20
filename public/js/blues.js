'use strict'

$(function() {

  const socket = io('/blues');
  const $song = $('#songDiv');
  const $sidebarUsername = $('#username');
  const $logout = $('#signOut');

  $sidebarUsername.html(`Hello ${localStorage.getItem('username')}!`);


    $('#chatForm').submit(function(){
      socket.emit('chat message', $('#chatPH').val());
      $('#chatPH').val('');
      return false;
    });
    socket.on('chat message', function(msg){
      $('#msgBox').append($('<li>').text(`${localStorage.getItem('username')}:` + '  ' + msg));
      let scroll = $('#msgBox');
      let height = scroll[0].scrollHeight;
      scroll.scrollTop(height);
      console.log(msg);
    });

  $.getJSON('/blues')
    .done((track) => {
      $song.html(track.embedLink);
    })
    .fail(() => {
      window.location.href = '/index.html';
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
            localStorage.setItem('username', null)
            window.location.href = '/index.html';
          })
          .fail(() => {
            Materialize.toast('Unable to log out. Please try again.', 3000);
          });
      });

    $(sendButton).on('click')

  $(".button-collapse").sideNav();

});
