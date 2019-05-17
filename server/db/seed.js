const faker = require('faker')
const fakergem = require('fakergem')
const db = require('./database.js')

async function seedOne(i) { 
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

for (i = 0; i < 1000; i++) {
    seedOne(i + 1)
}