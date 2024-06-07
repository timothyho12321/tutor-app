// const Model = require('../routes/database_knex');
const { Model } = require('objection');

class Teacher extends Model {
  static get tableName() {
    return 'teachers';
  }

  static async findOne(condition){
    return await this.query().findOne(condition);
  }
  // Other model options go here
}

module.exports = Teacher;