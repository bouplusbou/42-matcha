import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Sorting from '../../../components/Sorting';
import Filtering from '../../../components/Filtering';
import Results from '../../../components/Results';
import IncompleteProfile from '../../../components/IncompleteProfile';
import axios from 'axios';


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

export default function PageSearch() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasNoMore, setHasNoMore] = useState(false);
  const [sortingChoice, setSortingChoice] = useState('Closest');
  const [filterCity, setFilterCity] = useState(null);
  const [filterLatLng, setFilterLatLng] = useState(null);
  const [isOwnCity, setIsOwnCity] = useState(true);
  const [filterDistance, setFilterDistance] = useState(20);
  const [filterTags, setFilterTags] = useState([]);
  const [filterAge, setFilterAge] = useState([18, 60]);
  const [rangeAge, setRangeAge] = useState([0, 100]);
  const [filterScore, setFilterScore] = useState([0, 100000]);
  const [rangeScore, setRangeScore] = useState([0, 100000]);
  const [hasFullProfile, setHasFullProfile] = useState(true);
  const [missingProfileFields, setMissingProfileFields] = useState(false);
  const [allTags, setAllTags] = useState(null);
  const [user, setUser] = useState(['init user']);

  const authToken = localStorage.getItem('token');

  useEffect(() => {
    let isSubscribed = true;
    setIsLoading(true);
    async function fetchData() {
      const res = await axios.get(`/users/hasFullProfile?authToken=${authToken}`);
      const missingFields = [];
      if (res.data.fields.birthDate === null) missingFields.push('your birthdate');
      if (res.data.fields.gender === null) missingFields.push('your gender');
      if (res.data.fields.orientation === null) missingFields.push('your sexual orientation');
      if (res.data.fields.lookingFor === null) missingFields.push('who you are looking for');
      if (missingFields.length !== 0) {
        if (isSubscribed) {
          setMissingProfileFields(missingFields);
          setHasFullProfile(false);
          setIsLoading(false);
        }
      }
    }
    fetchData();
    return () => isSubscribed = false;
  }, [authToken]);

  useEffect(() => {
    let isSubscribed = true;
    async function fetchData() {
      const res = await axios.get(`/search/ownCityLatLng?authToken=${authToken}`);
      if (isSubscribed) {
        setFilterCity(res.data.cityLatLng.city);
        setFilterLatLng(res.data.cityLatLng.latLng);
      }
    }
    fetchData();
    return () => isSubscribed = false;
  }, [authToken]);

  useEffect(() => {
    let isSubscribed = true;
    async function fetchData() {
      const res = await axios.get(`/search/filtersMinMax?authToken=${authToken}`);
      if (isSubscribed) {
        setFilterAge(res.data.age);
        setRangeAge(res.data.age);
        setFilterScore(res.data.score);
        setRangeScore(res.data.score);
      }
    }
    fetchData();
    return () => isSubscribed = false;
  }, [authToken]);

  useEffect(() => {
    let isSubscribed = true;
    async function fetchData() {
      const authToken = localStorage.getItem('token');
      const res = await axios.get(`/tags?authToken=${authToken}`);
      if (isSubscribed) setAllTags(res.data.tags);
    }
    fetchData();
    return () => isSubscribed = false;
  }, [authToken]);

  useEffect(() => {
    let isSubscribed = true;
    setIsLoading(true);
    setHasNoMore(false);
    async function fetchData() {
      const filters = { sortingChoice, filterAge, filterScore, filterLatLng, filterDistance, filterTags }
      const res = await axios.post(`/search/matcher?authToken=${authToken}`, filters);
      if (isSubscribed) {
        res.data.usersArr.length === 0 ? setHasNoMore(true) : setUser(res.data.usersArr[0]);
        setIsLoading(false);
      }
    }
    fetchData();
    return () => isSubscribed = false;
  }, [authToken, sortingChoice, filterAge, filterScore, filterLatLng, filterDistance, filterTags]);

  const handleLikeDislike = async type => {
    setIsLoading(true);
    const payload = {
      type: type,
      z: user.username,
    };
    axios.post(`/users/createRelationship?authToken=${authToken}`, payload);
    const filters = { sortingChoice, filterAge, filterScore, filterLatLng, filterDistance, filterTags }
    const res = await axios.post(`/search/matcher?authToken=${authToken}`, filters);
    res.data.usersArr.length === 0 ? setHasNoMore(true) : setUser(res.data.usersArr[0]);
    setIsLoading(false);
  };
  const handleSelectSorting = e => { setSortingChoice(e.target.innerText); };
  const handleAgeChange = values => { setFilterAge(values); };
  const handleScoreChange = values => { setFilterScore(values); };
  const handleLatlngChange = ({ suggestion }) => { 
    setIsOwnCity(false);
    setFilterLatLng([suggestion.latlng.lat, suggestion.latlng.lng]);
    setFilterCity(suggestion.name);
  };
  const handleClickDeleteCity = async () => { 
    setFilterLatLng(null);
    setFilterCity(null);
    const res = await axios.get(`/search/ownCityLatLng?authToken=${authToken}`);
    setFilterCity(res.data.cityLatLng.city);
    setFilterLatLng(res.data.cityLatLng.latLng);
    setIsOwnCity(true);
  };
  const handleDistanceChange = value => { setFilterDistance(value); };
  const handleTagsChange = values => { 
    values !== null ? setFilterTags(values) : setFilterTags([]);
  };
  
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
          isOwnCity={isOwnCity}
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
      <ResultsSection>
        {!isLoading && !hasFullProfile &&
          <IncompleteProfile 
            missingProfileFields={missingProfileFields}
          />
        }
        {!isLoading && hasFullProfile &&
          <Results 
            handleLikeDislike={handleLikeDislike}
            user={user}
            hasNoMore={hasNoMore}
          />
        }
      </ResultsSection>
    </SearchSection>
  );
}
