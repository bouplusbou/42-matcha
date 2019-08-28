import React, { Fragment, useState, useEffect, useContext } from "react";
import axios from 'axios';
import styled from 'styled-components';

import { ProfileProvider } from '../../../contexts/ProfileContext';
import { faEye, faHeart } from '@fortawesome/free-solid-svg-icons';

import AppContext from '../../../contexts/AppContext';
import Container from "../../../components/Container";
import ProfileCard from './ProfileCard/ProfileCard';
import UserList from './UserList/UserList';
import { Redirect } from 'react-router-dom';

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
    const { socket } = useContext(AppContext);
    const [profileState, setProfileState] = useState({});
    const [redirectState, setRedirectState] = useState(false);
    
    useEffect(() => {
        let isSubscribed = true;
        async function fetchProfile() {
            const username = props.match.params.username ? `/${props.match.params.username}` : "";
            const profile = await axios.get(`/users${username}?authToken=${authToken}`)
            if (profile.data.profile.inSearch === false || profile.data.profile.blockedBy) {
                setRedirectState(true)
            } 
            if (isSubscribed) {
                setProfileState({
                    uploadPicture: uploadPicture,
                    ...profile.data.profile,
                })
            }
        }
        fetchProfile();
        return () => isSubscribed = false;
    }, [props.match.params.username])
    
    useEffect(() => {
        async function createRelNotif() {
            if (profileState.userId !== undefined) {
                const data = {
                    type: 'visited',
                    targetUserId: profileState.userId,
                };
                await axios.post(`/notifications?authToken=${authToken}`, data);
                await axios.post(`/users/createRelationship?authToken=${authToken}`, {
                    type: "visited",
                    targetUserId: profileState.userId,
                })
                socket.emit('createNotification', profileState.userId);
            }
        }
        createRelNotif();
    }, [socket, profileState.userId])


    function uploadPicture(event) {
        event.preventDefault();
        const file = event.target.files[0];
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
                    {profileState.username && <ProfileCard/>}
                    {profileState.account &&
                        <Fragment>
                            {profileState.likedHistoric &&
                                <UserList
                                title={"Users who likes you"} 
                                list={profileState.likedHistoric}
                                icon={faHeart} 
                                color={"#FF5B6C"} 
                                />
                            }
                            {profileState.visitedHistoric &&
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
            {redirectState && <Redirect to='/search'/>}
        </ProfileProvider>
    )
}