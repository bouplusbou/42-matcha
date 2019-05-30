const faker = require('faker')
const fakergem = require('fakergem')
const db = require('./database.js')
const unsplash = require('./unsplash.js')

async function seedOne(i) { 
    const text = `INSERT INTO users (email, username, first_name, last_name, password, confirmed, hash, image_1, age) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`
    const values = [faker.internet.email(), fakergem.Hipster.word(), faker.name.firstName(), faker.name.lastName(), 'password', 1, 'hash', unsplash.randomProfilePic(), Math.floor(Math.random()*(90 - 18)) + 18, ]
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