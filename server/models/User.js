const db = require('../db/database.js')
const bcrypt = require('bcrypt')
const uuidv1 = require('uuid/v1')

async function usernameExists(username) { 
  const text = `SELECT * FROM users WHERE username = $1`
  const values = [username]
  try {
    const res = await db.pool.query(text, values)
    return res.rowCount ? res.rows[0] : false
  } catch(err) {
    console.log(err.stack)
  }
}

async function emailExists(email) { 
  const text = `SELECT * FROM users WHERE email = $1`
  const values = [email]
  try {
    const res = await db.pool.query(text, values)
    return res.rowCount ? res.rows[0] : false
  } catch(err) {
    console.log(err.stack)
  }
}

async function getUsers(age = [18, 100], fame = [0, 1000], latlng = [48.856697, 2.351462], tags = []) { 
  const latMin = latlng[0] - 0.1
  const latMax = latlng[0] + 0.1
  const lngMin = latlng[1] - 0.3
  const lngMax = latlng[1] + 0.3
  let tagQuery = ''
  let values = [age[0], age[1], fame[0], fame[1], latMin, latMax, lngMin, lngMax]
  if (tags.length == 1) {
    values.push(tags[0])
    tagQuery = `AND users_tags.id_tag = $9` 
  } else if (tags.length > 1) {
    for (tag of tags) {
      values.push(tag)
    }
    const placeholders = []
    for (i=0;i<tags.length;i++) {
      placeholders.push(`$${i+9}`)
    }
    tagQuery = `AND users_tags.id_tag IN (${placeholders.join()})` 
  }
  const text = `
    SELECT users.id_user, username, age, image_1, fame, city, latitude, longitude, array_agg(tags.name) as tags
    FROM users
    LEFT JOIN users_tags ON users.id_user = users_tags.id_user 
    LEFT JOIN tags ON tags.id_tag = users_tags.id_tag 
    WHERE age >= $1 AND age <= $2
    AND fame >= $3 AND fame <= $4 
    AND latitude >= $5 AND latitude <= $6 
    AND longitude >= $7 AND longitude <= $8`
    + tagQuery +
    `GROUP BY users.id_user `
  try {
    const res = await db.pool.query(text, values)
    return res.rows
  } catch(err) {
    console.log(err.stack)
  }
}

async function getUser(id) { 
  const text = `SELECT * FROM users WHERE id_user = $1`
  const values = [id]
  try {
    const res = await db.pool.query(text, values)
    return res.rows
  } catch(err) {
    console.log(err.stack)
  }
}

async function getUserByUuid(uuid) { 
  const text = `SELECT username FROM users WHERE uuid = $1`
  const values = [uuid]
  try {
    const res = await db.pool.query(text, values)
    return res.rows
  } catch(err) {
    console.log(err.stack)
  }
}


async function createUser(email, firstName, lastName, username, password) {
  await bcrypt.hash(password, 10, (error, hash) => {
      const uuid = uuidv1()
      const hashedPassword = hash
      const text = `INSERT INTO users (uuid, email, username, first_name, last_name, password, confirmed, hash) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`
      const values = [uuid, email, username, firstName, lastName, hashedPassword, 1, 'hash']
      try {
        db.pool.query(text, values)
      } catch(err) {
        console.log(err.stack)
      }
  })
}

async function getProfile(uuid) {
  const text = `
    SELECT username, age, image_1, fame, city, latitude, longitude, array_agg(tags.name) as tags
    FROM users
    LEFT JOIN users_tags ON users.id_user = users_tags.id_user 
    LEFT JOIN tags ON tags.id_tag = users_tags.id_tag 
    WHERE uuid = $1
    GROUP BY users.id_user`
  const values = [uuid]
  try {
    const res = await db.pool.query(text, values)
    return res.rows
  } catch(err) {
    console.log(err.stack)
  }
}

module.exports = {
    usernameExists,
    emailExists,
    getUsers,
    getUserByUuid,
    getUser,
    createUser,
    getProfile,
}
