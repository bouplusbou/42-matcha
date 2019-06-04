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

async function getUsers() { 
  const text = `SELECT * FROM users ORDER BY id_user ASC`
  try {
    const res = await db.pool.query(text)
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
