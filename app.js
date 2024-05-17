const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');
const databaseRouter = require('./routes/db');
const userRouter = require('./routes/user');



const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user', userRouter);

app.listen('3080', () => {
    console.log('Server started on http://localhost:3080')
});
