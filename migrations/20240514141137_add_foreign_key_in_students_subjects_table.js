/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('Student_Subject', function(table) {
        table.integer('student_id').unsigned().notNullable();
        table.foreign('student_id').references('id').inTable('Student');
        table.integer('subject_id').unsigned().notNullable();
        table.foreign('subject_id').references('id').inTable('Subject');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('Student_Subject', function(table) {
        table.dropForeign('student_id');
        table.dropColumn('student_id');
        table.dropForeign('subject_id');
        table.dropColumn('subject_id');
    });
};
