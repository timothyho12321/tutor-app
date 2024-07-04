// const Model = require('../routes/database_knex');
const { Model } = require('objection');

class SubjectStudent extends Model {
  static get tableName() {
    return 'students_subjects';
  }

  static async findOne(condition){
    return await this.query().findOne(condition);
  }
  // Other model options go here

  static async findAllByStudentId(studentId){
    return await this.query().where('student_id', studentId).orderBy('subject_id');
  } 
}

module.exports = SubjectStudent;