import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import NotificationDot from './NotificationDot';
import axios from 'axios';

export default function Notifications() {
    const appState = useContext(AppContext);

    useEffect(() => {
        if (appState.socket !== null) {
            appState.socket.on('visited', async username => {
                console.log(`${username} visited your profile !`);
                const authToken = localStorage.getItem('token');
                const resNotif = await axios.get(`/notifications/unseenNotificationsNb?authToken=${authToken}`);
                appState.setUnseenNotificationsNb(resNotif.data.nb);
            });
        }
    }, [appState]);

    return (
        <Link to="/notifications" style={{textDecoration: 'none'}}>
        {appState.unseenNotificationsNb !== 0 &&
            <NotificationDot />
        }
            <FontAwesomeIcon  style={{fontSize: '25px', cursor: 'pointer', color: 'white'}} icon={faBell}/>
        </Link>
    );
}