const faker = require('faker');
const unsplash = require('./unsplash.js');
const names = require('./names.js');
const uuidv1 = require('uuid/v1');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const driver = require('./database.js');

const session = driver.session();

const tags = [
    'burritos',
    'physiquequantique',
    'unionsovietique',
    'fingerskateboarding',
    'pokebowl',
    'chasseacourre',
    'dinosaures',
    'tauromachie',
    'cassoulet',
    'anarchie',
    'choucroute',
    'evasionfiscale',
    'yolo',
    'paradisfiscaux',
    'sorcellerie',
    'pisciculture',
    'CNRS',
    'frites',
    'rhododendron',
    'fauconnerie',
    'philatelie',
    'yoga',
    'confucianisme',
    'cancerducolon',
    'jacobinisme',
    'meteorites',
    'collapsologie',
    'chlamydia',
];

function seedTags(tag) {
    const resultPromise = session.run(`CREATE (t:Tag { tag: $tag })`, { tag: tag });
    resultPromise.then(result => {
        console.log(`Tag '${tag}' created`);
    // session.close();
    // const singleRecord = result.records[0];
    // const node = singleRecord.get(0);
    // console.log(node.properties.username);
    // on application exit:
    // driver.close();
    });
}

for (tag of tags) {
    seedTags(tag);
}


function gaussianRand() {
  let rand = 0;
  for (let i = 0; i < 6; i++) {
    rand += Math.random();
  }
  return rand / 6;
}

const orientationArr = ['hetero', 'homo', 'bi'];

const emailProvider = [
  'hotmail.fr',
  'gmail.com',
  'yahoo.com',
  'laposte.net',
  'orange.fr',
  'sfr.fr',
  'live.fr'
];

const cities = [
  'Paris',
  'Marseille',
  'Lyon',
  'Toulouse',
  'Nice',
  'Nantes',
  'Montpellier',
  'Strasbourg',
  'Bordeaux',
  'Lille',
  'Rennes',
  'Reims',
  'Saint-Etienne',
  'Toulon',
];

const coord = {
  'Paris': [48.855, 2.33],
  'Marseille': [43.3, 5.41],
  'Lyon': [45.75, 4.86],
  'Toulouse': [43.6, 1.44],
  'Nice': [43.73, 7.27],
  'Nantes': [47.2, -1.55],
  'Montpellier': [43.6, 3.88],
  'Strasbourg': [48.58, 7.75],
  'Bordeaux': [44.84, -0.58],
  'Lille': [50.63, 3.062],
  'Rennes': [48.11, -1.68],
  'Reims': [49.25, 4.03],
  'Saint-Etienne': [45.43, 4.39],
  'Toulon': [43.15, 5.93]
};

function seedCities(city) { 
    const latitude = coord[city][0] + Math.random() * 0.03;
    const longitude = coord[city][1] + Math.random() * 0.05;
    try {
      const resultPromise = session.run(`
      CREATE (:City {
          city: $city,
          latitude: $latitude,
          longitude: $longitude })
      `, {
          city: city,
          latitude: latitude,
          longitude: longitude 
      });
      resultPromise.then(result => {
          console.log(`City ${city} created`);
      // session.close();
      // const singleRecord = result.records[0];
      // const node = singleRecord.get(0);
      // console.log(node.properties.username);
      // on application exit:
      // driver.close();
      });
    } catch(err) {
      console.log(err.stack);
    }
}

for (city of cities) {
  seedCities(city);
}


async function seedUser(firstName, gender, photo1, i) { 
    await bcrypt.hash('password', 10, (error, hashedPassword) => {
        const tagArr = tags.sort(() => Math.random() - 0.5).slice(0, 3);
        const uuid = uuidv1();
        const lastName = faker.name.lastName();
        const email = `${firstName}.${lastName}@`+ emailProvider[Math.floor(Math.random() * emailProvider.length)];
        const username = `${firstName}${lastName.slice(0,1)}`;
        const confirmed = 1;
        const hash = crypto.randomBytes(20).toString('hex');
        const age = Math.floor(gaussianRand()*(39 - 18)) + 18;
        const orientation = orientationArr[Math.floor(Math.random() * orientationArr.length)];
        const bio = faker.lorem.paragraph();
        const profilePhotoIndex = 1;
        const fame = Math.floor(Math.random() * 100);
        const city = cities[Math.floor(Math.random() * cities.length)];
        try {
            const resultPromise = session.run(`
            MATCH (t1:Tag {tag: $tag1})
            MATCH (t2:Tag {tag: $tag2})
            MATCH (t3:Tag {tag: $tag3})
            MATCH (c:City {city: $city})
            CREATE (u:User {
                uuid: $uuid,
                email: $email,
                username: $username,
                firstName: $firstName,
                lastName: $lastName,
                password: $password,
                confirmed: $confirmed,
                hash: $hash,
                age: $age,
                gender: $gender,
                orientation: $orientation,
                bio: $bio,
                photo1: $photo1,
                profilePhotoIndex: $profilePhotoIndex,
                fame: $fame })
            CREATE (u)-[:LIKES]->(t1)
            CREATE (u)-[:LIKES]->(t2)
            CREATE (u)-[:LIKES]->(t3)
            CREATE (u)-[:LIVES_IN]->(c)
            `, {
                tag1: tagArr[0],
                tag2: tagArr[1],
                tag3: tagArr[2],
                city: city,
                uuid: uuid,
                email: email,
                username: username,
                firstName: firstName,
                lastName: lastName,
                password: hashedPassword,
                confirmed: confirmed,
                hash: hash,
                age: age,
                gender: gender,
                orientation: orientation,
                bio: bio,
                photo1: photo1,
                profilePhotoIndex: profilePhotoIndex,
                fame: fame,
            });
            resultPromise.then(result => {
                console.log(`${gender} user '${i}' created`);
            // session.close();
            // const singleRecord = result.records[0];
            // const node = singleRecord.get(0);
            // console.log(node.properties.username);
            // on application exit:
            // driver.close();
            });
        } catch(err) {
          console.log(err.stack)
        }
    })
}

for (i = 0; i < 400; i++) {
    seedUser(names.randomWomanFirstName(), 'woman', unsplash.randomWomanPic(), i);
}
for (i = 400; i < 800; i++) {
    seedUser(names.randomManFirstName(), 'man', unsplash.randomManPic(), i);
}
for (i = 800; i < 1001; i++) {
    seedUser(names.randomWomanFirstName(), 'non-binary', unsplash.randomWomanPic(), i);
}