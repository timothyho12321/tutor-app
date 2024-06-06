/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Page_View', function(table) {
        table.increments('id');
        table.string('session_id', 255);
        table.datetime('time_entered');
        table.datetime('time_exited');
        table.string('page_viewed', 255);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('Page_View');
};
