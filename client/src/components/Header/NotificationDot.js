import React, { useContext } from 'react';
import styled from 'styled-components';
import AppContext from '../../AppContext';

const NotificationDot = styled.div`
    position: absolute;
    top: -10px;
    right: -10px;
    width: 25px;
    height: 25px;
    background-color: ${props => props.theme.color.red};
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default function Notifications() {
    const appState = useContext(AppContext);

    return (
        <NotificationDot>
            <p style={{fontWeight: 900, fontSize: '10px', color: 'white'}}>{appState.unseenNotificationsNb}</p>
        </NotificationDot>
    );
}