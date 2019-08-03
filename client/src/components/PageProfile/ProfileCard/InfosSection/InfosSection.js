import React, { useContext } from 'react';
import styled from 'styled-components';

import ProfileContext from '../../ProfileContext';
import UsernameRow from './UsernameRow';
import InfosRow from './InfosRow';
import TagsRow from './TagsRow';
import BiographyRow from './BiographyRow';


const StyledSection = styled.section `
    display:flex;
    flex:1;
    padding:1rem;

    align-items:flex-start;
    flex-direction:column;
`

export default function InfosSection(props) {
    const profile = useContext(ProfileContext);
    return (
        <StyledSection>
            <UsernameRow/>
            <InfosRow/>
            <BiographyRow bio={profile.bio}/>
            <TagsRow tags={profile.tags}/>
            {/* <PhotosRow photos={profile.photos} avatar={profile.avatar}/> */}
        </StyledSection>
    )
}