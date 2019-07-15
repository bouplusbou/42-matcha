const faker = require('faker')
const fakergem = require('fakergem')
const db = require('./database.js')
const unsplash = require('./unsplash.js')
const names = require('./names.js')
const axios = require('axios')
const uuidv1 = require('uuid/v1')



function gaussianRand() {
  let rand = 0;
  for (let i = 0; i < 6; i++) {
    rand += Math.random();
  }
  return rand / 6;
}

const sexualOrientationArr = ['hetero', 'homo', 'bi']

const emailProvider = [
  'hotmail.fr',
  'gmail.com',
  'yahoo.com',
  'laposte.net',
  'orange.fr',
  'sfr.fr',
  'live.fr'
]

const cities = [
  'paris',
  'marseille',
  'lyon',
  'toulouse',
  'nice',
  'nantes',
  'montpellier',
  'strasbourg',
  'bordeaux',
  'lille',
  'rennes',
  'reims',
  'saintEtienne',
  'toulon',
]

const coord = {
  paris: [48.855, 2.33],
  marseille: [43.3, 5.41],
  lyon: [45.75, 4.86],
  toulouse: [43.6, 1.44],
  nice: [43.73, 7.27],
  nantes: [47.2, -1.55],
  montpellier: [43.6, 3.88],
  strasbourg: [48.58, 7.75],
  bordeaux: [44.84, -0.58],
  lille: [50.63, 3.062],
  rennes: [48.11, -1.68],
  reims: [49.25, 4.03],
  saintEtienne: [45.43, 4.39],
  toulon: [43.15, 5.93]
}


async function seedWomen(i) { 
  const uuid = uuidv1()
  const firstName = names.randomWomanFirstName()
  const lastName = faker.name.lastName()
  const email = `${firstName}.${lastName}@`+ emailProvider[Math.floor(Math.random() * emailProvider.length)]
  const username = `${firstName}${lastName.slice(0,1)}`
  const password = 'password'
  const confirmed = 1
  const hash = 'hash'
  const age = Math.floor(gaussianRand()*(39 - 18)) + 18
  const genre = 'female'
  const sexualOrientation = sexualOrientationArr[Math.floor(Math.random() * sexualOrientationArr.length)]
  const bio = faker.lorem.paragraph()
  const image1 = unsplash.randomWomanPic()
  const profilePicNumber = 1
  const fame = '100'
  const city = cities[Math.floor(Math.random() * cities.length)]
  const latitude = coord[city][0] + Math.random() * 0.03
  const longitude = coord[city][1] + Math.random() * 0.05

  const text = `INSERT INTO users (uuid, email, username, first_name, last_name, password, confirmed, hash, age, genre, sexual_orientation, bio, image_1, profile_pic_number, fame, city, latitude, longitude) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)`
  const values = [uuid, email, username, firstName, lastName, password, confirmed, hash, age, genre, sexualOrientation, bio, image1, profilePicNumber, fame, city, latitude, longitude]
  try {
    const res = await db.pool.query(text, values)
    console.log(`Woman ${i} created`)
  } catch(err) {
    console.log(err.stack)
  }
}

async function seedMen(i) {
  const uuid = uuidv1() 
  const firstName = names.randomManFirstName()
  const lastName = faker.name.lastName()
  const email = `${firstName}.${lastName}@`+ emailProvider[Math.floor(Math.random() * emailProvider.length)]
  const username = `${firstName}${lastName.slice(0,1)}`
  const password = 'password'
  const confirmed = 1
  const hash = 'hash'
  const age = Math.floor(gaussianRand()*(39 - 18)) + 18
  const genre = 'male'
  const sexualOrientation = sexualOrientationArr[Math.floor(Math.random() * sexualOrientationArr.length)]
  const bio = faker.lorem.paragraph()
  const image1 = unsplash.randomManPic()
  const profilePicNumber = 1
  const fame = '100'
  const city = cities[Math.floor(Math.random() * cities.length)]
  const latitude = coord[city][0] + Math.random() * 0.03
  const longitude = coord[city][1] + Math.random() * 0.05

  const text = `INSERT INTO users (uuid, email, username, first_name, last_name, password, confirmed, hash, age, genre, sexual_orientation, bio, image_1, profile_pic_number, fame, city, latitude, longitude) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)`
  const values = [uuid, email, username, firstName, lastName, password, confirmed, hash, age, genre, sexualOrientation, bio, image1, profilePicNumber, fame, city, latitude, longitude]
  try {
    const res = await db.pool.query(text, values)
    console.log(`Man ${i} created`)
  } catch(err) {
    console.log(err.stack)
  }
}

