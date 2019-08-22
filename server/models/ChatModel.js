const driver = require('../db/database.js');
const session = driver.session();

async function getDiscussions(uuid) { 
  try {
    const res = await session.run(`
      MATCH (me:User {uuid: $uuid}), (you:User), (m:Match)
      WHERE NOT (me = you) AND me.userId IN m.userIds AND you.userId IN m.userIds
      WITH me, you.username AS youUsername, you.photos AS youPhotos, you.avatarIndex AS youAvatarIndex, you.userId AS youUserId, m.matchId AS matchId
      OPTIONAL MATCH (msg:Message)
      WHERE msg.matchId = matchId AND msg.status = 'unread' AND msg.to = me.userId
      RETURN youUsername, youPhotos, youAvatarIndex, youUserId, matchId, COUNT(msg) AS unreadNb
    `, { uuid: uuid });
    session.close();
    if (res.records[0] === undefined) return null;
    const discussions = res.records.map(record => {
      const youUserId = record.get('youUserId');
      const youUsername = record.get('youUsername');
      const youPhotos = record.get('youPhotos');
      const youAvatarIndex = record.get('youAvatarIndex');
      const matchId = record.get('matchId');
      const unreadNb = record.get('unreadNb').low;
      const youAvatar = youPhotos[youAvatarIndex];
      return { youUserId, youUsername, youAvatar, matchId, unreadNb };
    });
    return discussions;
  } catch(err) { console.log(err) }
}

async function getCurrentDiscussion(uuid, matchId) { 
  try {
    const res = await session.run(`
      MATCH (m:Message {matchId: $matchId}), (me:User {uuid: $uuid})
      SET m.status = 'read'
      RETURN m.message AS message,
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
      const type = record.get('type');
      return { message, type };
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

async function getUnreadMessagesNb(uuid) { 
  try {
    const res = await session.run(`
      MATCH (u:User {uuid: $uuid}), (m:Message)
      WHERE m.status = 'unread' AND u.userId = m.to
      RETURN COUNT(m) AS nb
    `, { uuid });
    session.close();
    if (res.records[0] === undefined) return null;
    const nb = res.records[0].get('nb').low;
    console.log(`nb: ${nb}`);
    return nb;
  } catch(err) { console.log(err) }
}

module.exports = {
  getDiscussions,
  getCurrentDiscussion,
  createMessage,
  getUnreadMessagesNb,
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