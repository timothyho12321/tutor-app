// const Model = require('../routes/database_knex');
const { Model } = require('objection');

class SubjectTeacher extends Model {
  static get tableName() {
    return 'subjects_teachers';
  }

  static async findOne(condition){
    return await this.query().findOne(condition);
  }
  // Other model options go here

  static async findAllByTeacherId(teacherId){
    return await this.query().where('teacher_id', teacherId);
  } 
}

module.exports = SubjectTeacher;