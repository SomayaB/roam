const isLoggedIn = (request, response, next) => {
  if(request.session.user) {
    response.locals.isLoggedIn = true;
  }
  next();
};

const isAuthorized = (request, response, next) => {
  if(!request.session.user) {
    const previousPage = request.headers.referer;
    response.render('not-loggedIn', {previousPage, warning: 'You must be logged in to perform this action.'});
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
