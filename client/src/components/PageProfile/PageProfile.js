import React, { Fragment, useState, useEffect } from "react";

import ProfileContext, { ProfileProvider } from './ProfileContext';
import { faEye, faHeart } from '@fortawesome/free-solid-svg-icons';

import Container from "../Container";
import ProfileCard from './ProfileCard/ProfileCard';
import UserList from './UserList'
import styled from 'styled-components';

import axios from 'axios';
const authToken = localStorage.getItem('token');

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

    const [profileState, setProfileState] = useState({
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
        if (Object.keys(editState).length > 0) {
            await axios.post(`/users/updateProfile?authToken=${authToken}`, editState)
            .then( setProfileState({ ...profileState, edit: false }) );
        } else {
            setProfileState({ ...profileState, edit: false })
        }
    }
    
    useEffect(() => {
        async function fetchData() {
            const profile = await axios.get(`/users/getProfile?authToken=${authToken}`)
            setProfileState({
                ...profileState,
                ...profile.data.profile,
                visitHistory: [
                    profile.data.profile,
                    profile.data.profile,
                    profile.data.profile,
                    profile.data.profile
                ],
                likeHistory: [
                    profile.data.profile,
                    profile.data.profile,
                    profile.data.profile,
                    profile.data.profile
                ]
            })
        }
        fetchData();
    }, [profileState.edit]);

    return (
        <ProfileProvider value={{...profileState}}>
            <Container>
                <GridContainer>
                    <ProfileCard/>
                    {profileState.account &&
                        <Fragment>
                            {profileState.likeHistory &&
                                <UserList
                                title={"Users who likes you"} 
                                list={profileState.likeHistory}
                                icon={faHeart} 
                                color={"#FF5B6C"} 
                                />
                            }
                            {profileState.visitHistory &&
                                <UserList 
                                title={"Users who visited your profile"}
                                list={profileState.visitHistory}
                                icon={faEye} 
                                color={"#6f48bd"}
                                />
                            }
                        </Fragment>
                    }
                </GridContainer>
            </Container>
        </ProfileProvider>
    )
}