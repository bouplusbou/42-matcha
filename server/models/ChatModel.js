const driver = require('../db/database.js');
const session = driver.session();

async function getDiscussions(uuid) { 
  try {
    const res = await session.run(`
      MATCH (me:User {uuid: $uuid}), (you:User), (m:Match)
      WHERE NOT (me = you) AND me.userId IN m.userIds AND you.userId IN m.userIds
      RETURN you.username AS youUsername, you.photos AS youPhotos, you.avatarIndex AS youAvatarIndex, you.userId AS youUserId, m.matchId AS matchId
    `, { uuid: uuid });
    session.close();
    if (res.records[0] === undefined) return null;
    const discussions = res.records.map(record => {
      const youUserId = record.get('youUserId');
      const youUsername = record.get('youUsername');
      const youPhotos = record.get('youPhotos');
      const youAvatarIndex = record.get('youAvatarIndex');
      const matchId = record.get('matchId');
      const youAvatar = youPhotos[youAvatarIndex];
      return { youUserId, youUsername, youAvatar, matchId };
    });
    return discussions;
  } catch(err) { console.log(err) }
}

async function getCurrentDiscussion(uuid, matchId) { 
  try {
    const res = await session.run(`
      MATCH (m:Message {matchId: $matchId}), (me:User {uuid: $uuid})
      RETURN m.message AS message, m.status AS status, 
      CASE WHEN me.userId = m.from THEN 'sent' ELSE 'received' END AS type
      ORDER BY m.dateTime ASC
    `, { 
      matchId: matchId,
      uuid: uuid,
    });
    session.close();
    if (res.records[0] === undefined) return null;
    const currentDiscussion = res.records.map(record => {
      const message = record.get('message');
      const status = record.get('status');
      const type = record.get('type');
      return { message, status, type };
    });
    return currentDiscussion;
  } catch(err) { console.log(err) }
}


async function createMessage(uuid, matchId, youUserId, message) { 
  try {
    await session.run(`
      MATCH (u:User {uuid: $uuid}), (n:User {userId: $youUserId})
      CREATE (m:Message {
        matchId: $matchId,
        from: u.userId,
        to: n.userId,
        message: $message,
        dateTime: DateTime()
      })
    `, { 
      uuid,
      youUserId,
      matchId,
      message,
    });
    session.close();
  } catch(err) { console.log(err) }
}

module.exports = {
  getDiscussions,
  getCurrentDiscussion,
  createMessage,
}

// {
//   youUsername: 'BorisJ',
//   youAvatar: 'sadasdsadsadsad9879879879',
//   lastMessageInDays: 2,
// }

// {
//   from: 'userId',
//   to: 'userId',
//   message: 'fsdfdsfdsfds',
//   dateTime: DateTime(),
// }

// {
//    userIds: [userId, userId],
//    matchId: uuidMatch,
//    dateTime: DateTime(),
// }

// {
// 	youUsername,
// 	youAvatar,
// 	messages: [ // ORDER BY dateTime DESC
// 		type: 'received' / 'sent',
// 		status: 'read' / 'unread',
// 		message: 'fdsfdsf',
// 	]
//  }