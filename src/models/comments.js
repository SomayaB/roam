const db = require('./db/comments');

const add = (commentInfo) => {
  return db.add(commentInfo);
};

const getAllCommentsInfoByPostId = (postId) => {
  return db.getAllCommentsInfoByPostId(postId);
};

module.exports = {
  add,
  getAllCommentsInfoByPostId
};
