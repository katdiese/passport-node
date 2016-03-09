var express = require('express');
var router = express.Router();
var pg = require('pg');
var knex = require('knex');
// var knexFunction = require('../../../db/knex');
// function Users() {
//   return knexFunction('users');
// }

router.get('/', function(req, res, next) {
  res.render('index', { greeting: 'Hello! Nice to see you.' });
});

router.get('/login', function(req, res, next) {
  res.render('login', {
    title: 'Login'
  })
});

router.post('/login', function(req, res, next) {
  var user = req.body;
  res.render('login', {
    title: 'Thanks for logging in.',
    email: user.email,
    password: user.password
  })
});

router.get('logout', function(req, res, next) {
  res.redirect('/');
});

router.get('/register', function(req, res, next) {
  res.render('register', {
    title: 'Register'
  })
});

router.post('/register', function(req, res, next) {
  var newUser = req.body;
  res.render('register', {
    title: 'Yay you registered!',
    email: newUser.email,
    password: newUser.password
  })
});

module.exports = router;
