import io from 'socket.io-client';

export default function setupSocket(userId, setSocket, setConnectedUsers) {
    const socket = io('http://localhost:5000', {
        query: {
            userId: userId
        }
    });
    
    socket.on('isConnected', usernames => {
        console.log(`The back sent new connectedUsers: ${usernames}`);
        setConnectedUsers(usernames);
    });
    
    socket.on('disconnect', () => {
        console.log('The server has disconnected!');
    });
    
    socket.on('message', data => {
        console.log('Received a message from the server! 4', data);
    });
    
    setSocket(socket);
}