import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';

import AvatarSection from './ProfileComponents/AvatarSection';
import InfosSection from './ProfileComponents/InfosSection';
import ProfileContext from '../ProfileContext.js';
import EditProfileSection from './EditComponents/EditProfileSection';
import EditAccountSection from './EditComponents/EditAccountSection';
import EditSectionMenu from './EditComponents/EditMenu';

const StyledCard = styled.section `
    display:flex;

    min-height:375px;
    max-width:1000px;
    width:100%;

    border-radius: ${props => props.theme.borderRadius};
    background-color: ${props => props.theme.color.background};
    box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.1);
    @media (max-width: 1000px) { border-radius: 0px; }
    @media (max-width: 700px) { flex-direction:column; }
`

export default function ProfileCard(props) {
    const profile = useContext(ProfileContext);
    const [editState, setEditState] = useState({
        selectedTab: "profile"
    })

    const editSectionsList = {
        profile: <EditProfileSection/>,
        account: <EditAccountSection/>
    }

    const handleTabChange = event => {
        const selectedTab = event.target.id;
        setEditState({ selectedTab: selectedTab })
    }

    return (
        <StyledCard>
            {profile.username &&
            <React.Fragment>
                    {profile.edit ?
                        <EditSectionMenu selectedTab={editState.selectedTab} handleClick={handleTabChange}/> :
                        <AvatarSection/>
                    }
                    {profile.edit ? 
                        editSectionsList[editState.selectedTab] :
                        <InfosSection/>
                    }
            </React.Fragment>
        }
        </StyledCard>
    )
}