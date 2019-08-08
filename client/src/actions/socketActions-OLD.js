import io from 'socket.io-client';
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useToasts } from 'react-toast-notifications'

export function setupIsConnectedSocket(setIsConnectedSocket, username, setConnectedUsers) {

    const isConnectedSocket = io('http://localhost:5000/sockets/isConnected', {
        query: {
            username: username
        }
    });
    
    isConnectedSocket.on('isConnected', usernames => {
        console.log(`The back sent new connectedUsers: ${usernames}`);
        setConnectedUsers(usernames);
    });
    
    isConnectedSocket.on('message', data => {
        console.log('Received a message from the server! 3', data);
    });

    isConnectedSocket.on('disconnect', () => {
        console.log('The server has disconnected!');
    });
    
    setIsConnectedSocket(isConnectedSocket);
}

export function setupNotificationsSocket(username, setNotificationsSocket) {

    // const { addToast } = useToasts();
    const notificationsSocket = io('http://localhost:5000/sockets/notifications', {
        query: {
            username: username
        }
    });

    notificationsSocket.on('visited', username => {
        console.log(`${username} visited your profile !`);
        // addToast(
        //     <Link 
        //         style={{
        //             textDecoration: 'none',
        //             color: '#292929',
        //             fontFamily: 'Roboto',
        //             fontStyle: 'normal',
        //             fontWeight: 500,
        //             textDecoration: 'underline',
        //         }} 
        //         to={`/users/${username}`}
        //     >
        //         {username} visited your profile !
        //     </Link>,
        //     { appearance: 'info' }
        // )
    });
    
    notificationsSocket.on('message', data => {
        console.log('Received a message from the server! 4', data);
    });
    
    setNotificationsSocket(notificationsSocket);
}



// module.exports = {
//     setupIsConnectedSocket,
//     setupNotificationsSocket,
// };