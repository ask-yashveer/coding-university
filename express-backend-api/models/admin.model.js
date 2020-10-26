// IMPORT MODULE
var mongoose = require('mongoose');
//For encrption of password
const bycrypt = require('bcryptjs');
// CREATE SCHEMA
const Schema = mongoose.Schema;
// CREATE OUR SCHEMA WITH OPTIONALLY ADDING VAILDITY
const AdminSchema = new Schema({
    name: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

// EXPORT SCHEMA
const Admin = module.exports = mongoose.model('Admin', AdminSchema);
module.exports.addAdmin = function (newAdmin, callback) {
    bycrypt.genSalt(10, (err, salt) => {
        bycrypt.hash(newAdmin.password, salt, (err, hash) => {
            if (err) throw err;
            newAdmin.password = hash;
            newAdmin.save(callback);
        });
    });
}

//Exporting getAdminByUserName function
module.exports.getAdminByUserName = function (email, callback) {
    const query = { email: email };
    Admin.findOne(query, callback);
}
//Exporting comparePassword function
module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bycrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    })
}
//Exporting getAdminsById function
module.exports.getAdminsById = function (id, callback) {
    Admin.findById(id, callback);
}