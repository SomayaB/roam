const router = require('express').Router();
const { createSession, renderError } = require('../utils');
const { comparePasswords } = require('../../utils');
const Users = require('../../models/users');

router.get('/signup', (request, response) => {
  if(request.session.user) {
    const id = request.session.user.id;
    response.redirect(`/users/${id}`);
  }
  else {
    response.render('auth/signup', {warning: request.flash('error')});
  }
});

router.post('/signup', (request, response) => {
  const email = request.body.email;
  const password = request.body.password;
    Users.create(email, password)
    .then(newUser => {
     createSession(request, response, newUser); //addUserToSession()
     const id = newUser.id;
     request.session.save(function(err) {
       response.redirect(`/users/${newUser.id}`);
     });
   })
   .catch(error => {
     request.flash('error', 'That username already exists. Please choose another.');
     response.redirect('/signup');
   });
});

router.get('/login', (request, response) => {
  if(request.session.user) {
    const id = request.session.user.id;
    response.redirect(`/users/${id}`);
  }
    response.render('auth/login', {warning: request.flash('error')});
  }
);

router.post('/login', (request, response) => {
  const email = request.body.email;
  const password = request.body.password;
  const previousPage = request.headers.referer;
  Users.findByEmail(email)
  .then(user => {
    comparePasswords(password, user.password)
    .then(passwordsMatch => {
      if(passwordsMatch) {
        createSession(request, response, user);
        request.session.save(error => {
          response.redirect(`/users/${user.id}`);
          if(error) {
            renderError(request, response, error);
          }
        });
      } else {
        request.flash('error', 'Incorrect username or password');
        response.redirect(`${previousPage}`);
      }
    });
  })
  .catch(error => {
    request.flash('error', 'Incorrect username or password');
    response.redirect(`${previousPage}`);
  });
});

router.get('/logout', (request, response) => {
  request.session.destroy((error) => {
    response.redirect('/');
    if(error) {
      renderError(request, response, error);
    }
  });
});



module.exports = router;
