const db = require('./db/database.js')

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

async function createUser(i) { 
  const text = `INSERT INTO users (email, user_name, first_name, last_name, password, confirmed, hash) 
      VALUES ($1, $2, $3, $4, $5, $6, $7)`
  const values = [faker.internet.email(), fakergem.Hipster.word(), faker.name.firstName(), faker.name.lastName(), 'password', 1, 'hash']
  try {
    const res = await db.pool.query(text, values)
    console.log(`User ${i} created`)
  } catch(err) {
    console.log(err.stack)
  }
}


module.exports = {
  getUsers,
  getUser,
  createUser,
}

