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
         //console.log("check1 "+req.session.userid);
         let teacher = await Teacher.query().findOne({user_id: req.session.userid});
         //console.log("check2 "+teacherId);
         let scheduledLessons;
         if (teacher) {
                scheduledLessons = await Booking.query().withGraphJoined('lessons.teacher').where('lessons.teacher.id', teacher.id);
        
            }
        console.log("check3 "+scheduledLessons);
         // Convert the lessons to the format expected by FullCalendar
         //let events = scheduledLessons.map(lesson => ({
         //  title: lesson.title,
         //    start: lesson.start_time,
         //    end: lesson.end_time,
         //    url: '/lesson/' + lesson.id
         //}));
 
         // Send the HTML file and the events data
         res.render('home_teacher');
         //res.render('home_teacher', { events: JSON.stringify(events) });
     
    } else if (req.session.role == 'student') {
        res.sendFile(path.resolve('views/home_student.html'));
        
    }
});


module.exports = router;