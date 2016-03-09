var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy
var knex = require('../../db/knex.js');
function Users() {
  return knex('users');
}

passport.use(new LocalStrategy({
    email: 'email'
},
  function(username, password, done) {
    var user = req.body;
    Users().where('email', user.email).select()
    .then(function(data) {
      Users().where('password', data[0].password).andWhere('email', data[0].email).select()
    })
    .then(function() {
      res.render('/', {
        Title: "You've successfully logged in!"
      })
    })

      //does your user exist?
        //yes? check password
        //no? handle error
      //check password
        //correct?
            //yes? return user info
            //no? handle error

      .catch(function() {
      res.redirect('/login', {
        message: 'Username or Password is incorrect.'
      })
    })
    }
));

//sets the user to 'req.user' and establishes a session via a cookie
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

//used on subsequent requests to update 'req.user' and update session
passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});