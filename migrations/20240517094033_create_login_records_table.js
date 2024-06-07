/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('login_records', function(table) {
        table.increments('id');
        table.datetime('login');
        table.datetime('logout');
        table.string('ip_address', 45);
        table.string('session_id', 255);
        
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('login_records');
};
