// Filename: seeds/populate_teachers_table.js
const faker = require('faker');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
    
    // Get all user IDs
    const users = await knex('users').select('id');
    const userIds = users.map(user => user.id);
    
    // Inserts seed entries
    const students = Array.from({length: 5}).map(() => ({
        name: faker.name.findName(),
        description: faker.lorem.paragraph(),
        weak_area: faker.lorem.sentence(),
        preference: faker.lorem.sentence(),
        expectations: faker.lorem.sentence(),
        user_id: faker.random.arrayElement(userIds), // Pick a random user ID
    }));

    return knex('students').insert(students);
};