/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Student', function(table) {
        table.increments('id');
        table.string('name', 45);
        table.text('description');
        table.text('weak_area');
        table.text('preference');
        table.text('expectations');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('Student');
};
