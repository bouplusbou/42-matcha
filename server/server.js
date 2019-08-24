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

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', router);

io.use(async (client, next) => {
  console.log('token:', client.handshake.query.token);
  const token = client.handshake.query.token;
  jwt.verify(token, config.jwtSecret, async (err, decoded) => {
    const userId = await UserModel.userIdFromUuid(decoded.uuid);
    console.log(`userId: ${userId}`);
    client.userId = userId;
    return next();
  });
});

io.on('connection', async client => { 
  console.log('Client has connected to socket');
  console.log('connected socketIds:', Object.keys(io.sockets.sockets));
  console.log(`client.id: ${client.id}, client.userId: ${client.userId}`);

  client.join(`${client.userId}-room`);
  console.log(`${client.userId} joined "${client.userId}-room"`);

  const matchIds = await ChatModel.getMatchIdsByUserId(client.userId);
  if (matchIds !== null) {
    matchIds.map(matchId => {
      client.join(`${matchId}-room`);
      console.log(`${client.userId} joined "${matchId}-room"`);
    });
  }

  const userIds = Object.keys(io.sockets.sockets).map(elem => io.sockets.sockets[elem].userId);
  console.log(`userIds: ${userIds}`);

  client.broadcast.emit('isConnected', userIds);

	client.on('disconnect', () => {
    console.log('Client has disconnected');
    const userIds = Object.keys(io.sockets.sockets).map(elem => io.sockets.sockets[elem].userId);
    io.emit('isConnected', userIds);
  });

  client.on('logout', () => {
    const filteredUserIds = Object.keys(io.sockets.sockets).map(elem => io.sockets.sockets[elem].userId).filter(userId => {
      return !(io.sockets.sockets[client.id].userId === userId);
    });
    client.broadcast.emit('isConnected', filteredUserIds);
    console.log('Client has logout');
    client.disconnect();
	});

  client.on('visit', async username => {
    const userIdVisited = await UserModel.userIdFromUsername(username);
    const usernameVisiter = await UserModel.usernameFromUserId(parseInt(client.userId, 10));
    console.log(`${usernameVisiter} with userId ${client.userId} has visited ${username}'s profile with userId ${userIdVisited}`);
    client.to(`${userIdVisited}-room`).emit('visited', usernameVisiter);
  });

  client.on('newMessageSent', async data => {
    console.log(`userId ${client.userId} sent a new message: "${data.message}" to ${data.matchId}-room`);
    const response = {
      message: data.message,
      matchId: data.matchId,
    };
    io.in(`${data.matchId}-room`).emit('newMessageReceived', response);
    // client.to(`${data.matchId}-room`).emit('newMessageReceived', response);
    
    // const userIdVisited = await UserModel.userIdFromUsername(username);
    // const usernameVisiter = await UserModel.usernameFromUserId(parseInt(client.userId, 10));
    // console.log(`${usernameVisiter} with userId ${client.userId} has visited ${username}'s profile with userId ${userIdVisited}`);
  });
});

const port = 5000;
server.listen(port, () => `Server running on port ${port}`);
