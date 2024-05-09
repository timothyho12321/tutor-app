const express = require('express');
const mysql = require('mysql');
const path = require('path');

//connect to db 
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tutor'
});

//connect
db.connect((err) => {

    if(err){
        throw err;
    }
    console.log('MySql Connected...');

});


const app = express() ;

// route to create db 
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE tutor'; 
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database created...');
    });
});

// create table users
app.get('/createusertable', (req, res) => {
    let sql = 'CREATE TABLE users(id int AUTO_INCREMENT, '+
        'name VARCHAR(255), email VARCHAR(255),'+
        'contact VARCHAR(255), address VARCHAR(255),'+
        'password VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Users table created...');
    });
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/createuser', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'createuser.html'));
});

app.post('/createuser', (req, res) => {
    let sql = 'INSERT INTO users SET ?';
    let newUser = {
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        address: req.body.address,
        password: req.body.password
    };
    db.query(sql, newUser, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('User created...');
    });
});

app.listen('3000', () => {
    console.log('Server started on http://localhost:3000')
});


