const express = require('express');
const path = require('path'); 
const router = express.Router();
const db = require('./db'); 
const User = require('../models/User'); // Assuming you have a User model defined
const Teacher = require('../models/Teacher');




router.get('/testlogindatabase', (req, res) => {
    res.send("hi");
    async function testDatabaseConnection() {
    let users = await User.query();
    console.log(users);
    }

    testDatabaseConnection();
});

router.get('/loginuser', (req, res) => {
    res.sendFile(path.join(__dirname, '..','views', 'login.html'));
    
});

router.post('/loginuser', async (req, res) => {

    let loginUser = {
        username: req.body.username,
        password: req.body.password,
    
    };

    let user = await User.findOne({username: loginUser.username, password: loginUser.password});

    if(user) {
        req.session.userid = user._id;
        req.session.role = user.role;
        req.session.username = user.username;
        // res.redirect('/login/success');
        res.send("hi");
    } else {
        req.flash('error', 'Invalid username or password');
        // res.redirect('/loginuser');
        res.send("try again");
    }
      
});


router.get('/success', async (req, res) => {
    if (req.session.role == 'teacher') {
        let teacher_profile_exists = await Teacher.findOne({user_id: req.session.userid});

        if (teacher_profile_exists) {
            res.sendFile(path.resolve('views/success_teacher.html'));
        } else {
            res.sendFile(path.resolve('views/teacher_profile.html'));
        }
    }
});


module.exports = router;