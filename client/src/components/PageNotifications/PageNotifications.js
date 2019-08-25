import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import AppContext from '../../AppContext';


const Hero = styled.section`
  background-color: ${props => props.theme.color.purple};
  height: 100vh;
`;
const NotificationsSection = styled.section`
  display: flex;
  justify-content: center;
  padding-top: 10%;
`;
const Container = styled.section`
  flex-basis: 600px;
  background-color: ${props => props.theme.color.white};
  border-radius: 20px;
  box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.1);
  max-height: 600px;
  overflow: hidden;
  h1 {
    font-size: 2rem;
    text-align: center;
    font-family: Roboto;
    color: ${props => props.theme.color.textBlack};
  }
`;
const Notifications = styled.div`
  max-height: 600px;
  overflow-y: scroll;
  padding: 10px 50px;
`;
const Notification = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr 1fr;
  align-items: center;
  background-color: ${props => props.theme.color.lightPurple};
  padding: 15px;
  border-radius: 20px;
  margin: 10px;
`;
const Dot = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${props => props.theme.color.lightRed};
  border-radius: 100%;
  justify-self: end;
`;
const Days = styled.p`
  font-size: 0.8em;
  font-weight: 700;
  color: ${props => props.theme.color.purple};
  justify-self: end;
`;
 

export default function PageNotifications() {

  const [notifications, setNotifications] = useState([]);
  const appState = useContext(AppContext);
  const setUnseenNotificationsNb = appState.setUnseenNotificationsNb;

  useEffect(() => {
    async function fetchData() {
      const authToken = localStorage.getItem('token');
      const res = await axios.get(`/notifications?authToken=${authToken}`);
      setNotifications(res.data.notifications);
      setUnseenNotificationsNb(0);
    };
    fetchData();
  }, [setUnseenNotificationsNb]);

  return (
    <Hero>
      <NotificationsSection>
        <Container>
          <Notifications>
            {notifications.map((notification, index) => 
              <Notification
                key={index}
              >
                <FontAwesomeIcon style={{fontSize: '25px', color: 'white'}} icon={faEye}/>
                <p>{notification.username} {notification.type} your profile</p>
                <Days>
                  {notification.days} days ago
                </Days>
                {notification.status === 'unseen' && 
                  <Dot></Dot>
                }
              </Notification>
            )}
          </Notifications>
        </Container>
      </NotificationsSection>
    </Hero>
  );
}
