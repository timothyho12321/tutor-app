/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('bookings', function(table) {
        table.increments('id');
        table.string('name', 45);
        table.string('subject', 45);
        table.string('day', 45);
        table.date('date');
        table.time('time_start');
        table.time('time_end');
        table.integer('duration');
        table.string('mode', 45);
        table.string('type',45);
        table.string('status',45);
        table.tinyint('is_hide');
        table.integer('rate');
        table.integer('pax');
        table.text('address');
        table.string('postal_code', 45);
        table.text('link');
        table.tinyint('is_paid');
        table.integer('paid_amount');
        table.datetime('paid_date');
        table.string('payor',255);
        table.text('feedback');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('bookings');
};
