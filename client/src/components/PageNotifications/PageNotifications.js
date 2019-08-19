import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

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
  background-color: white;
  border-radius: 20px;
  box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.1);
  max-height: 600px;
  overflow: hidden;
  h1 {
    font-size: 2rem;
    text-align: center;
    font-family: Roboto;
    color: #292929;
  }
`;
const Notifications = styled.div`
  max-height: 600px;
  overflow-y: scroll;
  padding: 10px 50px;
`;
const Notification = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #F2ECFF;
  padding: 15px;
  border-radius: 20px;
  margin: 10px;
`;
const Dot = styled.div`
    width: 10px;
    height: 10px;
    background-color: ${props => props.theme.color.lightRed};
    border-radius: 100%;
`;
 

export default function PageNotifications() {

  const [values, setValues] = useState();

  return (
    <Hero>
      <NotificationsSection>
        <Container>
          <Notifications>
            <Notification>
              <FontAwesomeIcon  style={{fontSize: '25px', color: 'white'}} icon={faEye}/>
              <p>MarionB visited your profile</p>
              <Dot></Dot>
            </Notification>
            <Notification>
              <FontAwesomeIcon  style={{fontSize: '25px', color: 'white'}} icon={faEye}/>
              <p>MarionB visited your profile</p>
              <Dot></Dot>
            </Notification>
            <Notification>
              <FontAwesomeIcon  style={{fontSize: '25px', color: 'white'}} icon={faEye}/>
              <p>MarionB visited your profile</p>
              <Dot></Dot>
            </Notification>
            <Notification>
              <FontAwesomeIcon  style={{fontSize: '25px', color: 'white'}} icon={faEye}/>
              <p>MarionB visited your profile</p>
              <Dot></Dot>
            </Notification>
            <Notification>
              <FontAwesomeIcon  style={{fontSize: '25px', color: 'white'}} icon={faEye}/>
              <p>MarionB visited your profile</p>
              <Dot></Dot>
            </Notification>
            <Notification>
              <FontAwesomeIcon  style={{fontSize: '25px', color: 'white'}} icon={faEye}/>
              <p>MarionB visited your profile</p>
              <Dot></Dot>
            </Notification>
            <Notification>
              <FontAwesomeIcon  style={{fontSize: '25px', color: 'white'}} icon={faEye}/>
              <p>MarionB visited your profile</p>
              <Dot></Dot>
            </Notification>
          </Notifications>
        </Container>
      </NotificationsSection>
    </Hero>
  );
}
