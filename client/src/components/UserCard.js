import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faFireAlt } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition } from 'react-transition-group';


export default function UserCard(props) {
  const [ showInfos, setShowInfos] = useState(false);

  const { user } = props;

  const UserCard = styled.div`
    background-image: url(${user.photo});
    background-size: cover;
    background-position: center center;
    position: relative;
    width: 250px;
    height: 375px;
    margin: 20px;
    display: flex;
    align-items: flex-end;
    border-radius: 20px;
    background-color: lightgrey;
  `;
  const Hover = styled.div`
    background-color: white;
    margin: 0 auto;
    height: 100px;
    width: 80%;
    border-radius: 15px;
    padding: 1em;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15);
    position: relative;
    top: 20px;

    &.coucou-enter {
        opacity: 0;
    }

    &.coucou-enter-active {
        opacity: 1;
        transition: opacity 10000ms;
    }

    &.coucou-exit {
      opacity: 1;
    }

    &.coucou-exit-active {
      opacity: 0;
      transition: opacity 10000ms;
    }
  `;
  const Tags = styled.div`
    display: flex;
    scrollbar-width: none;
    overflowY: scroll;
    ::-webkit-scrollbar: { display: none };
  `;
  const Tag = styled.p`
    background-color: #FFD8D8;
    color: #FF7070;
    border-radius: 10px;
    padding: 5px;
    margin: 3px 5px 0 0;
  `;
  const Username = styled.p`
    font-size: 1.5em;
    margin: 0;
    color: #4A4A4A;
    font-family: Roboto;
    font-weight: 500px;
  `;
  const Fame = styled.p`
    color: #4A4A4A;
    font-family: Roboto;
    font-weight: 500px;
    text-transform: capitalize;
    font-size: 0.8em;
  `;

  const toggleHover = () => { setShowInfos(!showInfos) };


  return (
    <CSSTransition
      in={ showInfos }
      timeout={ 10000 }
      classNames="coucou"
    >
      <UserCard
        onMouseEnter={toggleHover}  
        onMouseLeave={toggleHover}  
      >
        { showInfos && 
          <Hover>
            <Username>{user.username}</Username>
            <Fame><FontAwesomeIcon style={{marginRight: '8px'}} icon={faMapMarkerAlt}/>{user.city} <FontAwesomeIcon style={{margin: '0 8px 0 15px'}} icon={faFireAlt}/>{user.fame}</Fame>
            <Tags>
              {user.tags.map( (tag, index) =>
                <Tag>
                  #{tag}
                </Tag>
              )}
            </Tags>
          </Hover> }
      </UserCard>
    </CSSTransition>
  );
}