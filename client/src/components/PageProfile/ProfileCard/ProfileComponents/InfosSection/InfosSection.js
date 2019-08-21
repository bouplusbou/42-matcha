import React, { useContext } from 'react';
import styled from 'styled-components';

import ProfileContext from '../../../ProfileContext';
import UsernameRow from './UsernameRow';
import InfosRow from './InfosRow';
import TagsRow from './TagsRow';
import BiographyRow from './BiographyRow';


const StyledSection = styled.section `
    display:flex;
    flex:1;
    padding:1rem;

    align-items:center;
    justify-content:center;
    flex-direction:column;
`

const StyledDiv = styled.div `
    display:flex;
    justify-content:space-between;
    margin-top:auto;
    width:100%;
`

export default function InfosSection(props) {
    const profile = useContext(ProfileContext);
    return (
        <StyledSection>
            <UsernameRow/>
            <InfosRow/>
            <BiographyRow bio={profile.bio}/>
            <StyledDiv>
                <TagsRow tags={profile.tags}/>
            </StyledDiv>
        </StyledSection>
    )
}