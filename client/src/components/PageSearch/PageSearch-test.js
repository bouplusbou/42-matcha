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

  const [filterScore, setFilterScore] = useState([0, 100000]);
  const [filterLatLng, setFilterLatLng] = useState([48.856697, 2.351462]);
  const [filterDistance, setFilterDistance] = useState(null);
  const [filterTags, setFilterTags] = useState(null);





  
  const [filterAge, setFilterAge] = useState([18, 60]);
  const [rangeAge, setRangeAge] = useState([0, 100]);
  useEffect(() => {
    async function fetchData() {
      const authToken = localStorage.getItem('token');
      const filtersRange = await axios.get(`/users/filtersMinMax?authToken=${authToken}`);
      setFilterAge(filtersRange.data.age);
      setRangeAge(filtersRange.data.age);
    }
    fetchData();
  }, []);




  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const authToken = localStorage.getItem('token');
      const filters = { sortingChoice, filterAge, filterScore, filterTags }
      const users = await axios.post(`/users/search?authToken=${authToken}`, filters);
      setUsers(users.data.usersArr);
    }
    fetchData();
  }, [sortingChoice, filterAge, filterScore, filterTags]);





  const handleSelectSorting = e => { setSortingChoice(e.target.innerText); };
  const handleAgeChange = async values => { 
    console.log(values);
    setFilterAge(values);
  };


  return (
    <SearchSection>
      <FilteringSection>
        <Filtering 
          filterAge={filterAge}
          handleAgeChange={handleAgeChange}
          rangeAge={rangeAge}
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