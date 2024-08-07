// Filename: seeds/populate_teachers_table.js
const faker = require('faker');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
    
    // Get all user IDs
    const teachers = await knex('teachers').select('id');
    const teacherIds = teachers.map(teacher => teacher.id);
     // Get all user IDs
    const subjects = await knex('subjects').select('id');
    const subjectIds = subjects.map(subject => subject.id);
    
    // Inserts seed entries
    const records = Array.from({length: 5}).map(() => ({
        
        teacher_id: faker.random.arrayElement(teacherIds), // Pick a random user ID
        subject_id: faker.random.arrayElement(subjectIds), // Pick a random user ID
    }));

    records.push({ 
        teacher_id: 6, // Pick a random user ID
        subject_id: 1, // Pick a random user ID
    });
    records.push({ 
        teacher_id: 5, // Pick a random user ID
        subject_id: 2, // Pick a random user ID
    });

    return knex('subjects_teachers').insert(records);
};