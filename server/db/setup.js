const db = require('./database.js')

db.pool.query(
    `
    DROP TABLE IF EXISTS users_tags;
    DROP TABLE IF EXISTS tags;
    DROP TABLE IF EXISTS likers;
    DROP TABLE IF EXISTS stalkers;
    DROP TABLE IF EXISTS users;
    DROP TYPE IF EXISTS genre_enum;
    DROP TYPE IF EXISTS sexual_orientation_enum;
    CREATE TYPE genre_enum AS ENUM ('male', 'female', 'nonbinary');
    CREATE TYPE sexual_orientation_enum AS ENUM ('hetero', 'homo', 'bi');
    CREATE TABLE users (
      id_user SERIAL PRIMARY KEY,
      uuid TEXT NOT NULL,
      email TEXT NOT NULL,
      username VARCHAR( 40 ) NOT NULL,
      first_name VARCHAR( 50 ) NOT NULL,
      last_name VARCHAR( 50 ) NOT NULL,
      password TEXT NOT NULL,
      confirmed BOOLEAN NOT NULL,
      hash TEXT NOT NULL,
      age NUMERIC,
      genre genre_enum,
      sexual_orientation sexual_orientation_enum,
      bio TEXT,
      image_1 TEXT,
      image_2 TEXT,
      image_3 TEXT,
      image_4 TEXT,
      image_5 TEXT,
      profile_pic_number NUMERIC,
      fame NUMERIC,
      city TEXT,
      latitude NUMERIC,
      longitude NUMERIC
    );
    CREATE TABLE tags (
      id_tag SERIAL PRIMARY KEY,
      name TEXT NOT NULL UNIQUE
    );
    CREATE TABLE users_tags (
      id_user INTEGER REFERENCES users,
      id_tag INTEGER REFERENCES tags
    );
    CREATE TABLE likers (
      id_liker INTEGER REFERENCES users,
      id_liked INTEGER REFERENCES users
    );
    CREATE TABLE stalkers (
      id_stalker INTEGER REFERENCES users,
      id_stalked INTEGER REFERENCES users
    );
    `
  , (error, results) => {
  if (error) {
    throw error
  }
  console.log('Table users, tags, users_tags, likers, stalkers created')
})
