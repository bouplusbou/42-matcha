import React from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faSearch, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';

import { ProfileConsumer } from '../../../ProfileContext';

const StyledRow = styled.div `
    display:flex;
    width:100%;
    margin-bottom:1rem;

    justify-content:center;
    align-items:center;
    
    color: ${props => props.theme.color.lightRed};
`

const StyledCase = styled.div `
    display:flex;
    flex:1;
    height:4rem;

    justify-content:center;
    align-items:center;
    :not(:first-child) {
        border-left:1px solid #a275f0;
    }
`

const StyledIcon = styled(FontAwesomeIcon) `
    margin-right:1rem;
`

const StyledSpan = styled.span `
    font-size:1.25rem;
    font-weight:bold;
`

const AgeCase = (props) => {
    const age = `${props.age} years old`;
    return (
        <StyledCase>
            <StyledIcon icon={props.icon} size={"2x"}/>
            <StyledSpan><strong>{age}</strong></StyledSpan>
        </StyledCase>
    )      
}

const LocalisationCase = (props) => {
    return (
        <StyledCase>
            <StyledIcon icon={props.icon} size={"2x"}/>
            <StyledSpan><strong>{props.city}</strong></StyledSpan>
        </StyledCase>
    )      
}

const LookingForCase = (props) => {
    let lookingFor = null;
    if ((props.gender === "man" && props.orientation === "straight") || 
        (props.gender === "woman" && props.orientation === "homosexual"))
        lookingFor = "Woman";
    else if ((props.gender === "woman" && props.orientation === "straight") || 
            (props.gender === "man" && props.orientation === "homosexual"))
        lookingFor = "Man";
    else
        lookingFor = "Woman & Man" 
    return (
        <StyledCase>
            <StyledIcon icon={props.icon} size={"2x"}/>
            <StyledSpan><strong>{lookingFor}</strong></StyledSpan>
        </StyledCase>
    )      
}

const InfosRow = (props) => {
    return (
        <ProfileConsumer>
            {profile =>(
                <StyledRow>
                    <AgeCase icon={faCalendarAlt} age={profile.age}/>
                    <LocalisationCase icon={faMapMarkedAlt} city={profile.city}/>
                    <LookingForCase icon={faSearch} gender={profile.gender} orientation={profile.orientation}/>
                </StyledRow>
            )}
        </ProfileConsumer>
    )
}

export default InfosRow;