DROP TABLE IF EXISTS users;
CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  date_joined DATE NOT NULL DEFAULT CURRENT_DATE,
  current_city VARCHAR(255),
  image_url VARCHAR(255) DEFAULT '/images/blank-profile-picture.png'
);

DROP TABLE IF EXISTS cities;
CREATE TABLE cities(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  image_url VARCHAR(255)
);

DROP TABLE IF EXISTS posts;
CREATE TABLE posts(
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  user_id INTEGER REFERENCES users (id) ON DELETE CASCADE,
  city_id INTEGER REFERENCES cities (id) ON DELETE CASCADE,
  date_posted TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  rating INTEGER
);

DROP TABLE IF EXISTS comments;
CREATE TABLE comments(
  id SERIAL PRIMARY KEY,
  comment TEXT NOT NULL,
  post_id INTEGER REFERENCES posts (id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users (id) ON DELETE CASCADE
);
