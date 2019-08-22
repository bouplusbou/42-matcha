import React, { useState, useEffect } from "react";
import axios from 'axios';
import Container from '../Container';
import { ProfileProvider } from '../ProfileContext';
import styled from 'styled-components'
import EditMenu from './EditMenu';
import EditProfileSection from './EditProfileSection'
import EditAccountSection from './EditAccountSection'

const authToken = localStorage.getItem('token');

const EditCard = styled.div`
        display:flex;
        max-width:1000px;
        width:100%;
        border-radius: ${props => props.theme.borderRadius};
        background-color: ${props => props.theme.color.background};
        box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.1);
        @media (max-width: 1000px) { border-radius: 0px; }
        @media (max-width: 700px) { flex-direction:column; }
`

export default function PageProfileEdit() {

    const [profileState, setProfileState] = useState({});
    const [editState, setEditState] = useState({ tab: "profile" });
    const sectionsList = {
        "profile": <EditProfileSection/>,
        "account": <EditAccountSection/>,
    }

    useEffect(() => {
        async function fetchProfile() {
            const profile = await axios.get(`/users?authToken=${authToken}`)
            setProfileState({ ...profile.data.profile });
        }
        fetchProfile();
    }, [])
    

    const switchTab = event => {
        const selectedTab = event.target.id;
        setEditState({ tab: selectedTab })
    }

    return (
        <ProfileProvider value={{...profileState}}>
            <Container>
                {profileState.username && 
                    <EditCard>
                        <EditMenu selectedTab={editState.tab} handleClick={switchTab}/>
                        {sectionsList[editState.tab]}
                    </EditCard>
                }
            </Container>
        </ProfileProvider>
    )
}