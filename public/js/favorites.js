(function() {
  'use strict';

  $(".button-collapse").sideNav();

  const $sidebarUsername = $('#username');
  $sidebarUsername.html(`Hello ${localStorage.getItem('username')}!`);

  $.getJSON('/favorites')
  .done((favorites) => {
    const $box = $('#favoritesBox');
    const $logout = $('#signOut');

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

    for (const fav of favorites) {
      const $div = $('<div>').attr({ class:'favDiv col l6 m6 s12' });
      const $track = fav.embedLink;
      const $delFav = $('<a class="deleteButton btn-floating btn-large waves-effect waves-light"><i class="material-icons">delete_forever</i></a>');

      $div.append($track);
      $div.append($delFav);
      $box.append($div);
      $('iframe#song').addClass('favIframe');
      $('iframe#song').removeAttr('id');

      $delFav.click((event) => {

        const options = {
          contentType: 'application/json',
          data: JSON.stringify({ trackId: fav.trackId }),
          dataType: 'json',
          type: 'DELETE',
          url: '/favorites'
        };

        $.ajax(options)
        .done(() => {
          $(event.target).closest('.favDiv').remove();

          Materialize.toast('Removed track from your favorites', 5000);
        })
        .fail(() => {
          Materialize.toast(
            'Unable to remove this track from your favorites', 5000);
          });
        });
      }
    })
    .fail(() => {
      window.location.href = '/index.html';
    });
  })();
