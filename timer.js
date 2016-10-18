'use strict';

module.exports.timer = () => {
  let holder = Math.floor(Math.random() * 50);
  setInterval(() => {
    holder = Math.floor(Math.random() * 50);
  }, 10000);
  return holder;
};
