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

async function getUsers(age = [18, 100], fame = [0, 1000]) { 
  const text = `
    SELECT *
    FROM "users"
    WHERE "age" >= $1 AND "age" <= $2
    AND "fame_score" >= $3 AND "fame_score" <= $4 `
  const values = [age[0], age[1], fame[0], fame[1]]
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
