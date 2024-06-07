/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('login_records', function(table) {
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('id').inTable('users');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('login_records', function(table) {
        table.dropForeign('user_id');
        table.dropColumn('user_id');
    });
};
