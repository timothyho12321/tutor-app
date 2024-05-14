// Filename: seeds/populate_teachers_table.js
const faker = require('faker');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function(knex) {
    // Get all subject IDs
    const subjects = await knex('Subject').select('id');
    const subjectIds = subjects.map(subject => subject.id);

    // Check if there are enough subject IDs
    if (subjectIds.length < 5) {
        throw new Error('Not enough subjects in the Subject table. Please make sure there are at least 5 subjects before running this seed script.');
    }

    // Inserts seed entries
    const lessons = Array.from({length: 5}).map(() => ({
        day: faker.date.weekday(),
        date: faker.date.future(),
        time: faker.date.future().toLocaleTimeString(),
        mode: faker.random.arrayElement(['Online', 'Offline']),
        type: faker.random.arrayElement(['Lecture', 'Tutorial', 'Lab']),
        status: faker.random.arrayElement(['Scheduled', 'Completed', 'Cancelled']),
        is_available: faker.datatype.boolean() ? 1 : 0,
        rate: faker.datatype.number({min: 50, max: 200}),
        pax: faker.datatype.number({min: 1, max: 20}),
        address: faker.address.streetAddress(),
        postal_code: faker.address.zipCode(),
        subject_id: faker.random.arrayElement(subjectIds), // Pick a random subject ID
    }));

    return knex('Lesson').insert(lessons);
};