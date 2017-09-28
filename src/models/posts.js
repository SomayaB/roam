const db = require('./db/posts');

const getByUserId = function(userId) {
  return db.getByUserId(userId);
};

const getById = function(Id) {
  return db.getById(Id);
};

const getNameFromUser = function(userId) {
  return db.getNameFromUser(userId);
};

const getPostsByCityId = (id) => {
  return db.getPostsByCityId(id);
};

const getPostByTitle = (title) => {
  return db.getPostByTitle(title);
};

module.exports = {
  getByUserId,
  getById,
  getNameFromUser,
  getPostsByCityId,
  getPostByTitle
};
