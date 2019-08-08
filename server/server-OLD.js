const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const router = require('./router');
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', router);

const connectedUsers = [];


io.use((socket, next) => {
  console.log('username:', socket.handshake.query.username);
  const username = socket.handshake.query.username;
  socket.username = username;
  connectedUsers.push(username);
  return next();
});



const isConnectedSocket = io.of('/sockets/isConnected');
isConnectedSocket.use((socket, next) => {
  console.log('username:', socket.handshake.query.username);
  const username = socket.handshake.query.username;
  socket.username = username;
  return next();
});

isConnectedSocket.on('connection', client => { 
  console.log('Client has connected to /sockets/isConnected namespace');
  console.log('connected socketIds:', Object.keys(io.sockets.sockets));
  console.log(`client.id: ${client.id}, client.username: ${client.username}`);



  // => => io.nsps['/notifications']
  // console.log(io.nsps['/sockets/isConnected']);
  // console.log(io.nsps['/sockets/isConnected'].sockets);
  // console.log(io.nsps['/sockets/isConnected'].sockets.sockets);
  console.log('+++ io.nsps[/sockets/isConnected].sockets.sockets:');
  console.log(io.nsps['/sockets/isConnected'].sockets.sockets);
  // console.log('// Object.keys(io.sockets.sockets):');
  // console.log(Object.keys(io.sockets.sockets));

  const usernames = Object.keys(io.sockets.sockets).map(elem => io.sockets.sockets[elem].username);
  // const usernames = Object.keys(io.sockets.sockets).map(elem => io.nsps['/sockets/isConnected'].sockets.sockets[elem].username);
  // console.log(`usernames: ${usernames}`);
  //TESTER avec io.emit('isConnected', usernames); a l'exterieur pour voir

  // client.emit('isConnected', usernames);
  // client.broadcast.emit('isConnected', usernames);

  client.emit('isConnected', connectedUsers);
  client.broadcast.emit('isConnected', connectedUsers);

	client.on('disconnect', () => {
    console.log('Client has disconnected');
  });

  console.log(`client.id: ${client.id}`);

  client.on('logout', () => {
    connectedUsers.splice(connectedUsers.indexOf(username), 1);

    // const filteredUsernames = Object.keys(io.sockets.sockets).map(elem => io.sockets.sockets[elem].username).filter(username => {
    //   console.log(io.of('/sockets/isConnected').clients());
    //   return !(io.sockets.sockets[client.id].username === username);
    // });
    // client.broadcast.emit('isConnected', filteredUsernames);
    client.broadcast.emit('isConnected', connectedUsers);
    console.log('Client has logout');
    client.disconnect();
	});
});

const notifications = io.of('/sockets/notifications');
notifications.use((socket, next) => {
  console.log('notifications username:', socket.handshake.query.username);
  const username = socket.handshake.query.username;
  socket.username = username;
  return next();
});

notifications.on('connection', client => {
  console.log('Client connected to /sockets/notifications namespace');
  
  client.join(`${client.username}-room`);
  console.log(`${client.username} joined "${client.username}-room"`);

  client.on('visit', username => { 
    console.log(`Client has visited ${username}'s profile`);
    client.broadcast.to(`${username}-room`).emit('visited', client.username);
  });
});

const port = 5000;
server.listen(port, () => `Server running on port ${port}`);
