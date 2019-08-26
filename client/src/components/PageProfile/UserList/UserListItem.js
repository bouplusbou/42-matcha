import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Image } from 'cloudinary-react';
import { Link } from 'react-router-dom';
import LikeButton from '../ProfileCard/Components/LikeButton';
import { ProfileProvider } from '../../ProfileContext';
import Axios from 'axios';

const authToken = localStorage.getItem(`token`);

const StyledDiv = styled.div `
    display:flex;
    height:80px;
    padding-right:0.75rem;

    overflow:hidden;
    align-items:center;
    border-radius:${props => props.theme.borderRadius};
    
    background-color:#FBF9FF;
    box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.1);
`

const ProfilePhoto = styled(Image) `
    height:100%;
    width:80px;

    object-fit:cover;
`

const InfosContainer = styled(Link) `
    display:flex;
    flex-direction:column;
    justify-content:center;
    text-decoration:none;
    flex:1;
    padding:0.5rem;
`

const Username = styled.span `
    font-size:1.25rem;
    color:${props => props.color};
    font-weight:600;
`

const Age = styled.span `
    font-size:1.15rem;
    color: #8c92a6;
    font-weight:400;
`

const StyledButton = styled(FontAwesomeIcon) `
    border-radius:100%;
    border:1px solid ${props => props.color};
    padding:0.75rem;
    margin-right:0.75rem;
    box-shadow: 0px 0px 10px ${props => props.color};
`

export default function UserListItem(props) {
    
    const [profileState, setProfileState] = useState({});

    useEffect(() => {
        async function fetchProfile(edit) {
            const username = `/${props.username}`;
            const profile = await Axios.get(`/users${username}?authToken=${authToken}`)
            console.log(profile)
            setProfileState({
                ...profile.data.profile,
            })
        }
        fetchProfile();
    }, [])

    return (
        <ProfileProvider value={{...profileState}}>
            <StyledDiv>
                <ProfilePhoto cloudName='matchacn' publicId={props.photos[props.avatarIndex]}/>
                <InfosContainer to={`/profile/${props.username}`}>
                    <Username color={props.color}>{props.username}</Username>
                    <Age>{props.age}, {props.city}</Age>
                </InfosContainer>
                <LikeButton size={"2rem"} small/>
            </StyledDiv>
        </ProfileProvider>
    )
}