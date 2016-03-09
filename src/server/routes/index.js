var express = require('express');
var router = express.Router();
var pg = require('pg');
var knex = require('../db/knex');
var passport = require('../lib/auth')

router.get('/', function(req, res, next) {
  console.log(req.user);
  res.render('index', {
    user: req.user
  });
});

router.get('/login', function(req, res, next) {
  res.render('login', {
    title: 'Login'
  })
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user) {
    if(err) {
      return next(err);
    } else {
      req.logIn(user, function(err) {
        if(err) {
          return next(user);
        }
        return res.redirect('/')
      })
    }
  })(req,res,next);
});

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

router.get('/register', function(req, res, next) {
  res.render('register', {
    title: 'Register'
  })
});

router.post('/register', function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  knex('users').where('email', email)
  .then(function(data) {
    if(data.length) {
      res.send('crap');
    } else {
      knex('users').insert({
      email: email,
      password: password
    })
    .then(function(data) {
        return res.redirect('/login');
      })
    .catch(function(err) {
      return res.send('crap');
    })
    }
  })
  .catch(function(err) {
    return next(err);
  });
});

module.exports = router;
