const express = require('express');
const path = require('path'); 
const router = express.Router();
const User = require('../../models/User'); // Assuming you have a User model defined
const Teacher = require('../../models/Teacher');
const Booking = require('../../models/Booking');
const Lesson = require('../../models/Lesson');
const SubjectTeacher = require('../../models/Subject Teacher');
const Subject = require('../../models/Subject');

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

        // Storing in cookies
        res.cookie('userid', user.id, { httpOnly: true }); // httpOnly: true is recommended for security
        res.cookie('role', user.role, { httpOnly: true });
        res.cookie('username', user.username, { httpOnly: true });


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
        //  console.log("check1 "+req.session.userid);
        let teacher = await Teacher.query().findOne({user_id: req.session.userid});
        //  console.log("check2 "+teacher.id);

        res.cookie('teacher_id', teacher.id, { httpOnly: true });
        
        let lessons;
        if (teacher) {
            
            lessons = await Lesson.query().where('lessons.teacher_id', teacher.id);
            // lessons are the id of lessons that the teacher is teaching
            // can be multiple lessons
            // lessons are also used for lessonEvents in calender
        }
         
        for (let oneLesson of lessons) {
            // console.log("check3 "+oneLesson.id);
        }
        let insertBookings = [];
        if (lessons){
            for (let lesson of lessons) {
                let bookings = await Booking.query().where('bookings.lesson_id', lesson.id);
                insertBookings.push(...bookings);
            }
        }

        for (let singleLesson of insertBookings) {

        //  console.log("check4 "+singleLesson.id);
        //  console.log("check5 "+singleLesson.date);
        //  console.log("check6 "+singleLesson.time);
        }
        subjectsTeacherSave = [];
        if (teacher) {
            // subjectsTeacher = await SubjectTeacher.findAll();
            subjectsTeacher = await SubjectTeacher.findAllByTeacherId(teacher.id);
            // subjects are the id of subjects that the teacher is teaching
            // can be multiple subjects
            // console.log("check7 "+subjectsTeacher);
            for (let eachSubjectTeacher of subjectsTeacher) {
               checkSubjectId = eachSubjectTeacher.subject_id;

                subjectNameSave = await Subject.query().findOne({id: checkSubjectId});
                
                // console.log("check11 "+subjectNameSave.name);
                // subjectsTeacherSave.push(eachSubjectTeacher.subject_id);
                subjectsTeacherSave.push(subjectNameSave.name);
            }
        }
        // console.log("check12 "+subjectsTeacherSave);
        res.cookie('subjects_teacher', subjectsTeacherSave, { httpOnly: true });
        

        let lessonEvents = lessons.map(lesson => {
            let date = new Date(lesson.date);
            console.log("check13 ",date);
            let [hours, minutes] = lesson.time_start.split(':').map(Number);
            date.setHours(hours + 8); // Adjust for timezone
            date.setMinutes(minutes);
        
            return {
                start: date,
                title: lesson.name,
                url: '/lesson/' + lesson.id,
                color: 'blue', // Color for lessons
                id: lesson.id
            };
        });
        

        let bookingEvents = insertBookings.map(booking => {
            let date = new Date(booking.date);
            let [hours, minutes] = booking.time_start.split(':').map(Number);
            date.setHours(hours + 8); // Adjust for timezone
            date.setMinutes(minutes);
        
            return {
                start: date,
                title: booking.name,
                url: '/booking/' + booking.id,
                color: 'green', // Color for bookings
                id: booking.id
            };
        });
        
        let events = lessonEvents.concat(bookingEvents);



         // Send the HTML file and the events data
         //res.sendFile(path.resolve('views/home_teacher_html.html'));
         res.render('home_teacher', { 
            events: JSON.stringify(events),
            teacherId: teacher.id, 
            // subject: teacher.subject,
         });
         
    } else if (req.session.role == 'student') {
        res.sendFile(path.resolve('views/home_student.html'));
        
    }
});


module.exports = router;