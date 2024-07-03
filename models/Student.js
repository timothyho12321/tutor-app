// const Model = require('../routes/database_knex');
const { Model } = require('objection');

class Student extends Model {
  static get tableName() {
    return 'students';
  }

  static async findOne(condition){
    return await this.query().findOne(condition);
  }
  // Other model options go here
}

module.exports = Student;