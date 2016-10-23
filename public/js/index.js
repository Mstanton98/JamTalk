'use strict';

$(document).ready(() => {
  $('.modal-trigger').leanModal({
    dismissible: true,
    in_duration: 300,
    out_duration: 200
  });

  $('#loginForm').submit((event) => {
    event.preventDefault();

    const username = $('#usernameLogin').val().trim();
    const password = $('#passwordLogin').val().trim();

    if (!username) {
      return Materialize.toast('Username must not be blank', 3000);
    }

    if (!password) {
      return Materialize.toast('Password must not be blank', 3000);
    }

    if (password.length < 8) {
      return Materialize.toast('Password must be at least 8 characters', 3000);
    }

    const options = {
      contentType: 'application/json',
      data: JSON.stringify({ username, password }),
      dataType: 'json',
      type: 'POST',
      url: '/token'
    };

    $.ajax(options)
      .done(() => {
        localStorage.setItem('username', username);
        window.location.href = '/favorites.html';
      })
      .fail(($xhr) => {
        Materialize.toast($xhr.responseText, 3000);
      });
  });

  $('#signUpForm').submit((event) => {
    event.preventDefault();

    const email = $('#emailSignUp').val().trim();
    const username = $('#usernameSignUp').val().trim();
    const password = $('#passwordSignUp').val().trim();

    if (!email) {
      return Materialize.toast('Email must not be blank', 3000);
    }

    if (email.indexOf('@') < 0) {
      return Materialize.toast('Email must be valid', 3000);
    }

    if (!username) {
      return Materialize.toast('Username must not be blank', 3000);
    }

    if (!password || password.length < 8) {
      return Materialize.toast('Password must be at least 8 characters long', 3000);
    }

    const optionsSignUp = {
      contentType: 'application/json',
      data: JSON.stringify({ email, username, password }),
      dataType: 'json',
      type: 'POST',
      url: '/users'
    };

    $.ajax(optionsSignUp)
      .done(() => {
        window.location.href = '/favorites.html';
      })
      .fail(($xhr) => {
        Materialize.toast($xhr.responseText, 3000);
      });
  });
});
