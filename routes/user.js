const express = require('express');
const path = require('path'); 
const router = express.Router();
const db = require('./db'); 
const User = require('../models/user'); // Assuming you have a User model defined


router.get('/createuser', (req, res) => {
    res.sendFile(path.join(__dirname, '..','views', 'createuser.html'));
});

router.post('/createuser', async (req, res) => {

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
        res.send('User created...');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating user');
    }
      
});

module.exports = router;