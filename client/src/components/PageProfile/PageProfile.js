import React, { useState, useEffect } from "react";
import styled from "styled-components";

import FakeData from "../../fakeData.json";
import ProfileContext, { ProfileProvider } from './ProfileContext';

import Container from "../Container";
import ProfileCard from './ProfileCard/ProfileCard';

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
        UpdateLike: UpdateLike
    }

    return (
        <ProfileProvider value={{...contextData}}>
            <StyledMain>
                <Container>
                    <ProfileCard/>
                </Container>
            </StyledMain>
        </ProfileProvider>
    )
}

export default PageProfile;