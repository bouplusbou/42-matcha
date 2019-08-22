import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import AppContext from '../../AppContext';

const Hero = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.color.purple};
  height: 100vh;
`;
const Container = styled.aside`
  height: 800px;
  width: 1200px;
  display: grid;
  grid-template-columns: 2fr 4fr;
  column-gap: 20px;
`;
const DiscussionsContainer = styled.aside`
  /* padding: 20px; */
  border-radius: 20px;
  background-color: ${props => props.theme.color.lightPurple};
  overflow: hidden;
`;
const DiscussionsSection = styled.section`
  padding: 20px;
  height: 800px;
  overflow-y: scroll;
`;
const Discussion = styled.div`
  display: grid;
  grid-template-columns: 2fr 4fr 2fr;
  align-items: center;
  background-color: white;
  height: 100px;
  width: 100%;
  margin-bottom: 20px;
  border-radius: 10px;
  position: relative;
`;
const ProfilePic = styled.div`
  background-color: lightgrey;
  height: 50px;
  width: 50px;
  border-radius: 100%;
  justify-self: center;
`;
const Username = styled.p`
  color: ${props => props.theme.color.textBlack};
  font-family: Roboto;
  font-weight: 500;
  font-size: 0.8em;
`;

const Date = styled.p`
  position: absolute;
  top: 0;
  right: 20px;
  color: ${props => props.theme.color.textGrey};
  font-family: Roboto;
  font-weight: 500;
  font-size: 0.8em;
`;

const Status = styled.p`
  margin-right: 50px;
  color: ${props => props.theme.color.lightRed};
  justify-self: right;
  font-family: Roboto;
  font-weight: 500;
  font-size: 0.8em;
  background-color: ${props => props.theme.color.ultraLightRed};
  padding: 6px 10px;
  border-radius: 10px;
  border: solid ${props => props.theme.color.lightRed} 0.5px;
`;



const ChatSection = styled.section`
  border-radius: 20px;
  background-color: ${props => props.theme.color.lightPurple};
  overflow: hidden;
`;
const ChatInfo = styled.section`
  background-color: white;
  height: 100px;
  display: flex;
  align-items: center;
  padding: 0 30px;
`;
const ChatInfoUsername = styled.p`
  font-family: Roboto;
  font-weight: 500;
  color: ${props => props.theme.color.textBlack};
  margin-left: 30px;
`;
const ChatWindow = styled.section`
  height: 650px;
  display: grid;
  grid-template-rows: 8fr 2fr;
  padding-top: 20px;
  background-color: ${props => props.theme.color.lightPurple};
  border-radius: 20px;
`;
const MessagesSection = styled.div`
  overflow: hidden;
  overflow-y: scroll;
`;
const InputSection = styled.section`
  background-color: white;
  border-radius: 20px;
  padding: 30px;
  display: grid;
  grid-template-columns: 9fr 1fr;
  align-items: center;
  margin: 0 20px;
`;
const ReceivedMessageBlock = styled.div`
  display: flex;
  align-items: center;
  margin-left: 35px;
`;
const ReceivedMessage = styled.p`
  font-family: Roboto;
  color: ${props => props.theme.color.textBlack};
  font-size: 0.9em; 
  background-color: #E7E7E8;
  padding: 15px 25px;
  border-radius: 40px;
  margin-left: 20px;
`;
const SentMessageBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  margin-right: 35px;
`;
const SentMessage = styled.p`
  font-family: Roboto;
  color: white;
  font-size: 0.9em; 
  background-color: ${props => props.theme.color.purple};
  padding: 15px 25px;
  border-radius: 40px;
  margin-left: 20px;
`;
const SendButton = styled.button`
  height: 50px;
  width: 50px;
  border-radius: 100%;
  justify-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: ${props => props.theme.color.purple};
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  text-decoration: none;
  transition: background 250ms ease-in-out, 
              transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;
  &:hover,
  &:focus {
    background: white;
    color: ${props => props.theme.color.purple};
    border: solid 0.5px ${props => props.theme.color.purple};
  }
  &:active {
      transform: scale(0.99);
  }
`;


export default function PageChat() {

  return (
    <Hero>
      <Container>
        <DiscussionsContainer>
          <DiscussionsSection>
            <Discussion>
              <ProfilePic></ProfilePic>
              <Username>Boris Johnson</Username>
              <Status>new</Status>
              <Date>2 feb</Date>
            </Discussion>
            <Discussion>
              <ProfilePic></ProfilePic>
              <Username>Boris Johnson</Username>
              <Status>new</Status>
              <Date>2 feb</Date>
            </Discussion>
          </DiscussionsSection>
        </DiscussionsContainer>
        <ChatSection>
          <ChatInfo>
            <ProfilePic></ProfilePic>
            <ChatInfoUsername>Boris Johnson</ChatInfoUsername>
          </ChatInfo>
          <ChatWindow>
            <MessagesSection>
              <ReceivedMessageBlock>
                <ProfilePic></ProfilePic>
                <ReceivedMessage>Hello sweet child</ReceivedMessage>
              </ReceivedMessageBlock>
              <SentMessageBlock>
                <SentMessage>Hi you perv</SentMessage>
              </SentMessageBlock>
            </MessagesSection>
            <InputSection>
              <TextField
                id="standard-multiline-flexible"
                placeholder="Type a message..."
                multiline
                rowsMax="3"
                // value={values.multiline}
                // onChange={handleChange('multiline')}
                // className={classes.textField}
                // margin="normal"
              />
              <SendButton>
                <FontAwesomeIcon icon={faPaperPlane}/>
              </SendButton>
            </InputSection>
          </ChatWindow>
        </ChatSection>
      </Container>
    </Hero>
  );
}
