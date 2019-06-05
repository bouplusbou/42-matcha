const db = require('../db/database.js')
const bcrypt = require('bcrypt')

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

async function getUsers(age = [18, 100], fame = [0, 1000], latlng = [48.856697, 2.351462]) { 
  const latMin = latlng[0] - 0.1
  const latMax = latlng[0] + 0.1
  const lngMin = latlng[1] - 0.3
  const lngMax = latlng[1] + 0.3
  const text = `
    SELECT *
    FROM "users"
    WHERE "age" >= $1 AND "age" <= $2
    AND "fame" >= $3 AND "fame" <= $4 
    AND "latitude" >= $5 AND "latitude" <= $6 
    AND "longitude" >= $7 AND "longitude" <= $8 `
  const values = [age[0], age[1], fame[0], fame[1], latMin, latMax, lngMin, lngMax]
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

async function createUser(email, firstName, lastName, username, password) {
  await bcrypt.hash(password, 10, (error, hash) => {
      const hashedPassword = hash
      const text = `INSERT INTO users (email, username, first_name, last_name, password, confirmed, hash) 
      VALUES ($1, $2, $3, $4, $5, $6, $7)`
      const values = [email, username, firstName, lastName, hashedPassword, 1, 'hash']
      try {
        db.pool.query(text, values)
      } catch(err) {
        console.log(err.stack)
      }
  })
}



module.exports = {
    usernameExists,
    emailExists,
    getUsers,
    getUser,
    createUser,
}
