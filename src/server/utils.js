const createSession = (request, response, user) => {
  request.session.user = user;
};

// const renderError = (error, request, response) => {
//   response.send(`Error: ${error.message}\n\n${error.stack}`);
// };

module.exports = {
  createSession
};
