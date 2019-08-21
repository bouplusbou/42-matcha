import React, { Fragment, useContext, useEffect, useState } from 'react';
import AppContext from '../AppContext';
import axios from 'axios';


export default function TestProfile(props) {
    const userState = useContext(AppContext);
    const username = props.match.params.username;

    useEffect(() => {
        userState.socket.emit('visit', username);
        const authToken = localStorage.getItem('token');
        const data = {
            type: 'visited',
            usernameVisited: username,
        }
        axios.post(`/notifications?authToken=${authToken}`, data);
    }, []);

    return (
        <Fragment>
            <p>Username: {username}</p>
            <p>Connected ?: {userState.connectedUsers.includes(username) ? 'true' : 'false'}</p>
        </Fragment>
    );
};
