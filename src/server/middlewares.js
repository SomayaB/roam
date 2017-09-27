const isLoggedIn = (request, response, next) => {
  if(!request.session.user) {
    response.redirect('/login');
  } else {
    response.locals.isLoggedIn = true;
    next();
  }
};

const setDefaultReponseLocals = ((request, response, next) => {
  response.locals.query = '';
  response.locals.isLoggedIn = false;
  next();
});


module.exports = {
  isLoggedIn,
  setDefaultReponseLocals
};
