import React, { Fragment, useState, useEffect } from "react";

import FakeData from "../../fakeData.json";
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

    const profilData = {...FakeData.woman};

    const [profileState, setProfileState] = useState({
        uuid:"",
        username:"",
        firstName:"",
        lastName:"",
        gender:"",
        orientation:"",
        lookingFor:"",
        age:"",
        bio:"",
        email:"",
        tags:[],
        photos:[],
        avatarIndex:0,
        score:0,
        latLng:[],
        likeHistory:[],
        visitHistory:[],
        handleLike: handleLike,
        handleCancelLike: handleCancelLike,
        openEdit: OpenEdit,
        closeAndSaveEdit: CloseAndSaveEdit,
        account: false,
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

    useEffect(() => {
        async function fetchData() {
            const profile = await axios.get(`/users/getProfile?authToken=${authToken}`)
            console.log(profile.data.profile)
            setProfileState({
                ...profileState,
                ...profile.data.profile
            })
        }
        fetchData();
    }, []);

    return (
        <ProfileProvider value={{...profileState}}>
            <Container>
                <GridContainer>
                    <ProfileCard/>
                    {profileState.username}
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