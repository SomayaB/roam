const router = require('express').Router();
const {encryptPassword, comparePasswords } = require('../utils');
const Users = require('../../models/users');

router.get('/signup', (request, response) => {
  response.render('auth/signup');
});

router.post('/signup', (request, response) => {
  const email = request.body.email;
  const password = request.body.password;
  encryptPassword(password)
  .then(hashedPassword => {
    Users.create(email, hashedPassword);
  })
  .then(newUser => {
    // createSession(request, response, newUser); //TODO:need to create
  // const id = newUser.id;
    response.redirect('/signup');
  });

});

router.get('/users/:id', (request, response) => {
  Users.findByEmail('d@d.com')
  .then(email => {console.log('did it work? email::', email)})
  response.send('hello')
})

router.get('/login', (request, response) => {
  response.render('auth/login');
});

router.post('/login', (request, response) => {

  //do things
  response.redirect('/users/:id');
});

module.exports = router;
