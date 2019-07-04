import React, { useState } from 'react';
import styled from 'styled-components';
import UserCard from './UserCard';
import Sorting from './Sorting';
import Filtering from './Filtering';

const usersArr = Array(30).fill({
  username: 'mimyK',
  gender: 'woman',
  age: 23,
  city: 'Paris',
  fame: 100,
  orientation: 'homo',
  photo: 'https://i.ibb.co/Qp5gpX9/woman568.jpg',
  tags: ['lol', 'rainbow', 'burritos'],
});

const tags = [
  { value: 1, label: 'burritos'},
  { value: 2, label: 'yolo'},
  { value: 3, label: 'tofu'},
];

export default function PageSearch() {
  const [users, setUsers] = useState(usersArr);
  const [sortingChoice, setSortingChoice] = useState('Most famous');
  const [filterAge, setFilterAge] = useState([18, 100]);
  const [filterFame, setFilterFame] = useState([0, 1000]);
  const [filterLatLng, setFilterLatLng] = useState([48.856697, 2.351462]);
  const [filterTags, setFilterTags] = useState(tags);
  const authToken = localStorage.getItem('token');

  const SearchSection = styled.section`
    margin: 3vw 10vw;
    display: grid;
    grid-template-columns: 330px 1fr;
    grid-gap: 10px;
    grid-template-areas:
      "filtering sorting"
      "filtering results";
    @media (max-width: 750px) {
      grid-gap: 50px;
      grid-template-columns: 1fr;
      grid-template-areas:
        "filtering"
        "sorting"
        "results";
    }
  `;
  const FilteringSection = styled.aside`
    grid-area: filtering;
    justify-self: center;
  `;
  const SortingSection = styled.aside`
    grid-area: sorting;
    justify-self: end;
    @media (max-width: 750px) {
      justify-self: center;
    }
  `;
  const ResultsSection = styled.section`
    grid-area: results;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  `;

  const selectSorting = e => { setSortingChoice(e.target.innerText) };
  const handleAgeChange = () => {};
  const handleFameChange = () => {};
  const handleLatlngChange = () => {};
  const handleTagsChange = () => {};

  return (
    <SearchSection>
      <FilteringSection>
        <Filtering 
          filterAge={filterAge}
          handleAgeChange={handleAgeChange}
          filterFame={filterFame}
          handleFameChange={handleFameChange}
          handleLatlngChange={handleLatlngChange}
          filterTags={filterTags}
          handleTagsChange={handleTagsChange}
        />
      </FilteringSection>
      <SortingSection>
        <Sorting 
          sortingChoice={sortingChoice}
          selectSorting={selectSorting}
        />
      </SortingSection>
      <ResultsSection>
        {users.map( user => 
          <UserCard user={user}/>
        )}
      </ResultsSection>
    </SearchSection>
  );
}