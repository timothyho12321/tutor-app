// Filename: seeds/populate_users_table.js
const faker = require('faker');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function(knex) {
   
    // Inserts seed entries
    const subjects = Array.from({length: 5}).map(() => ({
        name: faker.random.word(),
        level: faker.random.arrayElement(['Primary', 'Secondary', 'Junior College']),
        syllabus: faker.random.word(),
        cost: faker.datatype.number({min: 100, max: 500}),
        budget: faker.datatype.number({min: 500, max: 1000}),
    }));

    return knex('subjects').insert(subjects);
        
};