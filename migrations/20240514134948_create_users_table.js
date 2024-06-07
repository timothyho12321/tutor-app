/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
        table.increments('id');
        table.string('first_name', 45);
        table.string('last_name', 45);
        table.date('dob');
        table.string('username', 45);
        table.string('password', 45);
        table.text('address');
        table.string('handphone_num', 45);
        table.string('email', 255);
        table.string('role', 45);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('User');
};
