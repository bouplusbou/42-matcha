import React, { useState } from 'react';
import styled from 'styled-components';
import Sorting from '../Sorting';
import Filtering from '../Filtering';
import Results from '../Results';


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
  const [filterDistance, setFilterDistance] = useState(0);
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
    @media (max-width: 1080px) {
      margin: 0;
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
    @media (max-width: 1080px) {
      justify-self: center;
    }
  `;
  const ResultsSection = styled.section`
    grid-area: results;
  `;


  const selectSorting = e => { setSortingChoice(e.target.innerText); };
  const handleAgeChange = values => { setFilterAge(values); };
  const handleFameChange = values => { setFilterFame(values); };
  const handleLatlngChange = () => {};
  const handleDistanceChange = value => { setFilterDistance(value); };
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
          filterDistance={filterDistance}
          handleDistanceChange={handleDistanceChange}
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
        <Results 
          users={users}
        />
      </ResultsSection>
    </SearchSection>
  );
}