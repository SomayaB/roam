const db = require("./db");

const getAll = () => {
  return db.any(`
    SELECT * FROM cities;
    `)
    .catch(error => {
      console.error(error.message);
      throw error;
    });
};

const findById = (id) => {
  return db.oneOrNone(`
    SELECT * FROM cities
    WHERE id = $1
    `, id)
    .catch(error => {
      console.error(error.message, "The argument is:::", id);
      throw error;
    });
};

const findByName = (name) => {
  return db.oneOrNone(`
    SELECT * FROM cities
    WHERE lower(name) = $1
    `, name)
    .catch(error => {
      console.error(error.message, "The argument is:::", name);
      throw error;
    });
};

module.exports = {
  getAll,
  findById,
  findByName
};
