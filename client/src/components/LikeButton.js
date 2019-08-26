import React, { useContext } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import ProfileContext from '../contexts/ProfileContext';
import axios from 'axios';

const authToken = localStorage.getItem(`token`)

const LikeButton = (props) => {
    const profile = useContext(ProfileContext);
    const StyledButton = styled.button `
        height:${props => props.small ? "3.25rem" : "4.5rem"};
        width:${props => props.small ? "3.25rem" : "4.5rem"};
        padding:0;
        border:none;
        border-radius:1000px;
        :hover {
            cursor:pointer;
        }
    `

    const LikeButton = styled(StyledButton) `
        color: ${props => props.theme.color.purple};
        box-shadow: 0px 0px 20px ${props => props.theme.color.purple};
        :hover {
            color:white;
            background-color:${props => props.theme.color.purple};
            border-color:${props => props.theme.color.purple};
        }
    `

    const CancelLikeButton = styled(StyledButton) `
        color:white;
        background-color:${props => props.theme.color.purple};
        box-shadow: 0px 0px 20px -1px ${props => props.theme.color.purple};
        :hover {
            color: ${props => props.theme.color.purple};
            background-color:white;
            border-color:${props => props.theme.color.purple};
        }
    `

    const MatchButton = styled(StyledButton) `
        color:${props => props.theme.color.red};
        background-color:white;
        box-shadow: 0px 0px 20px -1px ${props => props.theme.color.red};
        border: 1px solid ${props => props.theme.color.red};
        :hover {
            color: white;
            background-color:${props => props.theme.color.red};
            border-color:${props => props.theme.color.purple};
        }
    `

    const CancelMatchButton = styled(StyledButton) `
        color:white;
        background-color:${props => props.theme.color.red};
        box-shadow: 0px 0px 20px -1px ${props => props.theme.color.red};
        :hover {
            color: ${props => props.theme.color.red};
            background-color:${props => props.theme.color.red};
            border-color:${props => props.theme.color.purple};
        }
    `

    const handleClick = event => {
        if (profile.liked) {
            const params = {data: {
                type: "liked",
                username: profile.username
            }}
            axios.delete(`/users/deleteRelationship?authToken=${authToken}`, params); 
        } else {
            const params = {
                type: "liked",
                username: profile.username
            }
            axios.post(`/users/createRelationship?authToken=${authToken}`, params);
        }
    }

    if (profile.liked && profile.likedBy)
        return (
            <CancelMatchButton onClick={handleClick} small={props.small}>
                <FontAwesomeIcon icon={faHeart} size={props.small ? "lg" : "2x"}/>
            </CancelMatchButton>
        )
    if (!profile.liked && !profile.likedBy)
        return (
            <LikeButton onClick={handleClick} small={props.small}>
                <FontAwesomeIcon icon={faHeart} size={props.small ? "lg" : "2x"}/>
            </LikeButton>
        )
    if (profile.liked && !profile.likedBy)
        return (
            <CancelLikeButton onClick={handleClick} small={props.small}>
                <FontAwesomeIcon icon={faHeart} size={props.small ? "lg" : "2x"}/>
            </CancelLikeButton>
        )
    if (!profile.liked && profile.likedBy)
        return (
            <MatchButton onClick={handleClick} small={props.small}>
                <FontAwesomeIcon icon={faHeart} size={props.small ? "lg" : "2x"}/>
            </MatchButton>
        )
}

export default LikeButton;