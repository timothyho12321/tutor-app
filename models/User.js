const Model = require('../routes/database_knex');

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static async findOne(condition){
    return await this.query().findOne(condition);
  }
  // Other model options go here
}

module.exports = User;