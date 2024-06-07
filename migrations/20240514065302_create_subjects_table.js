/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('subjects', function(table) {
        table.increments('id');
        table.string('name', 45);
        table.string('level',45);
        table.string('syllabus',45);
        table.integer('cost');
        table.integer('budget');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('subjects');
};
