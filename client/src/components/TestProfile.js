import React, { Fragment, useContext, useEffect, useState } from 'react';
import AppContext from '../AppContext';

export default function TestProfile(props) {
    const userState = useContext(AppContext);
    // const [isConnected, setIsConnected] = useState(false);
    const username = props.match.params.username;

    // useEffect(() => {
    //     // userState.socket.send(`${username} says HELLO from the client`);
    //     userState.socket.on('isConnected', usernames => {
    //         console.log(usernames);
    //         usernames.includes(username) ? setIsConnected(true) : setIsConnected(false); 
    //         // setIsConnected(res);
    //     });
    //     userState.socket.emit('subscribeToIsConnected');
    //     // userState.socket.emit('subscribeToIsConnected', username);
    // }, []);

    useEffect(() => {
        userState.notificationsSocket.emit('visit', username);
    }, []);

    return (
        <Fragment>
            <p>Username: {username}</p>
            <p>Connected ?: {userState.connectedUsers.includes(username) ? 'true' : 'false'}</p>
        </Fragment>
    );
};

