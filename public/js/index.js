$(document).ready(function(){
  'use strict';

  $('.modal-trigger').leanModal({
      dismissible: true,
      in_duration: 300,
      out_duration: 200,
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
        window.location.href = '/metal.html';
      })
      .fail(($xhr) => {
        Materialize.toast($xhr.responseText, 3000);
      });
  });

  $('#signUpForm').submit((event) => {
  event.preventDefault();

  const emailSignUp = $('#emailSignUp').val().trim();
  const usernameSignUp = $('#usernameSignUp').val().trim();
  const passwordSignUp = $('#passwordSignUp').val().trim();

  if (!emailSignUp) {
    return Materialize.toast('Email must not be blank', 3000);
  }

  if (emailSignUp.indexOf('@') < 0) {
    return Materialize.toast('Email must be valid', 3000);
  }

  if (!usernameSignUp) {
    return Materialize.toast('Username must not be blank', 3000);
  }

  if (!passwordSignUp || password.length < 8) {
    return Materialize.toast('Password must be at least 8 characters long', 3000);
  }

  const optionsSignUp = {
    contentType: 'application/json',
    data: JSON.stringify({ emailSignUp, usernameSignUp, passwordSignUp }),
    dataType: 'json',
    type: 'POST',
    url: '/users'
  };

  $.ajax(optionsSignUp)
    .done(() => {
      window.location.href = '/metal.html';
    })
    .fail(($xhr) => {
      Materialize.toast($xhr.responseText, 3000);
    });
});
});
