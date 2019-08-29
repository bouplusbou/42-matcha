const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const router = require('./router');
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const UserModel = require('./models/UserModel');
const ChatModel = require('./models/ChatModel');
const jwt = require('jsonwebtoken');
const config = require('./middlewares/config');

app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
app.use(cookieParser());
app.use('/api', router);

io.use(async (client, next) => {
  const token = client.handshake.query.token;
  jwt.verify(token, config.jwtSecret, async (err, decoded) => {
    client.uuid = decoded.uuid;
    const userId = await UserModel.userIdFromUuid(decoded.uuid);
    client.userId = userId;
    return next();
  });
});

io.on('connection', async client => { 
  client.join(`${client.userId}-room`);

  const matchIds = await ChatModel.getMatchIdsByUserId(client.userId);
  if (matchIds !== null) {
    matchIds.map(matchId => {
      client.join(`${matchId}-room`);
    });
  }
  const userIds = Object.keys(io.sockets.sockets).map(elem => io.sockets.sockets[elem].userId);

  // rajouter une condition pour ne pas trigger aussi quand deco
  io.emit('isConnected', userIds);

	client.on('disconnect', () => {
    UserModel.setlastConnection(client.userId);
    const userIds = Object.keys(io.sockets.sockets).map(elem => io.sockets.sockets[elem].userId);
    io.emit('isConnected', userIds);
  });

  client.on('logout', () => {
    const filteredUserIds = Object.keys(io.sockets.sockets).map(elem => io.sockets.sockets[elem].userId).filter(userId => {
      return !(io.sockets.sockets[client.id].userId === userId);
    });
    client.broadcast.emit('isConnected', filteredUserIds);
    client.disconnect();
  });

  client.on('createNotification', async targetUserId => {
    client.to(`${targetUserId}-room`).emit('receiveNotification');
  });

  client.on('setCurrentDiscussionMatchId', async matchId => {
    client.currentDiscussionMatchId = matchId;
  });

  client.on('newMessageSent', async data => {
    const socketId = Object.keys(io.sockets.sockets).filter(elem => io.sockets.sockets[elem].userId === data.youUserId);
    if (io.sockets.sockets[socketId] !== undefined) {
      const currentDiscussionMatchIdOfReceiver = io.sockets.sockets[socketId].currentDiscussionMatchId;
      if (currentDiscussionMatchIdOfReceiver !== undefined && currentDiscussionMatchIdOfReceiver !== null) {
        await ChatModel.setAllAsReadByMatchIdAndUserId(currentDiscussionMatchIdOfReceiver, data.youUserId)
      }
    }
    const youUuid = await UserModel.getUuidByUserId(data.youUserId);
    const nb = await ChatModel.getUnreadMessagesNb(youUuid);
    client.to(`${data.matchId}-room`).emit('setUnreadMessagesNb', nb);
    client.to(`${data.matchId}-room`).emit('reloadDiscussions');
    io.in(`${data.matchId}-room`).emit('newMessageReceived', data.matchId);
  });
});

const port = 5000;
server.listen(port, () => `Server running on port ${port}`);
