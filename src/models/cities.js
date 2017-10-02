const db = require('./db/cities');

const getAll = () => {
  return db.getAll();
};

const findById = (id) => {
  return db.findById(id);
};

const findByName = (name => {
  return db.findByName(name);
});

module.exports = {
  getAll,
  findById,
  findByName
};
