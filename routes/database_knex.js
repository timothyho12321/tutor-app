const Knex = require('knex');
const { Model } = require('objection');

const knex = Knex({
  client: 'mysql',
  connection: {
    host: 'localhost',
    // host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'admin',
    database: 'tutor'
  },
  debug: true
});

Model.knex(knex);

module.exports = Model;