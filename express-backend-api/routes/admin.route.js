const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('../db/config');
const router = express.Router();
const Admin = require('../models/admin.model');
const exphbs = require('express-handlebars');
// const messagebird = require('messagebird')('r6ay0VSbJpG06gaIZYoh7VB2I')

//Admin Register
router.post('/register', function (req, res) {
    let newAdmin = new Admin({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    Admin.addAdmin(newAdmin, (err, user) => {
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


///Admin Login
router.post('/login', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    Admin.getAdminByUserName(email, (err, admin) => {
        if (err) throw err;
        if (!admin)
            return res.json({
                success: false,
                msg: 'Admin not found'
            })
        Admin.comparePassword(password, admin.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(admin.toObject(), config.secret, { expiresIn: 604800 })
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    admin: {
                        id: admin._id,
                        name: admin.name,
                        email: admin.email
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

//Exporting all Routes
module.exports = router;