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


// middleware
// io.use((socket, next) => {
//   let token = socket.handshake.query.token;
//   console.log('token:', token);
//   if (token) {
//       console.log('Middleware OK, pass to next');
//       return next();
//     }
//     console.log('Middleware not OK, Auth error');
//     return next(new Error('authentication error'));
//   });
  
// io.use((socket, next) => {
//   let clientId = socket.handshake.headers['x-clientid'];
//   console.log('clientId:', clientId);
//   if (clientId) {
//     return next();
//   }
//   return next(new Error('authentication error'));
// });

io.use((socket, next) => {
  console.log('username:', socket.handshake.query.username);
  const username = socket.handshake.query.username;
  socket.username = username;
  return next();
});



// Add a connect listener
io.on('connection', client => { 
  console.log('Client has connected to the server!');
  console.log('connected socketIds:', Object.keys(io.sockets.sockets));
  console.log(`client.id: ${client.id}, client.username: ${client.username}`);



  const usernames = Object.keys(io.sockets.sockets).map(elem => io.sockets.sockets[elem].username);
  
  //TESTER avec io.emit('isConnected', usernames); a l'exterieur pour voir
  client.emit('isConnected', usernames);
  client.broadcast.emit('isConnected', usernames);

  client.emit('message', 'YOLO');


	client.on('message', event => { 
		console.log('Received message from client!', event);
  });
  // client.on('subscribeToIsConnected', () => { 
  //   console.log('Client subscribe to isConnected event!');
  //   // console.log('Client subscribe to isConnected event!', usernameToCheck);

  //   // const usernames = Object.keys(io.sockets.sockets).map(elem => io.sockets.sockets[elem].username);
  //   // console.log(`usernames: ${usernames}, usernameToCheck: ${usernameToCheck}`);
  //   const usernames = Object.keys(io.sockets.sockets).map(elem => io.sockets.sockets[elem].username);
  //   // console.log(`usernames: ${usernames}`);
  //   client.emit('isConnected', usernames);
  // });
  // client.on('visit', username => {
  //   console.log(`Client has visited ${username}'s profile`);
  //   io.sockets.sockets[client.id].username
  // });
	client.on('disconnect', () => {
    console.log('Client has disconnected');
  });
  client.on('logout', () => {
    const filteredUsernames = Object.keys(io.sockets.sockets).map(elem => io.sockets.sockets[elem].username).filter(username => {
      return !(io.sockets.sockets[client.id].username === username);
    });
    client.broadcast.emit('isConnected', filteredUsernames);
    console.log('Client has logout');
    client.disconnect();
	});

});


const nsp = io.of('/notifications');
nsp.use((socket, next) => {
  console.log('NSP username:', socket.handshake.query.username);
  const username = socket.handshake.query.username;
  socket.username = username;
  return next();
});

nsp.on('connection', client => {
  console.log('Client connected to /notifications namespace');
  
  // client.join(`${client.username}-room`);
  // console.log(`${client.username} joined "${client.username}-room"`);

  client.on('visit', username => { 
    console.log(`Client has visited ${username}'s profile`);
    // client.broadcast.emit('visited', 'YOLO');
    client.emit('message', 'YOLO');
    // console.log(client.username);
    // console.log(`${client.username} emits to the room "${username}-room"`);
    // console.log(io.nsps);
    // console.log(io.nsps['/notifications'].adapter.rooms);
    // client.broadcast.to(`${username}-room`).emit('visited', client.username);


    // ARRIVE A ENVOYER SI JE ME CONNECTE A LA ROOM, MAIS A MOI MEME, 
    // TESTER LES DIFFERENTES FONCTIONS
    client.join(`${username}-room`);
    io.nsps['/notifications'].in(`${username}-room`).emit('visited', client.username);
    client.broadcast.to(`${username}-room`).emit('visited', client.username);
    io.in(`${username}-room`).emit('visited', client.username);
    // client.nsp.to(`${username}-room`).emit('visited', client.username);
    // io.sockets.sockets[client.id].username;
  });
});
// nsp.emit('hi', 'everyone!');

// io.on('connection', (client) => {
//   client.on('login', (username) => {
//     console.log(username);
//     client.username = username;
//   });
//   client.on('subscribeToConnectedUsers', () => {
//     const socketIDs = Object.keys(io.sockets.sockets);
//     const usernames = socketIDs.map(elem => io.sockets.sockets[elem].username);
//     client.emit('connectedUsers', usernames);
//   });
// });

const port = 5000;
server.listen(port, () => `Server running on port ${port}`);
