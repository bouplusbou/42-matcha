import React, { Fragment, useEffect, useState, useContext, useRef } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
  background-color: ${props => props.theme.color.white};
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

const ChatSection = styled.section`
  border-radius: 20px;
  background-color: ${props => props.theme.color.lightPurple};
  overflow: hidden;
`;
const ChatInfo = styled.section`
  background-color: ${props => props.theme.color.white};
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
  &:hover {
    color: ${props => props.theme.color.purple};
  }
`;
const ChatWindow = styled.section`
  height: 650px;
  display: grid;
  grid-template-rows: 8fr 2fr;
  background-color: ${props => props.theme.color.lightPurple};
  border-radius: 20px;
`;
const MessagesSection = styled.div`
  overflow: hidden;
  overflow-y: scroll;
`;
const Form = styled.form`
  background-color: ${props => props.theme.color.white};
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
  max-width: 50%;
  overflow-wrap: break-word;
`;
const SentMessageBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 35px;
`;
const SentMessage = styled.p`
  font-family: Roboto;
  color: ${props => props.theme.color.white};
  font-size: 0.9em; 
  background-color: ${props => props.theme.color.purple};
  padding: 15px 25px;
  border-radius: 40px;
  margin-left: 20px;
  max-width: 50%;
  overflow-wrap: break-word;
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
  color: ${props => props.theme.color.white};
  font-size: 1.5rem;
  cursor: pointer;
  text-decoration: none;
  transition: background 250ms ease-in-out, 
              transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;
  &:hover,
  &:focus {
    background: ${props => props.theme.color.white};
    color: ${props => props.theme.color.purple};
    border: solid 0.5px ${props => props.theme.color.purple};
  }
  &:active {
      transform: scale(0.99);
  }
`;
const NoMatchContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.color.white};
  height: 200px;
  border-radius: 30px;
  padding: 50px;
  font-family: Roboto;
  font-weight: 500;
  color: ${props => props.theme.color.textBlack};
`;

const UnreadDot = styled.div`
    width: 25px;
    height: 25px;
    background-color: ${props => props.theme.color.red};
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const OnlineDot = styled.div`
    width: 10px;
    height: 10px;
    background-color: ${props => props.theme.color.green};
    border-radius: 100%;
    margin: 0 20px;
`;
const OfflineDot = styled.div`
    width: 10px;
    height: 10px;
    background-color: ${props => props.theme.color.red};
    border-radius: 100%;
    margin: 0 20px;
