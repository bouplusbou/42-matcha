import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AppContext from '../../AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import NotificationDot from './NotificationDot';

export default function Notifications() {
    const appState = useContext(AppContext);

    return (
        <Link to="/notifications" style={{textDecoration: 'none'}}>
        {appState.unseenNotificationsNb !== 0 &&
            <NotificationDot />
        }
            <FontAwesomeIcon  style={{fontSize: '25px', cursor: 'pointer', color: 'white'}} icon={faBell}/>
        </Link>
    );
}