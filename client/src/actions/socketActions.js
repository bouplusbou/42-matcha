import io from 'socket.io-client';
import AppContext from '../AppContext';
import { useContext } from 'react';

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
    
    // const { addToast } = useToasts();

    // socket.on('visited', username => {
    //     console.log(`${username} visited your profile !`);
    //     const appState = useContext(AppContext);
    //     appState.setUnseenNotificationsNb(appState.unseenNotificationsNb + 1);
    //     // addToast(
    //     //     <Link 
    //     //         style={{
    //     //             textDecoration: 'none',
    //     //             color: '#292929',
    //     //             fontFamily: 'Roboto',
    //     //             fontStyle: 'normal',
    //     //             fontWeight: 500,
    //     //             textDecoration: 'underline',
    //     //         }} 
    //     //         to={`/users/${username}`}
    //     //     >
    //     //         {username} visited your profile !
    //     //     </Link>,
    //     //     { appearance: 'info' }
    //     // )
    // });
    
    socket.on('message', data => {
        console.log('Received a message from the server! 4', data);
    });
    
    setSocket(socket);
}