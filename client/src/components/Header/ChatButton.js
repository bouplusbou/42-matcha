import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import AppContext from '../../contexts/AppContext';
import NotificationDot from './NotificationDot';

export default function ChatButton() {
    const {socket, unreadMessagesNb, setUnreadMessagesNb} = useContext(AppContext);

    useEffect(() => {
        if (socket !== null) {
            socket.on('setUnreadMessagesNb', async nb => {
                setUnreadMessagesNb(nb);
            });
        }
        return () => {
            if (socket !== null) socket.off('setUnreadMessagesNb');
        }
    }, [socket, setUnreadMessagesNb]);

    return (
        <Link to="/chat" style={{textDecoration: 'none'}}>
            {unreadMessagesNb !== 0 &&
                <NotificationDot 
                    nb={unreadMessagesNb}
                />
            }
            <FontAwesomeIcon  style={{fontSize: '25px', cursor: 'pointer', color: 'white'}} icon={faComment}/>
        </Link>
    );
}