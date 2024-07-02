const express = require('express');
const path = require('path'); 
const router = express.Router();
const User = require('../models/User'); // Assuming you have a User model defined
const Teacher = require('../models/Teacher');
const Booking = require('../models/Booking');
const Lesson = require('../models/Lesson');


router.get('/testlogindatabase', (req, res) => {
    res.send("hi");
    async function testDatabaseConnection() {
    let users = await User.query();
    console.log(users);
    }

    testDatabaseConnection();
});


router.get('/add-lesson', async (req, res) => {
    // res.sendFile(path.join(__dirname, '..','views', 'add_lesson.html'));
   
    const teacherId = req.cookies.userid;   
    const subjects = req.cookies.subjects_teacher;
    // console.log("hi ",req.session.id);
    console.log("hi ",subjects);
    if (typeof subjects === 'string') {
        subjects = subjects.split(','); // Assuming subjects_teacher is a comma-separated string
    }

    res.render('add_lesson', {
        // Pass any necessary data to your template here
        teacherId: teacherId, 
        subjects: subjects
    });

});

router.post('/post-lesson', async (req, res) => {

    let insert_day = new Date(req.body.date.getDay()); 
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    insert_day = days[new Date(req.body.date).getDay()]; // This converts the day number to a day name
    
    let newLesson = {
        name: req.body.name,
        subject: req.body.subject,
        day: insert_day,
        date: req.body.date,
        time_start: req.body.time_start,
        time_end: req.body.time_end,
        mode: req.body.mode,
        type: req.body.type,
        status: req.body.status,
        is_available: req.body.is_available,
        rate: req.body.rate,
        pax: req.body.pax,
        address: req.body.address,
        postal_code: req.body.postal_code,
        subject_id: req.body.subject_id,
        teacher_id: req.body.teacher_id,
        student_id: req.body.student_id
    };

    try {
        const user = await User.query().insert(newUser);
        console.log(user);
        res.redirect('/user/success');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating user');
    }
});


module.exports = router;