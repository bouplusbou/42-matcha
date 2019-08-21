import React, { Fragment, useState, useEffect, useContext } from "react";
import axios from 'axios';
import AppContext from '../../AppContext';

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
    const appState = useContext(AppContext);

    const [profileState, setProfileState] = useState({
        fetchData: fetchData,
        handleLike: handleLike,
        handleCancelLike: handleCancelLike,
        openEdit: OpenEdit,
        closeAndSaveEdit: CloseAndSaveEdit,
        uploadPicture: uploadPicture
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
        fetchData(true);
    }
    
    async function CloseAndSaveEdit(editedValues) {
        if (Object.keys(editedValues).length > 0) {
            await axios.post(`/users/updateProfile?authToken=${authToken}`, editedValues)
                .then( fetchData(false))
                .catch(err => console.log(err))
        } else {
            fetchData(false);
        }
    }
    
    useEffect(() => {
        fetchData();
        appState.socket.emit('visit', props.match.params.username);
        const data = {
            type: 'visited',
            usernameVisited: props.match.params.username,
        }
        axios.post(`/notifications?authToken=${authToken}`, data);
    }, [])
    
    async function fetchData(edit) {
        console.log("fetching data...")
        const username = props.match.params.username ? `/${props.match.params.username}` : "";
        const profile = await axios.get(`/users${username}?authToken=${authToken}`)
        console.log(profileState);
        setProfileState({
            ...profileState,
            ...profile.data.profile,
            edit: edit,
        })
    }

    function uploadPicture(event) {
        event.preventDefault();
        const file = event.target.files[0];
        console.log(file.size);
        if (file.size < 1000000) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const image  = reader.result;
                axios.post(`/users/uploadPic?authToken=${authToken}`, { image })
            }
        } else {
            console.log(`Picture is too big`);
        }
    }

    return (
        <ProfileProvider value={{...profileState}}>
            <Container>
                <GridContainer>
                    <ProfileCard/>
                    {profileState.account &&
                        <Fragment>
                            {profileState.likedHistoric &&
                            !profileState.edit &&
                                <UserList
                                title={"Users who likes you"} 
                                list={profileState.likedHistoric}
                                icon={faHeart} 
                                color={"#FF5B6C"} 
                                />
                            }
                            {profileState.visitedHistoric &&
                            !profileState.edit &&
                                <UserList 
                                title={"Users who visited your profile"}
                                list={profileState.visitedHistoric}
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