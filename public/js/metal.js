'use strict'

$(function(){

  const $song = $('#songDiv');

  $.getJSON('/metal')
    .done((track) => {
      $song.html(track.embedLink);
    })
    .fail(() => {
      Materialize.toast('Unable to retrieve song', 3000);
    });





  $(".button-collapse").sideNav();










});
