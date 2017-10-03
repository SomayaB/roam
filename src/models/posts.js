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

const getAllPostInfoByCityId = (cityId) => {
  return db.getAllPostInfoByCityId(cityId);
};

const getPostByTitle = (title) => {
  return db.getPostByTitle(title);
};

const create = (postInfo) => {
  return db.create(postInfo);
};

module.exports = {
  getByUserId,
  getById,
  getNameFromUser,
  getAllPostInfoByCityId,
  getPostByTitle,
  create
};
