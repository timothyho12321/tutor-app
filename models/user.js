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

class User extends Model {
  static get tableName() {
    return 'User';
  }

  // Other model options go here
}

module.exports = User;