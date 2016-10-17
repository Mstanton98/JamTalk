'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/dev_q2_project'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
