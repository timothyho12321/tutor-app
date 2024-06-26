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
    res.sendFile(path.join(__dirname, '..','views', 'add_lesson.html'));
});

router.post('/post-lesson', async (req, res) => {

    let newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        dob: req.body.dob,
        username: req.body.username,
        password: req.body.password,
        address: req.body.address,
        handphone_num: req.body.handphone_num,
        email: req.body.email,
        role: req.body.role
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