/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('bookings', function(table) {
        table.integer('lesson_id').unsigned().notNullable();
        table.foreign('lesson_id').references('id').inTable('lessons');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('bookings', function(table) {
        table.dropForeign('lesson_id');
        table.dropColumn('lesson_id');
    });
};
