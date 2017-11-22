const db = require("./db");

const findById = (id) => {
  return db.oneOrNone(`
    SELECT
      *
    FROM
      users
    WHERE id=$1
    `, id)
    .catch(error => {
      console.error(error.message);
      throw error;
    });
  };

const findByEmail = (email) => {
  return db.oneOrNone(`
    SELECT
      *
    FROM
      users
    WHERE email=$1
    `, email)
  .catch(error => {
    console.error(error.message);
    throw error;
  });
};

const create = (email, password) => {
  return db.oneOrNone(`
    INSERT INTO
      users (email, password)
    VALUES
      ($1, $2)
    RETURNING
      *
    `,
    [
      email,
      password,
    ])
  .catch(error => {
    console.error(error.message);
    throw error;
  });
};

const update = (name, currentCity, id) => {
  return db.query(`
    UPDATE users
    SET name=$1, current_city=$2
    WHERE id=$3
    `, [name, currentCity, id])
  .catch(error => {
    console.error(error.message);
    throw error;
  });
};

const updatePicture = (id, newProfilePicture) => {
  return db.oneOrNone(`
    UPDATE users
    SET image_url = $2
    WHERE id = $1
    RETURNING *
    `, [id, newProfilePicture])
  .catch(error => {
    console.error(error.message);
    throw error;
  });
};


module.exports = {
  findById,
  create,
  findByEmail,
  update,
  updatePicture
};
