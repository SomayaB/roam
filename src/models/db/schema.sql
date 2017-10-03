DROP TABLE IF EXISTS users;
CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  date_joined DATE NOT NULL DEFAULT CURRENT_DATE,
  current_city VARCHAR(255)
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
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  user_id INTEGER REFERENCES users (id),
  city_id INTEGER REFERENCES cities (id)
);
