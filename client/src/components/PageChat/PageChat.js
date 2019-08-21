import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
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
const DiscussionsSection = styled.aside`
  padding: 20px;
  border-radius: 20px;
  background-color: ${props => props.theme.color.lightPurple};
`;
const ChatSection = styled.section`
  display: grid;
  grid-template-rows: 8fr 2fr;
  grid-gap: 30px;
  padding: 30px;
  border-radius: 20px;
  background-color: ${props => props.theme.color.lightPurple};
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
const Info = styled.div`
  color: ${props => props.theme.color.textGrey};
  align-self: start;
  justify-self: right;
  font-family: Roboto;
  font-weight: 500;
  font-size: 0.8em;
`;
const DotMessage = styled.div`
  background-color: ${props => props.theme.color.red};
  height: 10px;
  width: 10px;
  border-radius: 100%;
`;
const ChatWindow = styled.section`
  background-color: ${props => props.theme.color.lightPurple};
  border-radius: 20px;

`;
const InputSection = styled.section`
  background-color: white;
  border-radius: 20px;
`;
const Date = styled.p`
  margin-right: 20px;
`;
const IncomingMessage = styled.div`
`;
const SentMessage = styled.div`
`;
export default function PageChat() {

  return (
    <Hero>
      <Container>
        <DiscussionsSection>
          <Discussion>
            <ProfilePic></ProfilePic>
            <Username>Boris Johnson</Username>
            <Info>
              <Date>2 feb</Date>
              <DotMessage></DotMessage>
            </Info>
          </Discussion>
        </DiscussionsSection>
        <ChatSection>
          <ChatWindow>
            <IncomingMessage>
              <ProfilePic></ProfilePic>
            </IncomingMessage>
            <SentMessage></SentMessage>
          </ChatWindow>
          <InputSection></InputSection>
        </ChatSection>
      </Container>
    </Hero>
  );
}
