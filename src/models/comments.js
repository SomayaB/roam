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

module.exports = {
  add,
  getAllCommentsInfoByPostId,
  numberOfCommentsLeft
};
