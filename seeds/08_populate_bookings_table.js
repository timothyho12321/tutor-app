// Filename: seeds/populate_teachers_table.js
const faker = require('faker');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
    // Get all lesson IDs
    const lessons = await knex('lessons').select('id');
    const lessonIds = lessons.map(lesson => lesson.id);

    const subjects = await knex('subjects').select('id');
    const subjectIds = subjects.map(subject => subject.id);

    const teachers = await knex('teachers').select('id');
    const teacherIds = teachers.map(teacher => teacher.id);

    const students = await knex('students').select('id');
    const studentIds = students.map(student => student.id);
    // Check if there are enough lesson IDs
    if (lessonIds.length < 5) {
        throw new Error('Not enough lessons in the Lesson table. Please make sure there are at least 5 lessons before running this seed script.');
    }

    
    // Inserts seed entries
    const bookings = Array.from({length: 5}).map(() => {

        const date = faker.date.future();
        // const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        const time_start = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        const endDate = new Date(date.getTime() + 60*60*1000); // Add one hour
        const time_end = `${endDate.getHours()}:${endDate.getMinutes()}:${endDate.getSeconds()}`;

        return{
        name: faker.random.arrayElement(['Lesson A', 'Lesson B', 'Lesson C', 'Lesson D']),
        subject: faker.random.arrayElement(['Math', 'Science', 'English', 'History', 'Art']),
        day: faker.date.weekday(),
        date: faker.date.future(),
        // time: time,
        time_start: time_start, 
        time_end: time_end,
        duration: faker.datatype.number({min: 60, max: 240}),
        mode: faker.random.arrayElement(['Online', 'Offline']),
        type: faker.random.arrayElement(['Lecture', 'Tutorial', 'Lab']),
        status: faker.random.arrayElement(['Scheduled', 'Completed', 'Cancelled']),
        is_hide: faker.datatype.boolean() ? 1 : 0,
        rate: faker.datatype.number({min: 50, max: 200}),
        pax: faker.datatype.number({min: 1, max: 20}),
        address: faker.address.streetAddress(),
        postal_code: faker.address.zipCode(),
        link: faker.internet.url(),
        is_paid: faker.datatype.boolean() ? 1 : 0,
        paid_amount: faker.datatype.number({min: 50, max: 200}),
        paid_date: faker.date.past(),
        payor: faker.name.findName(),
        feedback: faker.lorem.paragraph(),
        lesson_id: faker.random.arrayElement(lessonIds), // Pick a random lesson ID
        subject_id: faker.random.arrayElement(subjectIds), // Pick a random subject ID
        teacher_id: faker.random.arrayElement(teacherIds), // Pick a random subject ID
        student_id: faker.random.arrayElement(studentIds), // Pick a random subject ID
        
        };
    });

    const date = faker.date.future();
    const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    bookings.push({
        name: 'Lesson A',
        subject: 'Math',
        day: faker.date.weekday(),
        date: "2024-07-15",
        // time: "14:00",
        time_start: "14:00",
        time_end: "15:00",
        duration:  60,
        mode: faker.random.arrayElement(['Online', 'Offline']),
        type: faker.random.arrayElement(['Lecture', 'Tutorial', 'Lab']),
        status: faker.random.arrayElement(['Scheduled', 'Completed', 'Cancelled']),
        is_hide: faker.datatype.boolean() ? 1 : 0,
        rate: faker.datatype.number({min: 50, max: 200}),
        pax: faker.datatype.number({min: 1, max: 20}),
        address: faker.address.streetAddress(),
        postal_code: faker.address.zipCode(),
        link: faker.internet.url(),
        is_paid: faker.datatype.boolean() ? 1 : 0,
        paid_amount: faker.datatype.number({min: 50, max: 200}),
        paid_date: faker.date.past(),
        payor: faker.name.findName(),
        feedback: faker.lorem.paragraph(),
        lesson_id: 6, // Pick a random lesson ID
        
    })

    return knex('bookings').insert(bookings);
};