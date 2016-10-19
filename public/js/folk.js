'use strict'

$(function(){

  const $song = $('#songDiv');
  const $subminButton = $('');
  const $sidebarUsername = $('#username');


  $.getJSON('/folk')
    .done((track) => {
      $song.html(track.embedLink);
    })
    .fail(() => {
      Materialize.toast('Unable to retrieve song.  Default song playing.', 3000);
    });



  $(".button-collapse").sideNav();



});
