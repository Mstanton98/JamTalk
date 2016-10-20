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
      Materialize.toast('Unable to retrieve song', 3000);
    });



    $(sendButton).on('click')


  // $('#c').submit((event) => {
  //   event.preventDefault();
  //
  //   socket.emit('chat message', $('#chatPH').val());
  //   $('#chatPH').val('');
  //   return false;
  // });
  // socket.on('chat message', function(msg) {
  //   $('#msgBox').append($(('<li>')).text(msg));
  // });

  $(".button-collapse").sideNav();












});
