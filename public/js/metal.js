'use strict'

$(function(){

  const $song = $('#song');

  $.getJSON('/metal')
    .done((track) => {
      $song.attr('src', track.embedLink);
    })
    .fail(() => {
      Materialize.toast('Unable to retrieve song', 3000);
    });





  $(".button-collapse").sideNav();










});
