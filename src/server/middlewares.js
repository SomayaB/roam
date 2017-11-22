const isLoggedIn = (request, response, next) => {
  if(request.session.user) {
    response.locals.isLoggedIn = true;
  }
  next();
};

const isAuthorized = (request, response, next) => {
  if(!request.session.user) {
    const previousPage = request.headers.referer;
    request.flash('error', 'You must be logged in to perform this action.');
    response.redirect(`${previousPage}`);
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
