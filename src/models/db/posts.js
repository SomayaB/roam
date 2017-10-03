const db = require("./db");

const create = (postInfo) => {
  return db.any(`INSERT INTO posts (title, content, user_id, city_id)
    VALUES($1, $2, $3, $4)
    RETURNING *
    `, [postInfo.title, postInfo.content, postInfo.userId, postInfo.cityId])
  .catch(error => {
    console.error(error.message, "The argument is:::", postInfo);
    throw error;
  });
};

const getByUserId = (userId) => {
  return db.any(`
    SELECT * FROM posts
    WHERE user_id = $1
    `, userId)
  .catch(error => {
    console.error(error.message);
    throw error;
  });
};

const getById = (id) => {
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

const getAllPostInfoByCityId = (cityId) => {
  return db.any(`
    SELECT posts.id, posts.title, posts.content, cities.name, users.name, cities.image_url FROM posts
    JOIN cities
    ON posts.city_id = cities.id
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

const update = (id, title, content) => {
  return db.query(`
    UPDATE posts
    SET title=$2, content=$3
    WHERE id=$1
    `, [id, title, content])
  .catch(error => {
    console.error(error.message);
    throw error;
  });
};

const deleteById = (id) => {
  return db.query(`
    DELETE FROM posts
    WHERE id=$1
    `, id)
  .catch(error => {
    console.error(error.message);
    throw error;
  });
};

module.exports = {
  getByUserId,
  getById,
  getNameFromUser,
  getAllPostInfoByCityId,
  getPostByTitle,
  create,
  update,
  deleteById
};
