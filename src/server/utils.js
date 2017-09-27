const createSession = (request, response, user) => {
  request.session.user = user;
};

module.exports = {
  createSession
};
