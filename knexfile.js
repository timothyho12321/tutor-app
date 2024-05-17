module.exports = {
    development: {
      client: 'mysql',
      connection: {
        host: 'localhost', // your database host
        user: 'root', // your database user
        password: '', // your database password
        database: 'tutor', // your database name
      },
      migrations: {
        directory: './migrations',
      },
      seeds:{
        directory: './seeds',
      }
    },
  };



// bookshelf.js
const knex = require('knex')(require('./knexfile'));
const bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;