//Server Creation
const express = require('express');
const path = require('path');
const bodyParser= require ('body-parser');
//Importing routes from router file
const routeUsers = require('./routes/user.route');
const routeAdmins = require('./routes/admin.route');
const routeCourses = require('./routes/course.route');
const routeLoginUser = require('./routes/userlogin.route');
const cors = require('cors');
var passport = require('passport');
//Associating passport object with passport with jwt
var myPassportService = require('./db/passport')(passport);
const mongoose = require('mongoose');
const config = require('./db/config');
//Creating the object express
const app = express();
var morgan = require('morgan'); 
const fs= require('fs');

//Connect to Database 
mongoose.connect(config.DB, { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;
//When connection open
db.once('open', function () {
console.log('Connection open with MongoDB Server...!');
})
//check for db error
db.on('error', function (err) {
    console.log('Error: ' + err.stack);
});

//Defining Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname));
app.use(cors());
app.use(morgan('common',{
    stream: fs.createWriteStream(path.join(__dirname, './public/data/access.log'),{flag: 'a'})
}));
//Enabling passport Authentication
app.use(passport.initialize());
app.use(passport.session());


//DEFINE ROUTES
app.use('/api/userlogin',routeLoginUser);
app.use('/api/users',routeUsers);
app.use('/api/admin',routeAdmins);
app.use('/api/courses',routeCourses);

const PORT = process.env.PORT || 3000;

//START THE SERVER
app.listen(PORT, function(){
    console.log("Node.js Server started on port: "+PORT);
});