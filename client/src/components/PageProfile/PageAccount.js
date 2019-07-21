import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faHeart } from '@fortawesome/free-solid-svg-icons';

import FakeData from "../../fakeData.json";
import ProfileContext, { ProfileProvider } from './ProfileContext';

import Container from "../Container";
import ProfileCard from './ProfileCard/ProfileCard';
import UserList from './UserList'

const profilData = {...FakeData.woman};

const StyledMain = styled.main `
`

const PageProfile = (props) => {
    
    const [profile, setProfile] = useState({...profilData});

    async function UpdateLike() {
        const liked = !profile.liked;
        const likedBy = profile.likedBy;
        const match = liked && likedBy;
        setProfile({
            ...profile,
            liked: liked,
            match: match})
    }

    const contextData = {
        ...profile,
        UpdateLike: UpdateLike,
        LikeHistory: [
            FakeData.woman,
            FakeData.woman,
            FakeData.woman,
            FakeData.woman,
            FakeData.woman,
            FakeData.woman,
            FakeData.woman,
            FakeData.woman,
            FakeData.man,
            FakeData.woman,
            FakeData.woman,
            FakeData.woman,
            FakeData.woman,
            FakeData.woman,
            FakeData.woman,
            FakeData.woman,
            FakeData.woman,
            FakeData.woman,
            FakeData.woman,
            FakeData.woman,
            FakeData.woman,
            FakeData.woman,
            FakeData.woman,
            FakeData.woman,
            FakeData.woman,
            FakeData.woman,
            FakeData.woman
        ]
    }

    const ListContainer = styled.section `
        display:grid;
        width:100%;
        margin-top:2rem;

        /* BIG RESOLUTION */
        @media (min-width: 800px) { 
            grid-template-rows:1fr; 
            grid-column-gap:2rem;
        }
        
        /* SMALL RESOLUTION */
        @media (max-width: 800px) {
            grid-template-columns: 1fr; 
            grid-template-rows: 1fr 1fr;  
        }
    `

    return (
        <ProfileProvider value={{...contextData}}>
            <StyledMain>
                <Container>
                    <ProfileCard/>
                    <ListContainer>
                        <UserList color={"#FF5B6C"} title={"Users who likes you"} icon={faHeart} list={contextData.LikeHistory}/>
                        <UserList color={"#6f48bd"} title={"Users who visited your profile"} icon={faEye} list={contextData.LikeHistory}/>
                    </ListContainer>
                </Container>
            </StyledMain>
        </ProfileProvider>
    )
}

export default PageProfile;