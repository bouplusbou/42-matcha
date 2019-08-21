const driver = require('./database.js');
const session = driver.session();

const Color = {
    Reset: "\x1b[0m",
    Bright: "\x1b[1m",
    Dim: "\x1b[2m",
    Underscore: "\x1b[4m",
    Blink: "\x1b[5m",
    Reverse: "\x1b[7m",
    Hidden: "\x1b[8m",
  
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
}
const log = (text, color = "yellow") => console.log(`${Color[color]}${text}${Color.Reset}`);

const getUserCount = async () => {
    const result = await session.run(`
        MATCH (u:User)
        RETURN count(u)
    `)
    return result.records[0].get(0).low;
}

const deleteAllRel = async (relationship) => {
    log(`Deleting all "${relationship}" relationships...`);
    const result = await session.run(`
        MATCH ()-[r:${relationship}]->()
        DELETE r
        RETURN count(r)
    `)
    log(`${result.records[0].get(0)} "${relationship}" relationships deleted.`);
}

const hasMatched = async(userId, targetuserId) => {
    const res = await session.run(`
        MATCH (u:User { userId: $userId })-[r:LIKED]-(t:User { userId: $targetuserId })
        RETURN count(r)
    `, {
        userId: userId,
        targetuserId: targetuserId
    })
    const matched = res.records[0].get(0).low;
    return matched === 2;
}

const isBlocked = async(userId, targetuserId) => {
    const res = await session.run(`
        MATCH (u:User { userId: $userId })-[r:BLOCKED]->(t:User { userId: $targetuserId })
        RETURN count(r)
    `, {
        userId: userId,
        targetuserId: targetuserId
    })
    const blocked = res.records[0].get(0);
    return blocked === 1;
}

const hasVisited = async(userId, targetuserId) => {
    const res = await session.run(`
        MATCH (u:User { userId: $userId })-[r:VISITED]->(t:User { userId: $targetuserId })
        RETURN count(r)
    `, {
        userId: userId,
        targetuserId: targetuserId
    })
    const visited = res.records[0].get(0);
    return visited === 1;
}

const isLiked = async(userId, targetuserId) => {
    const res = await session.run(`
        MATCH (u:User { userId: $userId })-[r:LIKED]->(t:User { userId: $targetuserId })
        RETURN count(r)
    `, {
        userId: userId,
        targetuserId: targetuserId
    })
    const liked = res.records[0].get(0);
    return liked === 1;
}

const hasAnyRelationship = async (firstUserId, secondUserId) => {
    const res = await session.run(`
        MATCH (u1:User {userId: $firstUserId})-[r]-(u2:User {userId: $secondUserId})
        RETURN count(r)
    `, {
        firstUserId: firstUserId,
        secondUserId: secondUserId,
    })
    const relCount = res.records[0].get(0);
    return relCount > 0;
};

const createNotification = async (type, fromId, toUuid) => {
    const notification = {
        type: type,
        from: fromId,
        to: toUuid,
        status: "unseen"
    }
    await session.run(`CREATE (n:Notification $notification) SET n.dateTime = DateTime()`, {notification: notification});
}

const seedVisitedRel = async () => {
    log(`***** VISITED RELATIONSHIPS SEEDING *****`, `blue`)
    const relByUser = 20;
    const maxId = await getUserCount();
    await deleteAllRel("VISITED");
    log(`Creating "VISITED" relationships...`);
    for (userId = 0; userId < maxId; userId++) {
        for (relCount = 0; relCount < relByUser; relCount++) {
            let randomId = Math.floor(Math.random() * maxId);
            while (userId === randomId ||
                await isBlocked(userId, randomId) ||
                await isBlocked(randomId, userId) ||
                await hasVisited(randomId, userId)) {
                randomId = Math.floor(Math.random() * maxId);
            }
            const res = await session.run(`
                MATCH (randomUser:User {userId: $randomuserId}), (user:User {userId: $userId})
                CREATE (randomUser)-[r:VISITED]->(user)
                SET r.timestamp = timestamp()
                RETURN user.uuid AS uuid
            `, {
                userId: userId,
                randomuserId: randomId,
            })
            await createNotification("visited", randomId, res.records[0].get(`uuid`));
        }
    }
    const result = await session.run(`
        MATCH ()-[r:VISITED]->()
        RETURN count(r)
    `)
    log(`${result.records[0].get(0).low} "VISITED" relationships created.`, `green`);
}

