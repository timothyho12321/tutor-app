const cookieParser = require('cookie-parser');
const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session'); 
const userRouter = require('./routes/user');
const loginRouter = require('./routes/login');
const lessonRouter = require('./routes/lesson');
const bookingRouter = require('./routes/booking');
const studentLessonRouter = require('./routes/student_lesson');
const studentBookingRouter = require('./routes/student_booking');
const flash = require('connect-flash');

const app = express();


// Use cookie-parser middleware
app.use(cookieParser());

// Set EJS as the view engine
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'applepie', // replace 'your secret key' with your actual secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // set to true if you're using https
  }));

app.use(flash());
  
app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/lesson', lessonRouter);
app.use('/student-lesson', studentLessonRouter);
app.use('/booking', bookingRouter); 
app.use('/student-booking', studentBookingRouter);

app.listen('3080', () => {
    console.log('Server started on http://localhost:3080')
});
