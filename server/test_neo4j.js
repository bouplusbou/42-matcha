const neo4j = require('neo4j-driver').v1;

// const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
const driver = neo4j.driver(
    'bolt://192.168.99.100:7687/',
    neo4j.auth.basic('neo4j', 'whiterabbit')
)
const session = driver.session();

const personName = 'Alice';
const resultPromise = session.run(` 
    CREATE (Allo:Person {name: $name, born: $born})
    RETURN Allo
    `,
  {name: personName, born: 1964}
);

resultPromise.then(result => {
  session.close();

  const singleRecord = result.records[0];
  const node = singleRecord.get(0);

  console.log(node.properties.name);

  // on application exit:
  driver.close();
});

















const neo4j = require('neo4j-driver').v1;

// const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
const driver = neo4j.driver(
    'bolt://192.168.99.100:7687/',
    neo4j.auth.basic('neo4j', 'whiterabbit')
)
const session = driver.session();

const resultPromise = session.run( `
    CREATE ($username:Person {
    uuid: $uuid,
    email: $email,
    username: $username,
    first_name: $first_name,
    last_name: $last_name,
    password: $password,
    confirmed: $confirmed,
    hash: $hash,
    age: $age,
    genre: $genre,
    sexual_orientation: $sexual_orientation,
    bio: $bio,
    image_1: $image_1,
    profile_pic_number: $profile_pic_number,
    fame: $fame,
    city: $city,
    latitude: $latitude,
    longitud: $longitude
}) 
`, {
        uuid: uuid,
        email: email,
        username: username,
        first_name: first_name,
        last_name: last_name,
        password: password,
        confirmed: confirmed,
        hash: hash,
        age: age,
        genre: genre,
        sexual_orientation: sexual_orientation,
        bio: bio,
        image_1: image_1,
        profile_pic_number: profile_pic_number,
        fame: fame,
        city: city,
        latitude: latitude,
        longitud: longitude
    }
);

resultPromise.then(result => {
  session.close();

  const singleRecord = result.records[0];
  const node = singleRecord.get(0);

  console.log(node.properties.name);

  // on application exit:
  driver.close();
});



