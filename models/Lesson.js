const { Model } = require('objection');

class Lesson extends Model {
  static get tableName() {
    return 'lessons';
  }

  static get relationMappings() {
    const Teacher = require('./Teacher');
    return {
      teacher: {
        relation: Model.BelongsToOneRelation,
        modelClass: Teacher,
        join: {
          from: 'lessons.teacher_id',
          to: 'teachers.id'
        }
      }
    };
  }
}

module.exports = Lesson;