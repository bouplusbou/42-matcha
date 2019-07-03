import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import UserCard from './UserCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const usersArr = [
  {
    username: 'mimyK',
    gender: 'woman',
    age: 23,
    city: 'Paris',
    fame: 100,
    orientation: 'homo',
    photo: 'https://i.ibb.co/Qp5gpX9/woman568.jpg',
    tags: ['lol', 'rainbow', 'burritos'],
  }, 
  {
    username: 'mimyK',
    gender: 'woman',
    age: 23,
    city: 'Paris',
    fame: 100,
    orientation: 'homo',
    photo: 'https://i.ibb.co/Qp5gpX9/woman568.jpg',
    tags: ['lol', 'rainbow', 'burritos'],
  }, 
  {
    username: 'mimyK',
    gender: 'woman',
    age: 23,
    city: 'Paris',
    fame: 100,
    orientation: 'homo',
    photo: 'https://i.ibb.co/Qp5gpX9/woman568.jpg',
    tags: ['lol', 'rainbow', 'burritos'],
  }
];

export default function PageSearch() {
  const [users, setUsers] = useState(usersArr);

  const SearchSection = styled.section`
    margin: 3vw 10vw;
    display: grid;
    grid-template-columns: 1fr 4fr;
    grid-gap: 10px;
    grid-template-areas:
      "filtering sorting"
      "filtering results";
  `;
  const Filtering = styled.aside`
    grid-area: filtering;
  `;
  const Sorting = styled.aside`
    grid-area: sorting;
    justify-self: end;
  `;
  const Results = styled.section`
    grid-area: results;
    display: flex;
  `;

  return (
    <SearchSection>
      <Filtering></Filtering>
      <Sorting><p><span style={{color: '#CBCBCB', marginRight: '5px'}}>Sort by:</span> Youngest <FontAwesomeIcon style={{color: '#FB8585', margin: '0 8px'}} icon={faChevronDown}/></p></Sorting>
      <Results>
        {users.map( user => 
          <UserCard user={user}/>
        )}
      </Results>
    </SearchSection>
  );
}