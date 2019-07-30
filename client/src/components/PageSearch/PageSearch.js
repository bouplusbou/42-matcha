import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import UserCard from '../UserCard';
import Sorting from '../Sorting';
import Filtering from '../Filtering';
import axios from 'axios';

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

export default function PageSearch() {
  const [sortingChoice, setSortingChoice] = useState('Closest');
  const [filterLatLng, setFilterLatLng] = useState(null);
  const [filterDistance, setFilterDistance] = useState(5);
  const [filterTags, setFilterTags] = useState(null);

  const [filterAge, setFilterAge] = useState([18, 60]);
  const [rangeAge, setRangeAge] = useState([0, 100]);
  const [filterScore, setFilterScore] = useState([0, 100000]);
  const [rangeScore, setRangeScore] = useState([0, 100000]);
  useEffect(() => {
    async function fetchData() {
      const authToken = localStorage.getItem('token');
      const res = await axios.get(`/users/filtersMinMax?authToken=${authToken}`);
      setFilterAge(res.data.age);
      setRangeAge(res.data.age);
      setFilterScore(res.data.score);
      setRangeScore(res.data.score);
    }
    fetchData();
  }, []);


  const [allTags, setAllTags] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const authToken = localStorage.getItem('token');
      const res = await axios.get(`/tags?authToken=${authToken}`);
      setAllTags(res.data.tags);
    }
    fetchData();
  }, []);


  const [users, setUsers] = useState([]);
  useEffect(() => {
    console.log('HERE');
    async function fetchData() {
      const authToken = localStorage.getItem('token');
      const filters = { sortingChoice, filterAge, filterScore, filterLatLng, filterDistance, filterTags }
      const res = await axios.post(`/users/search?authToken=${authToken}`, filters);
      setUsers(res.data.usersArr);
    }
    fetchData();
  }, [sortingChoice, filterAge, filterScore, filterLatLng, filterDistance, filterTags]);


  const handleSelectSorting = e => { setSortingChoice(e.target.innerText); };
  const handleAgeChange = values => { setFilterAge(values); };
  const handleScoreChange = values => { setFilterScore(values); };
  const handleLatlngChange = ({ suggestion }) => { setFilterLatLng([suggestion.latlng.lat, suggestion.latlng.lng]); };
  const handleDistanceChange = value => { setFilterDistance(value); };

  const handleTagsChange = values => { setFilterTags(values); };

  return (
    <SearchSection>
      <FilteringSection>
        <Filtering 
          filterAge={filterAge}
          handleAgeChange={handleAgeChange}
          rangeAge={rangeAge}
          filterScore={filterScore}
          rangeScore={rangeScore}
          handleScoreChange={handleScoreChange}
          handleLatlngChange={handleLatlngChange}
          filterDistance={filterDistance}
          handleDistanceChange={handleDistanceChange}
          allTags={allTags}
          filterTags={filterTags}
          handleTagsChange={handleTagsChange}
        />
      </FilteringSection>
      <SortingSection>
        <Sorting 
          sortingChoice={sortingChoice}
          handleSelectSorting={handleSelectSorting}
        />
      </SortingSection>
      <ResultsSection>
        {users.map( user => 
          <UserCard 
            user={user}
            width={250}
            height={375}
          />
        )}
      </ResultsSection>
    </SearchSection>
  );
}