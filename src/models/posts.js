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

const update = (id, title, content, rating) => {
  return db.update(id, title, content);
};

const deleteById = (id) => {
  return db.deleteById(id);
};

const getPostInfoByUserId = (userId) => {
  return db.getPostInfoByUserId(userId)
    .then(posts => {
      return posts.reduce((cities, post) => {
        if ( post.city_name in cities) {
          let city = post.city_name;
          cities[city].push(post);
        } else {
          cities[post.city_name] = [];
          let city = post.city_name;
          cities[city].push(post);
        }
        return cities;
      }, {});
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
  deleteById,
  getPostInfoByUserId
};
