const express = require('express');
const config = require('../db/config');
const passport = require('passport');
const router = express.Router();
let User = require('../models/user.model');
let Course = require('../models/course.model').Course;


//Get user
router.route('/').get(function (req, res) {
    User.find(function (err, users) {
        if (err) {
            res.status(500).json(err.stack);
            return;
        }
        res.status(200).json(users);
    });
});

//Get user by id
router.route('/:id')
    .get(function (req, res) {
        User.findById(req.params.id, { __v: 0 },
            function (err, user) {
                if (err) {
                    res.status(500).json(err.stack);
                    return;
                }
                res.status(200).json(user);
            });
    });

// Register user 
router.route('/').post(function (req, res) {
    var user = new User();
    let newUser = new User({
        email: req.body.email,
        password: req.body.password
    });
    user.courseId = req.body.courseId;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.age = req.body.age;
    user.mobileNumber = req.body.mobileNumber;
    user.email = req.body.email;
    user.courses = req.body.courses;
    user.password = req.body.password;
    User.addUser(user, (err, user) => {
        if (err) {
            res.json({
                success: false,
                msg: 'Failed to Register'
            });
        }
        else {
            res.json({
                success: true,
                msg: 'Admin is Register'
            })
        }
    });
});

//Delete user by id
router.route('/:id')
    .delete(function (req, res) {
        User.remove({ _id: req.params.id },
            function (err, user) {
                if (err) {
                    res.status(500).json(err.stack);
                    return;
                }
                res.status(200).json({ message: 'User Successfully Deleted!' });
            })
    });

    //Delete courses of a particular user
router.route('/:uid/courses/:cid').delete(function (req, res) {
    let courses = [];
    let newcourses = [];
    User.findById(req.params.uid, function (err, user) {
        courses = user.courses;
        for (let c of courses) {
            if (c._id != req.params.cid) {
                newcourses.push(c);
            }
        }
        user.courses = newcourses;
        user.save(function (err) {
        })
        res.status(200).json({
            courses: newcourses
        });
    });
});

//Update course by id
router.route('/update/:id')
    .put(function (req, res) {
        User.findById(req.params.id,
            function (err, user) {
                if (err) {
                    res.status(500).json(err.stack);
                    return;
                }
                user.firstName = req.body.firstName;
                user.lastName = req.body.lastName;
                user.age = req.body.age;
                user.mobileNumber = req.body.mobileNumber;
                user.email = req.body.email;
                user.password = req.body.password;
                user.courses = req.body.courses;
                user.save(function (err) {
                    if (err) {
                        res.status(500).json(err.stack);
                        return;
                    }
                    res.status(200).json({ message: 'User Update!' });
                });
            });
    });

    //User Login
router.post('/login', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.getUserByUserName(email, (err, user) => {
        if (err) throw err;
        if (!user)
            return res.json({
                success: false,
                msg: 'Admin not found'
            })
        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user.toObject(), config.secret, { expiresIn: 604800 })
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email
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

//Profile view of User
router.get('/profile', passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.json({ user: req.user });
    })

//Exporting all Routes
module.exports = router;
