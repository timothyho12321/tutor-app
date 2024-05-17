const Model = require('../routes/database_knex');

class User extends Model {
  static get tableName() {
    return 'Teacher';
  }

  // Other model options go here
}

module.exports = User;