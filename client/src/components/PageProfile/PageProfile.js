import React, { Fragment, useState } from "react";

import FakeData from "../../fakeData.json";
import ProfileContext, { ProfileProvider } from './ProfileContext';
import { faEye, faHeart } from '@fortawesome/free-solid-svg-icons';

import Container from "../Container";
import ProfileCard from './ProfileCard/ProfileCard';
import UserList from './UserList'
import styled from 'styled-components';

const GridContainer = styled.div `
    display:grid;
    margin-top:2rem;

    grid-template-columns:1fr;
    grid-template-rows:auto;
    grid-row-gap:2rem;
    @media (max-width: 1000px) {
        grid-row-gap:0rem;
        margin-top:0;    
    }
`

export default function PageProfile(props) {

    const profilData = {...FakeData.woman};

    const [profileState, setProfileState] = useState({
        ...profilData,
        likeHistory: [
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
        ],
        visitHistory: [
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
        ],
        handleLike: handleLike,
        handleCancelLike: handleCancelLike,
        openEdit: OpenEdit,
        closeAndSaveEdit: CloseAndSaveEdit,
        account: true,
        edit: false,
    });
    
    async function handleLike() {
        setProfileState({
            ...profileState,
            liked: true
        })
    }

    async function handleCancelLike() {
        setProfileState({
            ...profileState,
            liked: false
        })
    }

    async function OpenEdit() {
        setProfileState({
            ...profileState,
            edit: true,
        })
    }

    async function CloseAndSaveEdit(editState) {
        setProfileState({
            ...editState,
            edit: false,
        })
    }

    return (
        <ProfileProvider value={{...profileState}}>
            <Container>
                <GridContainer>
                    <ProfileCard/>
                    {profileState.account &&
                        <Fragment>
                            <UserList
                            title={"Users who likes you"} 
                            list={profileState.likeHistory}
                            icon={faHeart} 
                            color={"#FF5B6C"} 
                            />
                            <UserList 
                            title={"Users who visited your profile"}
                            list={profileState.visitHistory}
                            icon={faEye} 
                            color={"#6f48bd"}
                            />
                        </Fragment>
                    }
                </GridContainer>
            </Container>
        </ProfileProvider>
    )
}