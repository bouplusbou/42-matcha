import React from 'react';
import styled from 'styled-components';

import AvatarSection from './AvatarSection.js';
import InfosSection from './InfosSection';

const StyledCard = styled.section `
    display:inline-grid;

    margin-top:3rem;
    width:100%;

    border-radius: ${props => props.theme.borderRadius};
    background-color: ${props => props.theme.color.background};
    box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.1);
    overflow:hidden;
    
    /* BIG RESOLUTION */
    @media (min-width: 600px) { grid-template-columns: 300px auto; }

    /* SMALL RESOLUTION */
    @media (max-width: 600px) {
        grid-template-rows: 50% auto; 
        margin-top:0;
    }
`

export default function ProfileCard(props) {
    return (
        <StyledCard>
            <AvatarSection/>
            <InfosSection/>
        </StyledCard>
    )
}