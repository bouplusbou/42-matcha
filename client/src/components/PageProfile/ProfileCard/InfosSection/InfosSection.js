import React from 'react';
import styled from 'styled-components';

import ProfileContext, { ProfileConsumer } from '../../ProfileContext';
import UsernameRow from './UsernameRow';
import InfosRow from './InfosRow';
import PhotosRow from './PhotosRow';
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
    return (
            <ProfileConsumer>
                {profile => (

                    <StyledSection>
                        <UsernameRow/>
                        <InfosRow/>
                        <BiographyRow bio={profile.bio}/>
                        <TagsRow tags={profile.tags}/>
                        {/* <PhotosRow photos={profile.photos} avatar={profile.avatar}/> */}
                    </StyledSection>

                )}
            </ProfileConsumer>
    )
}