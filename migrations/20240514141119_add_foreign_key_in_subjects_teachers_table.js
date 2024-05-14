/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('Subject_Teacher', function(table) {
        table.integer('teacher_id').unsigned().notNullable();
        table.foreign('teacher_id').references('id').inTable('Teacher');
        table.integer('subject_id').unsigned().notNullable();
        table.foreign('subject_id').references('id').inTable('Subject');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('Subject_Teacher', function(table) {
        table.dropForeign('teacher_id');
        table.dropColumn('teacher_id');
        table.dropForeign('subject_id');
        table.dropColumn('subject_id');
    });
};
