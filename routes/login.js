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
        req.session.userid = user._id;
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
        res.sendFile(path.resolve('/views/home_teacher.html'));
        
    } else if (req.session.role == 'student') {
        res.sendFile(path.resolve('/views/home_student.html'));
        
    }
});


module.exports = router;