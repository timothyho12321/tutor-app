// const Model = require('../routes/database_knex');
const { Model } = require('objection');

class Subject extends Model {
  static get tableName() {
    return 'subjects';
  }

  static async findOne(condition){
    return await this.query().findOne(condition);
  }
  
}

module.exports = Subject;