for (i = 0; i < 400; i++) {
    seedWomen(i + 1)
    seedMen(i + 1)
}

const gender = [names.randomManFirstName(), names.randomWomanFirstName()]
const randomPicArr = [unsplash.randomManPic(), unsplash.randomWomanPic()]

async function seedNonbinary(i) { 
  const uuid = uuidv1()
  const firstName = gender[Math.floor(Math.random() * gender.length)]
  const lastName = faker.name.lastName()
  const email = `${firstName}.${lastName}@`+ emailProvider[Math.floor(Math.random() * emailProvider.length)]
  const username = `${firstName}${lastName.slice(0,1)}`
  const password = 'password'
  const confirmed = 1
  const hash = 'hash'
  const age = Math.floor(gaussianRand()*(39 - 18)) + 18
  const genre = 'nonbinary'
  const sexualOrientation = sexualOrientationArr[Math.floor(Math.random() * sexualOrientationArr.length)]
  const bio = faker.lorem.paragraph()
  const image1 = randomPicArr[Math.floor(Math.random() * randomPicArr.length)]
  const profilePicNumber = 1
  const fame = '100'
  const city = cities[Math.floor(Math.random() * cities.length)]
  const latitude = coord[city][0] + Math.random() * 0.03
  const longitude = coord[city][1] + Math.random() * 0.05

  const text = `INSERT INTO users (uuid, email, username, first_name, last_name, password, confirmed, hash, age, genre, sexual_orientation, bio, image_1, profile_pic_number, fame, city, latitude, longitude) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)`
  const values = [uuid, email, username, firstName, lastName, password, confirmed, hash, age, genre, sexualOrientation, bio, image1, profilePicNumber, fame, city, latitude, longitude]
  try {
    const res = await db.pool.query(text, values)
    console.log(`Nonbinary ${i} created`)
  } catch(err) {
    console.log(err.stack)
  }
}

for (i = 0; i < 200; i++) {
  seedNonbinary(i + 1)
}






const tags = [
  'burritos',
  'volcans',
  'canards',
  'sousmarins',
  'physiquequantique',
  'pingouins',
  'unionsovietique',
  'fingerskateboarding',
  'pokemon',
  'country',
  'dragons',
  'meduses',
  'chasseacourre',
  'lego',
  'lamas',
  'dinosaures',
  'tauromachie',
  'quichelorraine',
  'cassoulet',
  'anarchie',
  'choucroute',
  'espace',
  'evasionfiscale',
  'rechauffementclimatique',
  'yolo',
  '5G',
  'paradisfiscaux',
  'fortran',
  'robocop',
  'sorcellerie',
  'harissa',
  'pisciculture',
  'CNRS',
  'frites',
  'rhododendron',
  'magienoire',
  'flechettes',
  'avalanches',
  'fauconnerie',
  'bodybuilding',
  'cobol',
  'alcoolisme',
  'genealogie',
  'philatelie',
  'yoga',
  'yaourts',
  'confucianisme',
  'cancerducolon',
  'kibbutz',
  'tofu',
  'jacobinisme',
  'meteorites',
  'ordoliberalisme',
  'collapsologie',
  'burpees',
  'chlamydia',
]

async function seedTags(tag) { 
  const text = `
    INSERT INTO tags (name) 
    VALUES ($1) `
  const values = [tag]
  try {
    const res = await db.pool.query(text, values)
    console.log(`Tag '${tag}' created`)
  } catch(err) {
    console.log(err.stack)
  }
}

for (tag of tags) {
  seedTags(tag)
}


async function seedUsersTags(id_user, id_tag) { 
  const text = `
    INSERT INTO users_tags (id_user, id_tag) 
    VALUES ($1, $2) `
  const values = [id_user, id_tag]
  try {
    const res = await db.pool.query(text, values)
    console.log(`User ${id_user} get assigned tag '${id_tag}'`)
  } catch(err) {
    console.log(err.stack)
  }
}

  
for (i = 1; i < 1000; i++) {
  seedUsersTags(i, Math.floor(Math.random() * 50) + 1)
  seedUsersTags(i, Math.floor(Math.random() * 50) + 1)
  seedUsersTags(i, Math.floor(Math.random() * 50) + 1)
  seedUsersTags(i, Math.floor(Math.random() * 50) + 1)
  seedUsersTags(i, Math.floor(Math.random() * 50) + 1)
}