import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import UserCard from '../UserCard';
import Sorting from '../Sorting';
import Filtering from '../Filtering';
import MoreButton from '../MoreButton';
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
  flex-direction: column;
`;
const UserCards = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;
const NoMore = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function PageSearch() {
  const [hasNoMore, setHasNoMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sortingChoice, setSortingChoice] = useState('Closest');
  const [filterCity, setFilterCity] = useState(null);
  const [filterLatLng, setFilterLatLng] = useState(null);
  const [filterDistance, setFilterDistance] = useState(5);
  const [filterTags, setFilterTags] = useState([]);
  const [offset, setOffset] = useState(0);

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
    setIsLoading(true);
    setHasNoMore(false);
    async function fetchData() {
      const authToken = localStorage.getItem('token');
      const filters = { sortingChoice, filterAge, filterScore, filterLatLng, filterDistance, filterTags, offset }
      const res = await axios.post(`/users/search?authToken=${authToken}`, filters);
      if (res.data.usersArr.length === 0) {
        setHasNoMore(true)
      } else {
        offset !== 0 ? setUsers( prev => [...prev, ...res.data.usersArr]) : setUsers(res.data.usersArr);
      }
      setIsLoading(false);
    }
    fetchData();
  }, [sortingChoice, filterAge, filterScore, filterLatLng, filterDistance, filterTags, offset]);

  const handleSelectSorting = e => { setSortingChoice(e.target.innerText); setOffset(0); };
  const handleAgeChange = values => { setFilterAge(values); setOffset(0); };
  const handleScoreChange = values => { setFilterScore(values); setOffset(0); };
  const handleLatlngChange = ({ suggestion }) => { 
    setFilterLatLng([suggestion.latlng.lat, suggestion.latlng.lng]);
    setFilterCity(suggestion.name); 
    setOffset(0); 
  };
  const handleClickDeleteCity = () => { 
    setFilterLatLng(null);
    setFilterCity(null);
  };
  const handleDistanceChange = value => { setFilterDistance(value); setOffset(0); };
  const handleTagsChange = values => { setFilterTags(values); setOffset(0); };
  const handleClickMoreButton = () => { setOffset(offset + 20); };

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
          filterCity={filterCity}
          handleClickDeleteCity={handleClickDeleteCity}
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
      <ResultsSection
        handleClickMoreButton={handleClickMoreButton}
      >
      {!hasNoMore &&
        <UserCards>
          {users.map( (user, index) => 
            <UserCard 
              key={index}
              user={user}
              width={250}
              height={375}
            />
          )}
        </UserCards>
      }
      {!hasNoMore && !isLoading && 
        <MoreButton
          handleClickMoreButton={handleClickMoreButton}
        />
      }
      {hasNoMore && 
        <NoMore>
          <p>No more suggestion...</p>
        </NoMore>
      }
      </ResultsSection>
    </SearchSection>
  );
}