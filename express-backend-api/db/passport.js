//Requiring Admin Model
const Admin = require('../models/admin.model');
//Requiring Database
const config = require('../db/config');
//Exporting the passport
module.exports = function (passport){
    var JwtStrategy = require('passport-jwt').Strategy,
        ExtractJwt = require('passport-jwt').ExtractJwt;
    var opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        Admin.getAdminsById(jwt_payload._id, (err, admin) => {
            if (err) return done(err, false);
            if (admin) return done(null, admin);
            else return done(null, false);
        })
    }))
}