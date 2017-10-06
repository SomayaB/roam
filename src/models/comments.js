const db = require('./db/comments');

const add = (commentInfo) => {
  return db.add(commentInfo);
};

const getAllCommentsInfoByPostId = (postId) => {
  return db.getAllCommentsInfoByPostId(postId);
};

const numberOfCommentsLeft = (userId) => {
  return db.numberOfCommentsLeft(userId);
};

const getById = (id) => {
  return db.getById(id);
};

module.exports = {
  add,
  getAllCommentsInfoByPostId,
  numberOfCommentsLeft,
  getById
};
