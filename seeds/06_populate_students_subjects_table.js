// Filename: seeds/populate_teachers_table.js
const faker = require('faker');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
    
    // Get all user IDs
    const students = await knex('students').select('id');
    const studentIds = students.map(student => student.id);
     // Get all user IDs
    const subjects = await knex('subjects').select('id');
    const subjectIds = subjects.map(subject => subject.id);
    
    // Inserts seed entries
    const records = Array.from({length: 5}).map(() => ({
        
        student_id: faker.random.arrayElement(studentIds), // Pick a random user ID
        subject_id: faker.random.arrayElement(subjectIds), // Pick a random user ID
    }));

    records.push({ 
        student_id: 6, // Pick a random user ID
        subject_id: 1, // Pick a random user ID
    });
   
    return knex('students_subjects').insert(records);
};