import React, { useContext } from 'react';
import styled from 'styled-components';

import AvatarSection from './AvatarSection.js';
import InfosSection from './InfosSection';
import EditSection from './EditSection';
import ProfileContext from '../ProfileContext.js';

const StyledCard = styled.section `
    display:flex;

    min-height:350px;
    width:100%;

    border-radius: ${props => props.theme.borderRadius};
    background-color: ${props => props.theme.color.background};
    box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.1);
    @media (max-width: 1000px) {
        border-radius: 0px; 
    }
    @media (max-width: 700px) { 
        flex-direction:column;
    }
`

export default function ProfileCard(props) {
    const profile = useContext(ProfileContext);
    return (
        <StyledCard>
            {profile.username &&
            <React.Fragment>
                <AvatarSection/>
                {profile.edit ?
                    <EditSection/> :
                    <InfosSection/>
                }
            </React.Fragment>
        }
        </StyledCard>
    )
}