const express = require('express');
const path = require('path'); 
const router = express.Router();
const User = require('../models/User'); // Assuming you have a User model defined
const Teacher = require('../models/Teacher');
const Booking = require('../models/Booking');
const Lesson = require('../models/Lesson');
const Subject = require('../models/Subject');

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
            // console.log(lesson);
            const lessonId = lesson.id; 
            res.redirect(`/login/success`);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error creating user');
        }
    }

    async editLessonView(req, res) {
        
        const search_id = req.query.id; 
        // console.log("search_id: ", search_id);  
        // let lesson = await Lesson.query().where('lessons.teacher_id', search_id);
        let lesson = await Lesson.query().findById(search_id);
        // console.log("date: ", lesson.date);  
        // const search_id = req.query.id; 
        
        if (!lesson) {
            return res.status(404).send("Lesson not found");
        }
        
        // Format the date to YYYY-MM-DD
        // const date = new Date(lesson.date);
        // const formattedDate = date.toISOString().split('T')[0]; // Extracts date part

         // Adjust the date to the local timezone
        let date = new Date(lesson.date);
        let [hours, minutes] = lesson.time_start.split(':').map(Number);
        date.setHours(hours + 8); // Adjust for timezone (+8 hours)
        date.setMinutes(minutes);
        const formattedDate = date.toISOString().split('T')[0]; // Extracts date part

        const subject_id = lesson.subject_id; 
        // console.log("subject_id: ", subject_id);  
        // let lesson = await Lesson.query().where('lessons.teacher_id', search_id);
        let searchSubject = await Subject.query().findById(subject_id);
        

        // Pass all lesson fields to the view
        res.render('edit_lesson', {
            name: lesson.name,
            subject: searchSubject.name,
            date: formattedDate,
            time_start: lesson.time_start,
            time_end: lesson.time_end,
            mode: lesson.mode,
            type: lesson.type,
            status: lesson.status,
            is_available: lesson.is_available,
            rate: lesson.rate,
            pax: lesson.pax,
            address: lesson.address,
            postal_code: lesson.postal_code,
            lesson_id: search_id
        });
    }
    async editLesson(req, res) {


        const insertDate = new Date(req.body.date);
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let insert_day = days[insertDate.getDay()];

        let insert_duration = this.calculateDuration(req.body.time_start, req.body.time_end);
        let editLesson = {
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
            is_available: req.body.is_available,
            rate: req.body.rate,
            pax: req.body.pax,
            address: req.body.address,
            postal_code: req.body.postal_code,
            teacher_id: req.cookies.teacher_id
        };

        try {
            const lessonId = req.body.lesson_id;
            console.log("lessonId",lessonId);
            const lesson = await Lesson.query().findById(lessonId).patch(editLesson);
        
            // console.log(lesson);
            res.redirect('/login/success');
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
router.post('/edit-lesson', (req, res) => lessonController.editLesson(req, res));


module.exports = router;