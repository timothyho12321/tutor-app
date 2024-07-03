const express = require('express');
const path = require('path'); 
const router = express.Router();
const User = require('../models/User'); // Assuming you have a User model defined
const Teacher = require('../models/Teacher');
const Booking = require('../models/Booking');
const Lesson = require('../models/Lesson');
const SubjectTeacher = require('../models/Subject Teacher');
const Subject = require('../models/Subject');
const Student = require('../models/Student');

//const knexConfig = require('knex');
// const knexConfig = require('../knexfile'); // adjust the path to your knexfile.js
// const knex = require('knex')(knexConfig);
class LoginController {
    constructor() {
        this.router = require('express').Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get('/testlogindatabase', this.testDatabaseConnection);
        this.router.get('/loginuser', this.getLoginUser);
        this.router.post('/loginuser', this.postLoginUser.bind(this));
        this.router.get('/success', this.getSuccess.bind(this));
    }

    async testDatabaseConnection(req, res) {
        res.send("hi");
        let users = await User.query();
        console.log(users);
    }

    getLoginUser(req, res) {
        res.render('login', { messages: req.flash() });
    }

    async postLoginUser(req, res) {
        let loginUser = {
            username: req.body.username,
            password: req.body.password,
        };

        let user = await User.findOne({ username: loginUser.username, password: loginUser.password });

        if (user) {
            req.session.userid = user.id;
            req.session.role = user.role;
            req.session.username = user.username;

            res.cookie('userid', user.id, { httpOnly: true });
            res.cookie('role', user.role, { httpOnly: true });
            res.cookie('username', user.username, { httpOnly: true });

            res.redirect('/login/success');
        } else {
            req.flash('error', 'Invalid username or password');
            res.render('login', { messages: req.flash() });
        }
    }

    async getSuccess(req, res) {
        if (req.session.role == 'teacher') {
            let teacher = await Teacher.query().findOne({ user_id: req.session.userid });
            res.cookie('teacher_id', teacher.id, { httpOnly: true });

            let lessons = teacher ? await Lesson.query().where('lessons.teacher_id', teacher.id) : [];

            let insertBookings = [];
            for (let lesson of lessons) {
                let bookings = await Booking.query().where('bookings.lesson_id', lesson.id);
                insertBookings.push(...bookings);
            }

            let subjectsTeacherSave = [];
            if (teacher) {
                let subjectsTeacher = await SubjectTeacher.findAllByTeacherId(teacher.id);
                for (let eachSubjectTeacher of subjectsTeacher) {
                    let subjectNameSave = await Subject.query().findOne({ id: eachSubjectTeacher.subject_id });
                    subjectsTeacherSave.push(subjectNameSave.name);
                }
            }
            res.cookie('subjects_teacher', subjectsTeacherSave, { httpOnly: true });

            let events = [...this.mapLessonsToEvents(lessons), ...this.mapBookingsToEvents(insertBookings)];

            res.render('home_teacher', {
                events: JSON.stringify(events),
                teacherId: teacher.id,
            });
        } else if (req.session.role == 'student') {
            let student = await Student.query().findOne({ user_id: req.session.userid });
            res.cookie('student_id', student.id, { httpOnly: true });

            let lessons = student ? await Lesson.query().where('lessons.student_id', student.id) : [];

            let insertBookings = [];
            for (let lesson of lessons) {
                let bookings = await Booking.query().where('bookings.lesson_id', lesson.id);
                insertBookings.push(...bookings);
            }

            let subjectsStudentSave = [];
            if (student) {
                let subjectsStudent = await SubjectTeacher.findAllByTeacherId(teacher.id);
                for (let eachSubjectTeacher of subjectsStudent) {
                    let subjectNameSave = await Subject.query().findOne({ id: eachSubjectTeacher.subject_id });
                    subjectsStudentSave.push(subjectNameSave.name);
                }
            }
            res.cookie('subjects_student', subjectsStudentSave, { httpOnly: true });

            let events = [...this.mapLessonsToEvents(lessons), ...this.mapBookingsToEvents(insertBookings)];

            res.render('home_student', {
                events: JSON.stringify(events),
                studentId: student.id,
            });
        }
    }

    mapLessonsToEvents(lessons) {
        return lessons.map(lesson => {
            let date = new Date(lesson.date);
            let [hours, minutes] = lesson.time_start.split(':').map(Number);
            date.setHours(hours + 8); // Adjust for timezone
            date.setMinutes(minutes);

            return {
                start: date,
                title: lesson.name,
                url: '/lesson/' + lesson.id,
                color: 'blue',
                id: lesson.id
            };
        });
    }

    mapBookingsToEvents(bookings) {
        return bookings.map(booking => {
            let date = new Date(booking.date);
            let [hours, minutes] = booking.time_start.split(':').map(Number);
            date.setHours(hours + 8); // Adjust for timezone
            date.setMinutes(minutes);

            return {
                start: date,
                title: booking.name,
                url: '/booking/' + booking.id,
                color: 'green',
                id: booking.id
            };
        });
    }
}

// Usage with Express router
const loginController = new LoginController();
module.exports = loginController.router;
