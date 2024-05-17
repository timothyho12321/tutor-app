const Knex = require('knex');
const { Model } = require('objection');

const knex = Knex({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tutor'
  }
});

Model.knex(knex);

module.exports = Model;