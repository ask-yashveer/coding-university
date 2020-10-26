const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../db/config');
const router = express.Router();
const User = require('../models/user.model');


router.route('/:id')
    .put(function (req, res) {
        User.findById(req.params.id,
            function (err, user) {
                if (err) {
                    res.status(500).json(err.stack);
                    return;
                }
                user.email = req.body.email;
                user.password = req.body.password;
                user.save(function (err) {
                    if (err) {
                        res.status(500).json(err.stack);
                        return;
                    }
                    res.status(200).json({ message: 'User Update!' });
                });
            });
    });

//Login User 
router.post('/login', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.getUserByUserName(email, (err, user) => {
        if (err) throw err;
        if (!user)
            return res.json({
                success: false,
                msg: 'Candidate not found'
            })
            //comparing password through comparePassword() function
        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user.toObject(), config.secret, { expiresIn: 604800 })
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        age: user.age,
                        mobileNumber: user.mobileNumber,
                        email: user.email,
                        courses: user.courses
                    }
                });
            }
            else {
                return res.json({
                    success: false,
                    msg: 'Wrong Password'
                });
            }
        });
    });
});

//Get User Profile
router.get('/profile', passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.json({ user: req.user });
    })
  
//Exporting all Routes
module.exports = router;