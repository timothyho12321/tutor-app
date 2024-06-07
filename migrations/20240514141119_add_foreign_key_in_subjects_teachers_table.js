/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('subjects_teachers', function(table) {
        table.integer('teacher_id').unsigned().notNullable();
        table.foreign('teacher_id').references('id').inTable('teachers');
        table.integer('subject_id').unsigned().notNullable();
        table.foreign('subject_id').references('id').inTable('subjects');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('subjects_teachers', function(table) {
        table.dropForeign('teacher_id');
        table.dropColumn('teacher_id');
        table.dropForeign('subject_id');
        table.dropColumn('subject_id');
    });
};
