const db = require("./db");

const getByUserId = function(userId) {
  return db.any(`
    SELECT * FROM posts
    WHERE user_id = $1
    `, userId)
  .catch(error => {
    console.error(error.message);
    throw error;
  });
};

const getById = function(id) {
  return db.oneOrNone(`
    SELECT * FROM posts
    WHERE id = $1
    `, id)
  .catch(error => {
    console.error(error.message);
    throw error;
  });
};

const getNameFromUser = (userId) => {
  return db.oneOrNone(`
    SELECT users.name FROM users
    WHERE id = $1
    `, userId)
    .catch(error => {
      console.error(error.message, "The argument is:::", userId);
      throw error;
    });
};

const getPostsByCityId = (cityId) => {
  return db.any(`
    SELECT * FROM posts
    JOIN users
    ON posts.user_id = users.id
    WHERE city_id = $1
    ORDER BY posts.id DESC
    `, cityId)
    .catch(error => {
      console.error(error.message, "The argument is:::", cityId);
      throw error;
    });
};

const getPostByTitle = (title) => {
  // const titleWithoutSpaces = `%${title.toLowerCase().replace(/\s+/,'%')}%`;
  return db.oneOrNone(`
    SELECT * from posts
    WHERE title = $1
    `, title)
    .catch(error => {
      console.error(error.message, "The argument is:::", title);
      throw error;
    });
};

module.exports = {
  getByUserId,
  getById,
  getNameFromUser,
  getPostsByCityId,
  getPostByTitle
};