`;

export default function PageChat() {
  const {
    discussions,
    setDiscussions,
    currentDiscussionInfo,
    setCurrentDiscussionInfo,
    currentDiscussionMessages,
    setCurrentDiscussionMessages,
    setUnreadMessagesNb,
    socket,
    connectedUsers,
  } = useContext(AppContext);
  const [inputValue, setInputValue] = useState('');
  const authToken = localStorage.getItem('token');
  const refDiv = useRef(null);
  const refElem = useRef(null);
  const executeScroll = () => {
    refDiv.current.scrollTo(0, refElem.current.offsetTop)
  };

  useEffect(() => {
    return () => {
      console.log('UNMOUNT PAGECHAT & setCurrentDiscussionInfo and setCurrentDiscussionMessages to null');
      setCurrentDiscussionInfo(null);
      setCurrentDiscussionMessages(null);  
      socket.emit('setCurrentDiscussionMatchId', null);  
    }
  }, [setCurrentDiscussionInfo, setCurrentDiscussionMessages, socket]);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`/chat/discussions?authToken=${authToken}`);
      setDiscussions(res.data.discussions);
    };
    fetchData();
  }, [authToken, setDiscussions]);

  useEffect(() => {
    socket.on('reloadDiscussions', async () => {
        const resAll = await axios.get(`/chat/discussions?authToken=${authToken}`);
        setDiscussions(resAll.data.discussions);
    });
    return () => {
        socket.off('reloadDiscussions');
    }
  }, [socket, authToken, setDiscussions]);


  useEffect(() => {
    socket.on('newMessageReceived', async matchId => {
      if (currentDiscussionInfo !== null && matchId === currentDiscussionInfo.matchId) {
        const resCurrent = await axios.post(`/chat/currentDiscussionMessages?authToken=${authToken}`, { matchId });
        setCurrentDiscussionMessages(resCurrent.data.currentDiscussionMessages);
        executeScroll();
      } else {
        const resAll = await axios.get(`/chat/discussions?authToken=${authToken}`);
        setDiscussions(resAll.data.discussions);
      }
    });
    return () => {
        socket.off('newMessageReceived');
    }
  }, [authToken, setCurrentDiscussionMessages, socket, currentDiscussionInfo, setDiscussions]);

  const loadCurrentDiscussion = async (matchId, youUserId, youUsername, youAvatar) => {
    socket.emit('setCurrentDiscussionMatchId', matchId);
    const youIsOnline = false;
    setCurrentDiscussionInfo({ matchId, youUserId, youUsername, youAvatar, youIsOnline });
    const resCurrent = await axios.post(`/chat/currentDiscussionMessages?authToken=${authToken}`, { matchId });
    setCurrentDiscussionMessages(resCurrent.data.currentDiscussionMessages);
    const resAll = await axios.get(`/chat/discussions?authToken=${authToken}`);
    setDiscussions(resAll.data.discussions);
    const resUnreadMsg = await axios.get(`/chat/unreadMessagesNb?authToken=${authToken}`);
    setUnreadMessagesNb(resUnreadMsg.data.nb);
    executeScroll();
  };

  const handleChange = event => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const matchId = currentDiscussionInfo.matchId;
      const youUserId = currentDiscussionInfo.youUserId;
      const message = inputValue;
      await axios.post(`/chat?authToken=${authToken}`, { matchId, youUserId, message });
      setInputValue('');
      socket.emit('newMessageSent', {message, youUserId, matchId});
    } catch(error) { console.log(error) }
  };

  return (
    <Hero>
    { discussions !== null ?
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
              { discussion.unreadNb > 0 &&
                <UnreadDot>
                    <p style={{fontWeight: 900, fontSize: '10px', color: 'white'}}>{discussion.unreadNb}</p>
                </UnreadDot>
              }
              <Date>{discussion.duration}</Date>
            </Discussion>
            )}
          </DiscussionsSection>
        </DiscussionsContainer>
        <ChatSection>
          { currentDiscussionInfo !== null &&
            <Fragment>
              <ChatInfo>
                <Avatar></Avatar>
                <Link to={`/profile/${currentDiscussionInfo.youUsername}`} style={{textDecoration: 'none'}}>
                  <ChatInfoUsername>{currentDiscussionInfo.youUsername}</ChatInfoUsername>
                </Link>
                {connectedUsers.includes(currentDiscussionInfo.youUserId) ? 
                  <OnlineDot aria-label="This is my cool tooltip"></OnlineDot>
                  : 
                  <OfflineDot aria-label="This is my cool tooltip"></OfflineDot>
                }
              </ChatInfo>
              <ChatWindow>
                <MessagesSection
                  ref={refDiv}
                >
                {currentDiscussionMessages && currentDiscussionMessages.map((msg, index) => {
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
                  <div style={{ float:"left", clear: "both" }} ref={refElem}></div>
                </MessagesSection>
                <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
                  <TextField
                    placeholder="Type a message..."
                    value={inputValue}
                    onChange={handleChange}
                  />
                  <SendButton type='submit'>
                    <FontAwesomeIcon icon={faPaperPlane}/>
                  </SendButton>
                </Form>
              </ChatWindow> 
            </Fragment> }
        </ChatSection>
      </Container> 
      :
      <NoMatchContainer>
        <p>Sorry but you have not yet matched with anyone</p>
      </NoMatchContainer>  
    }
    </Hero>
  );
}
