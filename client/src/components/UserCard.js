import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faFireAlt } from '@fortawesome/free-solid-svg-icons';


export default function UserCard({ user, width, height }) {
  const [ showInfos, setShowInfos] = useState(false);

  const UserCard = styled.div`
    background-image: url(${user.photo});
    background-size: cover;
    background-position: center center;
    position: relative;
    width: ${width}px;
    height: ${height}px;
    margin: 20px;
    display: flex;
    align-items: flex-end;
    border-radius: 20px;
    background-color: lightgrey;
    position: relative;
    z-index: 5;
    @media (max-width: 630px) {
      width: 200px;
      height: 300px;
    }
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
  `;
  const Tags = styled.div`
    display: flex;
    scrollbar-width: none;
    overflowY: scroll;
    ::-webkit-scrollbar: { display: none };
  `;
  const Tag = styled.p`
    background-color: #E3D4FF;
    color: #6F48BD;
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
  const Score = styled.p`
    color: #4A4A4A;
    font-family: Roboto;
    font-weight: 500px;
    text-transform: capitalize;
    font-size: 0.8em;
  `;

  const toggleHover = () => { setShowInfos(!showInfos) };


  return (
    <UserCard
      onMouseEnter={toggleHover}  
      onMouseLeave={toggleHover}
    >
      { showInfos && 
        <Hover>
          <Username>{user.username}</Username>
          <Score><FontAwesomeIcon style={{marginRight: '8px'}} icon={faMapMarkerAlt}/>{user.city} <FontAwesomeIcon style={{margin: '0 8px 0 15px'}} icon={faFireAlt}/>{user.score}</Score>
          <Tags>
            {user.tags.map( (tag, index) =>
              <Tag>
                #{tag}
              </Tag>
            )}
          </Tags>
        </Hover> }
    </UserCard>
  );
}