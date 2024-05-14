/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('Lesson', function(table) {
        table.integer('subject_id').unsigned().notNullable();
        table.foreign('subject_id').references('id').inTable('Subject');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('Lesson', function(table) {
        table.dropForeign('subject_id');
        table.dropColumn('subject_id');
    });
};
