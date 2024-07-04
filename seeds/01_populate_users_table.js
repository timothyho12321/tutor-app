// Filename: seeds/populate_users_table.js
const faker = require('faker');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function(knex) {
     // Inserts seed entries
     const users = Array.from({length: 5}).map(() => ({
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        dob: faker.date.past(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
        address: faker.address.streetAddress(),
        handphone_num: faker.phone.phoneNumber(),
        email: faker.internet.email(),
        role: faker.random.arrayElement(['teacher', 'student']),
    }));

    users.push({
        first_name: "Sam",
        last_name: "Chua",
        dob: faker.date.past(),
        username: "sam",
        password: "abc",
        address: faker.address.streetAddress(),
        handphone_num: faker.phone.phoneNumber(),
        email: faker.internet.email(),
        role: 'teacher'
    });

    users.push({
        first_name: "Vera",
        last_name: "Tan",
        dob: faker.date.past(),
        username: "vera",
        password: "abc",
        address: faker.address.streetAddress(),
        handphone_num: faker.phone.phoneNumber(),
        email: faker.internet.email(),
        role: 'student'
    });

    return knex('users').insert(users);
};