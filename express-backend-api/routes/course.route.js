const express = require('express');
const mongoose = require('mongoose');
const config = require('../db/config');
const router = express.Router();
let Course = require('../models/course.model').Course;

//Get Courses
router.route('/').get(function (req, res) {
    Course.find(function (err, course) {
        if (err) {
            res.status(500).json(err.stack);
            return;
        }
        res.status(200).json(course);
    });
});

//Get Courses by id
router.route('/:id')
    .get(function (req, res) {
        Course.findById(req.params.id, { __v: 0 },
            function (err, course) {
                if (err) {
                    res.status(500).json(err.stack);
                    return;
                }
                res.status(200).json(course);
            });
    });

//Posting Courses 
router.route('/').post(function (req, res) {
    var course = new Course();
    course.courseId = req.body.courseId;
    course.courseName = req.body.courseName;
    course.courseDuration = req.body.courseDuration;
    course.courseFee = req.body.courseFee;
    course.save(function (err) {
        if (err) {
            res.status(500).json(err.stack);
            return;
        }
        console.log("Added");
        res.status(200).json({ message: 'Course Created!' });
    });
});

//Delete Course by id
router.route('/:id')
    .delete(function (req, res) {
        Course.remove({ _id: req.params.id },
            function (err, course) {
                if (err) {
                    res.status(500).json(err.stack);
                    return;
                }
                res.status(200).json({ message: 'Course Successfully Deleted!' });
            })
    });
//posting the courses in the database
router.route('/:id')
    .put(function (req, res) {
        Course.findById(req.params.id,
            function (err, course) {
                if (err) {
                    res.status(500).json(err.stack);
                    return;
                }
                course.courseId = req.body.courseId;
                course.courseName = req.body.courseName;
                course.courseDuration = req.body.courseDuration;
                course.courseFee = req.body.courseFee;
                course.save(function (err) {
                    if (err) {
                        res.status(500).json(err.stack);
                        return;
                    }
                    res.status(200).json({ message: 'Course Update!' });
                });
        });
});

//Exporting all Routes
module.exports = router;