const seedBlockedRel = async () => {
    log(`***** BLOCKED RELATIONSHIPS SEEDING *****`, `blue`)
    const relByUser = 2;
    const maxId = await getUserCount();
    await deleteAllRel("BLOCKED");
    log(`Creating "BLOCKED" relationships...`);
    for (userId = 0; userId < maxId; userId++) {
        for (relCount = 0; relCount < relByUser; relCount++) {
            let randomId = Math.floor(Math.random() * maxId);
            while (userId === randomId || await hasAnyRelationship(userId, randomId)) {
                randomId = Math.floor(Math.random() * maxId);
            }
            await session.run(`
                MATCH (randomUser:User {userId: $randomuserId}), (user:User {userId: $userId})
                CREATE (randomUser)-[r:BLOCKED]->(user)
                SET r.timestamp = timestamp()
            `, {
                userId: userId,
                randomuserId: randomId,
            })
        }
    }
    const result = await session.run(`
        MATCH ()-[r:BLOCKED]->()
        RETURN count(r)
    `)
    log(`${result.records[0].get(0).low} "BLOCKED" relationships created.`, `green`);
}

const seedTaggedRel = async () => {
    log(`***** TAGGED RELATIONSHIPS SEEDING *****`, `blue`)
    const relByUser = 6;
    await deleteAllRel("TAGGED");
    log(`Creating "TAGGED" relationships...`);
    const userCount = await getUserCount();
    const tagCount = await session.run(`MATCH (t:Tag) RETURN count(t)`);
    for (userId = 0; userId < userCount; userId++) {
        const selectedTagId = [];
        for (relCount = 0; relCount < relByUser; relCount++) {
            let randomId = Math.floor(Math.random() * tagCount.records[0].get(0).low);
            while (selectedTagId.includes(randomId)) {
                randomId = Math.floor(Math.random() * tagCount.records[0].get(0).low);
            }
            selectedTagId.push(randomId);
        };
        for (tagId of selectedTagId) {
            await session.run(`
                MATCH (u:User {userId: $userId}), (t:Tag {userId: $tagId})
                CREATE (u)-[r:TAGGED]->(t)
                SET r.timestamp = timestamp()
            `, {
                userId: userId,
                tagId: tagId
            })
        }
    }
    const result = await session.run(`
        MATCH ()-[r:TAGGED]->()
        RETURN count(r)
    `)
    log(`${result.records[0].get(0).low} "TAGGED" relationships created.`, `green`);
}

const seedLikedRel = async () => {
    log(`***** LIKED RELATIONSHIPS SEEDING *****`, `blue`)
    const relByUser = 20;
    const maxId = await getUserCount();
    await deleteAllRel("LIKED");
    log(`Creating "LIKED" relationships...`);
    for (userId = 0; userId < maxId; userId++) {
        for (relCount = 0; relCount < relByUser; relCount++) {
            let randomId = Math.floor(Math.random() * maxId);
            while (userId === randomId ||
                await !hasVisited(randomId, userId) ||
                await isLiked(randomId, userId)) {
                randomId = Math.floor(Math.random() * maxId);
            }
            const res = await session.run(`
                MATCH (randomUser:User {userId: $randomuserId}), (user:User {userId: $userId})
                CREATE (randomUser)-[r:LIKED]->(user)
                SET r.timestamp = timestamp()
                RETURN user.uuid AS uuid
            `, {
                userId: userId,
                randomuserId: randomId,
            })
            await createNotification("liked", randomId, res.records[0].get(`uuid`));
            if (await hasMatched(userId, randomId))
                await createNotification("matched", randomId, res.records[0].get(`uuid`));
        }
    }
    const result = await session.run(`
        MATCH ()-[r:LIKED]->()
        RETURN count(r)
    `)
    log(`${result.records[0].get(0).low} "LIKED" relationships created.`, `green`);
}

const seedRelationships = async () => {
    try {
        await seedTaggedRel();
        await seedBlockedRel();
        await seedVisitedRel();
        await seedLikedRel();
        log(`RELATIONSHIPS SEEDING COMPLETE !`, `blue`)
        process.exit(0);
    } catch(error) {
        log(error, `red`);
        log(`Terminating seeding process.`, `red`);
        process.exit(1);
    }
}

seedRelationships();