// Filename: seeds/populate_users_table.js
const faker = require('faker');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function(knex) {
    const setLessons = {1: 'English', 2: 'Math', 3: 'Science', 4: 'Art', 5: 'Music'};
    const lessonNames = Object.values(setLessons);
    
    const subjects = Array.from({length: 5}).map((_, index) => ({
        name: lessonNames[index],
        level: faker.random.arrayElement(['Primary', 'Secondary', 'Junior College']),
        syllabus: faker.random.word(),
        cost: faker.datatype.number({min: 100, max: 500}),
        budget: faker.datatype.number({min: 500, max: 1000}),
    }));

    return knex('subjects').insert(subjects);
        
};