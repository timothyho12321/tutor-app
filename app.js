const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session'); 
const userRouter = require('./routes/user');
const loginRouter = require('./routes/login');
const flash = require('connect-flash');

const app = express();

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

app.listen('3080', () => {
    console.log('Server started on http://localhost:3080')
});
