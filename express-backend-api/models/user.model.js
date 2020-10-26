// IMPORT MODULE
var mongoose = require('mongoose');
const bycrypt = require('bcryptjs');
// CREATE SCHEMA
const Schema = mongoose.Schema;
var CourseSchema = require('./course.model').CourseSchema;

// CREATE OUR SCHEMA WITH OPTIONALLY ADDING VAILDITY
let UserSchema = new Schema({
    courseId:{type:String},
    firstName:{type:String},
    lastName:{type:String},
    age:{type:Number},
    mobileNumber:{type:String},
    email:{type:String},
    password:{type:String},
    courses: [CourseSchema]
});
// EXPORT SCHEMA
const User = module.exports = mongoose.model('User', UserSchema);

module.exports.addUser = function (newUser, callback) {
    bycrypt.genSalt(10, (err, salt) => {
        bycrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}//end of addUser()

//User.addUser() function exported from here
module.exports.getUserByUserName = function (email, callback) {
    const query = { email: email };
    User.findOne(query, callback);
}//end of getUserByUserName()

//User.comparePassword() function exported from here
module.exports.comparePassword = function (userPassword, hash, callback) {
    bycrypt.compare(userPassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    })
}//end of comparePassword()

//User.getUserById() function exported from here
module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}//end of getUserById()