/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('teachers', function(table) {
        table.increments('id');
        table.string('name', 45);
        table.text('description');
        table.integer('years_experience');
        table.string('link', 255);
        table.text('achievement');
        
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('teachers');
};
