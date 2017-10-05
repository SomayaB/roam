const isLoggedIn = (request, response, next) => {
  if(request.session.user) {
    response.locals.isLoggedIn = true;
    next();
  } else {
    next();
  }
};

const isAuthorized = (request, response, next) => {
  if(!request.session.user) {
    response.redirect('/login');
  } else {
    next();
  }
};

const setDefaultReponseLocals = (request, response, next) => {
  response.locals.isLoggedIn = false;
  next();
};


module.exports = {
  isLoggedIn,
  setDefaultReponseLocals,
  isAuthorized
};
