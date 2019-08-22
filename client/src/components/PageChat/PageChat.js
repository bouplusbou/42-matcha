import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

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
const Avatar = styled.div`
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
const Form = styled.form`
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
  const [discussions, setDiscussions] = useState([]);
  const [currentDiscussion, setCurrentDiscussion] = useState({});
  const [inputValue, setInputValue] = useState('');
  const authToken = localStorage.getItem('token');

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`/chat/discussions?authToken=${authToken}`);
      setDiscussions(res.data.discussions);
    };
    fetchData();
  }, [authToken]);

  const loadCurrentDiscussion = async (matchId, youUserId, youUsername, youAvatar) => {
    console.log(matchId);
    const res = await axios.post(`/chat/currentDiscussion?authToken=${authToken}`, { matchId });
    const setupCurrentDiscussion = {
      matchId,
      youUserId, 
      youUsername,
      youAvatar,
      messages: res.data.currentDiscussion,
    };
    setCurrentDiscussion(setupCurrentDiscussion);
  };

  const handleChange = event => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const matchId = currentDiscussion.matchId;
      const youUserId = currentDiscussion.youUserId;
      const message = inputValue;
      await axios.post(`/chat?authToken=${authToken}`, { matchId, youUserId, message });
      setInputValue('');
    } catch(error) { console.log(error) }
  }

  return (
    <Hero>
      <Container>
        <DiscussionsContainer>
          <DiscussionsSection>
            {discussions.map((discussion, index) => 
            <Discussion
              key={index}
              onClick={() => loadCurrentDiscussion(discussion.matchId, discussion.youUserId, discussion.youUsername, discussion.youAvatar)}
            >
              <Avatar></Avatar>
              <Username>{discussion.youUsername}</Username>
              <Status>new</Status>
              <Date>1 day ago</Date>
            </Discussion>
            )}
          </DiscussionsSection>
        </DiscussionsContainer>
        <ChatSection>
          <ChatInfo>
            <Avatar></Avatar>
            <ChatInfoUsername>{currentDiscussion.youUsername}</ChatInfoUsername>
          </ChatInfo>
          <ChatWindow>
            <MessagesSection>
            {currentDiscussion.messages && currentDiscussion.messages.map((msg, index) => {
                return msg.type === 'received' ?
                  <ReceivedMessageBlock
                    key={index}
                  >
                    <Avatar></Avatar>
                    <ReceivedMessage>{msg.message}</ReceivedMessage>
                  </ReceivedMessageBlock>
                :
                <SentMessageBlock
                  key={index}
                >
                  <SentMessage>{msg.message}</SentMessage>
                </SentMessageBlock>
            })}
            </MessagesSection>
            <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <TextField
                placeholder="Type a message..."
                multiline
                rowsMax="3"
                value={inputValue}
                onChange={handleChange}
              />
              <SendButton type='submit'>
                <FontAwesomeIcon icon={faPaperPlane}/>
              </SendButton>
            </Form>
          </ChatWindow>
        </ChatSection>
      </Container>
    </Hero>
  );
}
