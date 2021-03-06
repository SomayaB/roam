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

  const getById = (id) => {
    return db.oneOrNone(`
      SELECT * FROM comments
      WHERE id = $1`, id)
    .catch(error => {
      console.error(error.message, "The argument is:::", id);
      throw error;
    });
  };

  const getAllCommentsInfoByPostId = (postId) => {
    return db.any(`
      SELECT comments.id, comments.comment, users.name AS comment_author FROM comments
        JOIN users
        ON comments.user_id = users.id
        WHERE post_id = $1
        ORDER BY id ASC
      `, postId)
    .catch(error => {
      console.error(error.message, "The argument is:::", postId);
      throw error;
    });
  };

  const numberOfCommentsLeft = (userId) => {
    return db.one(`
      SELECT COUNT(user_id) FROM comments
        WHERE user_id = $1
      `, userId)
    .catch(error => {
      console.error(error.message, "The argument is:::", userId);
      throw error;
    });
  };

  const update = (id, newComment) => {
    return db.query(`
      UPDATE
        comments
      SET comment=$2
      WHERE id=$1
      `, [id, newComment])
    .catch(error => console.log(error));
  };

  const deleteById = (id) => {
    return db.query(`
      DELETE FROM comments
      WHERE id=$1
      `, id)
    .catch(error => {
      console.error(error.message, "The argument is:::", id);
      throw error;
    });
  };


module.exports = {
  add,
  getAllCommentsInfoByPostId,
  numberOfCommentsLeft,
  getById,
  update,
  deleteById
};
