import React, { Fragment, useState, useEffect } from "react";
import axios from 'axios';

import { ProfileProvider } from './ProfileContext';
import { faEye, faHeart } from '@fortawesome/free-solid-svg-icons';

import Container from "../Container";
import ProfileCard from './ProfileCard/ProfileCard';
import UserList from './UserList/UserList'
import styled from 'styled-components';

const authToken = localStorage.getItem('token');

const GridContainer = styled.div `
    display:grid;
    margin-top:2rem;
    min-width:360px;

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
        edit:true,
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
    
    async function CloseAndSaveEdit(editedValues) {
        console.log(editedValues)
        if (Object.keys(editedValues).length > 0) {
            await axios.post(`/users/updateProfile?authToken=${authToken}`, editedValues)
                .then( setProfileState({ ...profileState, edit: false }))
                .catch(err => console.log(err))
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
                    profile.data.profile,
                    profile.data.profile,
                    profile.data.profile,
                    profile.data.profile
                ],
                likeHistory: [
                    profile.data.profile,
                    profile.data.profile,
                    profile.data.profile,
                    profile.data.profile,
                    profile.data.profile,
                    profile.data.profile,
                    profile.data.profile
                ],
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
                            !profileState.edit &&
                                <UserList
                                title={"Users who likes you"} 
                                list={profileState.likeHistory}
                                icon={faHeart} 
                                color={"#FF5B6C"} 
                                />
                            }
                            {profileState.visitHistory &&
                            !profileState.edit &&
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