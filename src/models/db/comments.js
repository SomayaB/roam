const db = require("./db");

  const add = (commentInfo) => {
    return db.one(`
      INSERT INTO comments (comment, post_id, user_id)
      VALUES($1, $2, $3)
      RETURNING *
      `, [commentInfo.comment, commentInfo.postId, commentInfo.userId])
      .catch(error => {
        console.error(error.message);
        throw error;
      });
  };

  const getAllCommentsInfoByPostId = (postId) => {
    return db.any(`
      SELECT comments.comment, users.name AS comment_author FROM comments
        JOIN users
        ON comments.user_id = users.id
        WHERE post_id = $1
      `, postId)
    .catch(error => {
      console.error(error.message, "The argument is:::", postId);
      throw error;
    });
  };


module.exports = {
  add,
  getAllCommentsInfoByPostId
};
