/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('lessons', function(table) {
        table.integer('teacher_id').unsigned().notNullable();
        table.foreign('teacher_id').references('id').inTable('teachers');
        table.integer('student_id').unsigned().notNullable();
        table.foreign('student_id').references('id').inTable('students');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('lessons', function(table) {
        table.dropForeign('teacher_id');
        table.dropColumn('teacher_id');
        table.dropForeign('student_id');
        table.dropColumn('student_id');
    });
};
