// IMPORT MODULE
var mongoose = require('mongoose');
// CREATE SCHEMA
const Schema = mongoose.Schema;

// CREATE OUR SCHEMA WITH OPTIONALLY ADDING VAILDITY
let CourseSchema = new Schema({
    courseId:{type:String},
    courseName:{type:String},
    courseDuration:{type:Number},
    courseFee:{type:String},
});
// EXPORT SCHEMA
const Course = mongoose.model('Course', CourseSchema);
module.exports = {CourseSchema: CourseSchema, Course: Course };
