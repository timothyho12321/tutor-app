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
        const time_start = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        const endDate = new Date(date.getTime() + 60*60*1000); // Add one hour
        const time_end = `${endDate.getHours()}:${endDate.getMinutes()}:${endDate.getSeconds()}`;

        return{
        name: faker.random.arrayElement(['Lesson A', 'Lesson B', 'Lesson C', 'Lesson D']),
        day: faker.date.weekday(),
        date: faker.date.future(),
        duration: faker.datatype.number({min: 60, max: 240}),
        time_start: time_start, 
        time_end: time_end,
        mode: faker.random.arrayElement(['Online', 'Offline']),
        type: faker.random.arrayElement(['Lecture', 'Tutorial', 'Lab']),
        status: faker.random.arrayElement(['Open', 'Matched']),
        is_hide: faker.datatype.boolean() ? 1 : 0,
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
    // const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    // const time_start = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    // const endDate = new Date(date.getTime() + 60*60*1000); // Add one hour
    // const time_end = `${endDate.getHours()}:${endDate.getMinutes()}:${endDate.getSeconds()}`;
-
    lessons.push({
        name: 'Math',
        day: faker.date.weekday(),
        // date: faker.date.future(),
        date: "2024-07-15",
        time_start: "14:00",
        time_end: "15:00",
        duration:  60,
        mode: faker.random.arrayElement(['Online', 'Offline']),
        type: faker.random.arrayElement(['Lecture', 'Tutorial', 'Lab']),
        status: faker.random.arrayElement(['Open', 'Matched']),
        is_hide: 0,
        rate: faker.datatype.number({min: 50, max: 200}),
        pax: faker.datatype.number({min: 1, max: 20}),
        address: faker.address.streetAddress(),
        postal_code: faker.address.zipCode(),
        subject_id: 2, // Pick a random subject ID
        teacher_id: 6, // Pick a random subject ID
        student_id: faker.random.arrayElement(studentIds), // Pick a random subject ID
        
    });
    lessons.push({
        name: 'Math',
        day: faker.date.weekday(),
        // date: faker.date.future(),
        date: "2024-07-15",
        time_start: "14:00",
        time_end: "15:00",
        duration:  60,
        mode: faker.random.arrayElement(['Online', 'Offline']),
        type: faker.random.arrayElement(['Lecture', 'Tutorial', 'Lab']),
        // status: faker.random.arrayElement(['Open', 'Matched']),
        status: "Open",
        is_hide: 0,
        rate: faker.datatype.number({min: 50, max: 200}),
        pax: faker.datatype.number({min: 1, max: 20}),
        address: faker.address.streetAddress(),
        postal_code: faker.address.zipCode(),
        subject_id: 2, // Pick a random subject ID
        teacher_id: null, // Pick a random subject ID
        student_id: 6, // Pick a random subject ID
        
    });
    lessons.push({
        name: 'Math',
        day: faker.date.weekday(),
        // date: faker.date.future(),
        date: "2024-07-15",
        time_start: "14:00",
        time_end: "15:00",
        duration:  60,
        mode: faker.random.arrayElement(['Online', 'Offline']),
        type: faker.random.arrayElement(['Lecture', 'Tutorial', 'Lab']),
        // status: faker.random.arrayElement(['Open', 'Matched']),
        status: "Open",
        is_hide: 0,
        rate: faker.datatype.number({min: 50, max: 200}),
        pax: faker.datatype.number({min: 1, max: 20}),
        address: faker.address.streetAddress(),
        postal_code: faker.address.zipCode(),
        subject_id: 2, // Pick a random subject ID
        teacher_id: 5, // Pick a random subject ID
        student_id: null, // Pick a random subject ID
        
    })
    // student lesson
    lessons.push({
        name: 'Student Music',
        day: faker.date.weekday(),
        // date: faker.date.future(),
        date: "2024-07-16",
        time_start: "16:00",
        time_end: "17:00",
        duration:  60,
        mode: faker.random.arrayElement(['Online', 'Offline']),
        type: faker.random.arrayElement(['Lecture', 'Tutorial', 'Lab']),
        // status: faker.random.arrayElement(['Open', 'Matched']),
        status: "Open",
        is_hide: 0,
        rate: faker.datatype.number({min: 50, max: 200}),
        pax: faker.datatype.number({min: 1, max: 20}),
        address: faker.address.streetAddress(),
        postal_code: faker.address.zipCode(),
        subject_id: 5, // Pick a random subject ID
        teacher_id: null, // Pick a random subject ID
        student_id: 6, // Pick a random subject ID
        
    })

    return knex('lessons').insert(lessons);
};