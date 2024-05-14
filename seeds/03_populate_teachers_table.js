// Filename: seeds/populate_teachers_table.js
const faker = require('faker');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
    
    // Get all user IDs
    const users = await knex('User').select('id');
    const userIds = users.map(user => user.id);

    
    // Inserts seed entries
    const teachers = Array.from({length: 5}).map(() => ({
        name: faker.name.findName(),
        description: faker.lorem.paragraph(),
        years_experience: faker.datatype.number({min: 1, max: 20}),
        link: faker.internet.url(),
        achievement: faker.lorem.sentence(),
        user_id: faker.random.arrayElement(userIds), // Pick a random user ID
    }));

    return knex('Teacher').insert(teachers);
};