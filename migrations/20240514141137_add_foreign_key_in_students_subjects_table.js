/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('students_subjects', function(table) {
        table.integer('student_id').unsigned().notNullable();
        table.foreign('student_id').references('id').inTable('students');
        table.integer('subject_id').unsigned().notNullable();
        table.foreign('subject_id').references('id').inTable('subjects');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('students_subjects', function(table) {
        table.dropForeign('student_id');
        table.dropColumn('student_id');
        table.dropForeign('subject_id');
        table.dropColumn('subject_id');
    });
};
