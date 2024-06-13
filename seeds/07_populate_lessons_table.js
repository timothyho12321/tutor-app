// Filename: seeds/populate_teachers_table.js
const faker = require('faker');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function(knex) {
    // Get all subject IDs
    const subjects = await knex('subjects').select('id');
    const subjectIds = subjects.map(subject => subject.id);

    const teachers = await knex('teachers').select('id');
    const teacherIds = teachers.map(teacher => teacher.id);

    const students = await knex('students').select('id');
    const studentIds = students.map(student => student.id);

    // Check if there are enough subject IDs
    if (subjectIds.length < 5) {
        throw new Error('Not enough subjects in the Subject table. Please make sure there are at least 5 subjects before running this seed script.');
    }

    // Inserts seed entries
    const lessons = Array.from({length: 5}).map(() => {
        const date = faker.date.future();
        const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

        return{
        name: faker.random.arrayElement(['Lesson A', 'Lesson B', 'Lesson C', 'Lesson D']),
        subject: faker.random.arrayElement(['Math', 'Science', 'English', 'History', 'Art']),
        day: faker.date.weekday(),
        date: faker.date.future(),
        duration: faker.datatype.number({min: 60, max: 240}),
        time: time,
        mode: faker.random.arrayElement(['Online', 'Offline']),
        type: faker.random.arrayElement(['Lecture', 'Tutorial', 'Lab']),
        status: faker.random.arrayElement(['Scheduled', 'Completed', 'Cancelled']),
        is_available: faker.datatype.boolean() ? 1 : 0,
        rate: faker.datatype.number({min: 50, max: 200}),
        pax: faker.datatype.number({min: 1, max: 20}),
        address: faker.address.streetAddress(),
        postal_code: faker.address.zipCode(),
        subject_id: faker.random.arrayElement(subjectIds), // Pick a random subject ID
        teacher_id: faker.random.arrayElement(teacherIds), // Pick a random subject ID
        student_id: faker.random.arrayElement(studentIds), // Pick a random subject ID
        
    };
    });

    const date = faker.date.future();
    const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    lessons.push({
        name: 'Lesson A',
        subject: 'Math',
        day: faker.date.weekday(),
        date: faker.date.future(),
        time: "14:00",
        duration:  60,
        mode: faker.random.arrayElement(['Online', 'Offline']),
        type: faker.random.arrayElement(['Lecture', 'Tutorial', 'Lab']),
        status: faker.random.arrayElement(['Scheduled', 'Completed', 'Cancelled']),
        is_available: faker.datatype.boolean() ? 1 : 0,
        rate: faker.datatype.number({min: 50, max: 200}),
        pax: faker.datatype.number({min: 1, max: 20}),
        address: faker.address.streetAddress(),
        postal_code: faker.address.zipCode(),
        subject_id: faker.random.arrayElement(subjectIds), // Pick a random subject ID
        teacher_id: 6, // Pick a random subject ID
        student_id: faker.random.arrayElement(studentIds), // Pick a random subject ID
        
    })

    return knex('lessons').insert(lessons);
};