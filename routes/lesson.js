const express = require('express');
const path = require('path'); 
const router = express.Router();
const User = require('../models/User'); // Assuming you have a User model defined
const Teacher = require('../models/Teacher');
const Booking = require('../models/Booking');
const Lesson = require('../models/Lesson');

class LessonController {
    async addLesson(req, res) {
        let subjects = req.cookies.subjects_teacher;
        const entered_date = req.query.date;

        if (typeof subjects === 'string') {
            subjects = subjects.split(','); // Assuming subjects_teacher is a comma-separated string
        }

        res.render('add_lesson', {
            teacherId: req.cookies.teacher_id,
            subjects: subjects,
            date: entered_date
        });
    }

    async postLesson(req, res) {
        const insertDate = new Date(req.body.date);
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let insert_day = days[insertDate.getDay()];

        let insert_duration = this.calculateDuration(req.body.time_start, req.body.time_end);
        let newLesson = {
            name: req.body.name,
            subject_id: req.body.subject,
            day: insert_day,
            date: insertDate,
            time_start: req.body.time_start,
            time_end: req.body.time_end,
            duration: insert_duration,
            mode: req.body.mode,
            type: req.body.type,
            status: req.body.status,
            is_available: 1,
            rate: req.body.rate,
            pax: req.body.pax,
            address: req.body.address,
            postal_code: req.body.postal_code,
            teacher_id: req.cookies.teacher_id
        };

        try {
            const lesson = await Lesson.query().insert(newLesson);
            console.log(lesson);
            res.redirect('/user/success');
        } catch (err) {
            console.error(err);
            res.status(500).send('Error creating user');
        }
    }

    async editLessonView(req, res) {
        
        res.render('add_lesson', {
            teacherId: req.cookies.teacher_id,
            subjects: subjects,
            date: entered_date
        });
    }
    async editLesson(req, res) {
        const insertDate = new Date(req.body.date);
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let insert_day = days[insertDate.getDay()];

        let insert_duration = this.calculateDuration(req.body.time_start, req.body.time_end);
        let newLesson = {
            name: req.body.name,
            subject_id: req.body.subject,
            day: insert_day,
            date: insertDate,
            time_start: req.body.time_start,
            time_end: req.body.time_end,
            duration: insert_duration,
            mode: req.body.mode,
            type: req.body.type,
            status: req.body.status,
            is_available: 1,
            rate: req.body.rate,
            pax: req.body.pax,
            address: req.body.address,
            postal_code: req.body.postal_code,
            teacher_id: req.cookies.teacher_id
        };

        try {
            const lesson = await Lesson.query().insert(newLesson);
            console.log(lesson);
            res.redirect('/user/success');
        } catch (err) {
            console.error(err);
            res.status(500).send('Error creating user');
        }
    }

    calculateDuration(startTime, endTime) {
        const [startHours, startMinutes] = startTime.split(':').map(Number);
        const [endHours, endMinutes] = endTime.split(':').map(Number);

        const startDate = new Date(0, 0, 0, startHours, startMinutes);
        const endDate = new Date(0, 0, 0, endHours, endMinutes);

        return (endDate - startDate) / (1000 * 60); // Convert milliseconds to minutes
    }
}

// Usage with Express router
const lessonController = new LessonController();
router.get('/add-lesson', (req, res) => lessonController.addLesson(req, res));
router.post('/post-lesson', (req, res) => lessonController.postLesson(req, res));
router.get('/edit-lesson', (req, res) => lessonController.editLessonView(req, res));
router.post('/edit-lesson', (req, res) => lessonController.editLessonView(req, res));


module.exports = router;