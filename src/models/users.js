const db = require('./db/users');
const { encryptPassword, comparePasswords } = require('../utils');

const findById = (id) => {
  return db.findById(id);
};

const findByEmail = (email) => {
  return db.findByEmail(email);
};

const create = (email, password) => {
  return encryptPassword(password)
  .then(hashedPassword => {
    return db.create(email, hashedPassword);
  });
};

const getPostsByUserId = function(userId) {
  return db.getPostsByUserId(userId);
};

const updateProfile = function(name, currentCity, id) {
  return db.update(name, currentCity, id);
};

const updatePicture = (id, newProfilePicture) => {
  return db.updatePicture(id, newProfilePicture);
};

module.exports = {
  findById,
  create,
  getPostsByUserId,
  findByEmail,
  updateProfile,
  updatePicture
};
