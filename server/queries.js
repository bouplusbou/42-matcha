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


// const getUser = (request, response) => {
//   console.log(request)
//   response.status(200)
//   // db.pool.query('SELECT * FROM users ORDER BY id_user ASC', (error, results) => {
//   //   if (error) {
//   //     console.log(error)
//   //     throw error
//   //   }
//   //   response.status(200).json(results.rows)
//   // })
// }

// const createUser = (request, response) => {
//   const { name, email } = request.body
//   console.log(request)
//   pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(201).send(`User added with ID: ${result.insertId}`)
//   })
// }

const createUser = (request, response) => {
  console.log(request)
}


module.exports = {
  getUsers,
  getUser,
  createUser,
}



// async function seedOne(i) { 
//   const text = `INSERT INTO users (email, user_name, first_name, last_name, password, confirmed, hash) 
//       VALUES ($1, $2, $3, $4, $5, $6, $7)`
//   const values = [faker.internet.email(), faker.name.firstName(), faker.name.lastName(), fakergem.Hipster.word(), 'password', 1, 'hash']
//   try {
//     const res = await db.pool.query(text, values)
//     console.log(`User ${i} created`)
//   } catch(err) {
//     console.log(err.stack)
//   }
// }