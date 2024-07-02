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
   
    const teacherId = req.cookies.teacher_id;   
    const subjects = req.cookies.subjects_teacher;
    // console.log("hi ",req.session.id);
    // console.log("hi ",subjects);
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

    const insertDate = new Date(req.body.date); // Convert the string to a Date object
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let insert_day = days[insertDate.getDay()]; // Now you can correctly call getDay() on the Date object
    // console.log("1 ",insertDate);

    const subject = req.body.subject;
    const teacherId = req.cookies.teacher_id;  
    // console.log("2 ",subject);

    let insert_duration = calculateDuration(req.body.time_start, req.body.time_end);
    let newLesson = {
        name: req.body.name,
        subject_id: subject,
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
        teacher_id: teacherId
    };

    try {
        const lesson = await Lesson.query().insert(newLesson);
        console.log(lesson);
        res.redirect('/user/success');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating user');
    }
});

function calculateDuration(startTime, endTime) {
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);

    const startDate = new Date(0, 0, 0, startHours, startMinutes);
    const endDate = new Date(0, 0, 0, endHours, endMinutes);

    const duration = (endDate - startDate) / (1000 * 60); // Convert milliseconds to minutes
    return duration;
}


module.exports = router;