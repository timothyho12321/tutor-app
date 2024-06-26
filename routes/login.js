const express = require('express');
const path = require('path'); 
const router = express.Router();
const User = require('../models/User'); // Assuming you have a User model defined
const Teacher = require('../models/Teacher');
const Booking = require('../models/Booking');
const Lesson = require('../models/Lesson');

//const knexConfig = require('knex');
// const knexConfig = require('../knexfile'); // adjust the path to your knexfile.js
// const knex = require('knex')(knexConfig);

router.get('/testlogindatabase', (req, res) => {
    res.send("hi");
    async function testDatabaseConnection() {
    let users = await User.query();
    console.log(users);
    }

    testDatabaseConnection();
});

// not working
// sssssss

router.get('/loginuser', (req, res) => {
    // res.sendFile(path.join(__dirname, '..','views', 'login.ejs'));
    res.render('login',{ messages: req.flash() });
});

router.post('/loginuser', async (req, res) => {

    let loginUser = {
        username: req.body.username,
        password: req.body.password,
    
    };

    // console.log("0 "+req.body);
    // console.log("1 "+loginUser.username);
    // console.log("2 "+loginUser.password);
    let user = await User.findOne({username: loginUser.username, password: loginUser.password});
    // console.log(user);

    if(user) {
        req.session.userid = user.id;
        req.session.role = user.role;
        req.session.username = user.username;
        res.redirect('/login/success');
        // res.send("hi");
    } else {
        req.flash('error', 'Invalid username or password');
       
        // res.redirect('/login/loginuser');
        res.render('login', { messages: req.flash() });
    }
      
});


router.get('/success', async (req, res) => {
    if (req.session.role == 'teacher') {
        //res.sendFile(path.resolve('views/home_teacher.html'));
         // Fetch scheduled lessons from the database
         console.log("check1 "+req.session.userid);
         let teacher = await Teacher.query().findOne({user_id: req.session.userid});
         console.log("check2 "+teacher.id);


         let lessons;
         if (teacher) {
            lessons = await Lesson.query().where('lessons.teacher_id', teacher.id);
            // lessons are the id of lessons that the teacher is teaching
            // can be multiple lessons
        }
         
         for (let oneLesson of lessons) {

            console.log("check3 "+oneLesson.id);
           }
        let scheduledLessons = [];
        if (lessons){
            for (let lesson of lessons) {
                let bookings = await Booking.query().where('bookings.lesson_id', lesson.id);
                scheduledLessons.push(...bookings);
            }
        }

        for (let singleLesson of scheduledLessons) {

        //  console.log("check4 "+singleLesson.id);
         console.log("check5 "+singleLesson.date);
         console.log("check6 "+singleLesson.time);
        }

        //not working retrieve from belongs to with two tables
         //let scheduledLessons;
        // if (teacher) {
        //        scheduledLessons = await Booking.query().withGraphJoined('lessons.teacher').where('lessons.teacher.id', teacher.id);
        
        //    }
        //console.log("check3 "+scheduledLessons);
         // Convert the lessons to the format expected by FullCalendar
         let events = scheduledLessons.map(lesson => {
            let date = new Date(lesson.date);
            let [hours, minutes] = lesson.time_start.split(':').map(Number); // Split the time into hours and minutes
        
            // Adjust the date object to Singapore's timezone
            date.setHours(hours + 8); // Singapore is 8 hours ahead of UTC
            date.setMinutes(minutes);
        
            return {
                start: date, // Combine the date and time into a single Date object
                title: lesson.name,
                url: '/lesson/' + lesson.id
         };
         });
 
         // Send the HTML file and the events data
         //res.sendFile(path.resolve('views/home_teacher_html.html'));
         res.render('home_teacher', { events: JSON.stringify(events) });
         
    } else if (req.session.role == 'student') {
        res.sendFile(path.resolve('views/home_student.html'));
        
    }
});


module.exports = router;