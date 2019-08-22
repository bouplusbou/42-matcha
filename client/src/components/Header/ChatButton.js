import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import AppContext from '../../AppContext';
import NotificationDot from './NotificationDot';

export default function ChatButton() {
    const appState = useContext(AppContext);
    // const setUnreadMessagesNb = appState.setUnreadMessagesNb;

    // useEffect(() => {
    //     if (appState.socket !== null) {
    //         appState.socket.on('visited', async username => {
    //             console.log(`${username} visited your profile !`);
    //             const authToken = localStorage.getItem('token');
    //             const resNotif = await axios.get(`/notifications/unseenNotificationsNb?authToken=${authToken}`);
    //             setUnseenNotificationsNb(resNotif.data.nb);
    //         });
    //     }
    // }, [appState.socket, setUnreadMessagesNb]);

    return (
        <Link to="/chat" style={{textDecoration: 'none'}}>
            {appState.unreadMessagesNb !== 0 &&
                <NotificationDot 
                    nb={appState.unreadMessagesNb}
                />
            }
            <FontAwesomeIcon  style={{fontSize: '25px', cursor: 'pointer', color: 'white'}} icon={faComment}/>
        </Link>
    );
}