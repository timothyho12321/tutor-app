const { Model } = require('objection');

class Booking extends Model {
  static get tableName() {
    return 'bookings';
  }

  static async findAll(condition){
    return await this.query().findAll(condition);
  }

  static get relationMappings() {
    const Lesson = require('./Lesson');
    return {
      lesson: {
        relation: Model.BelongsToOneRelation,
        modelClass: Lesson,
        join: {
          from: 'bookings.lesson_id',
          to: 'lessons.id'
        }
      }
    };
  }
}

module.exports = Booking;