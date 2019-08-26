import React, { useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Separator from '../../../components/Separator';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import ProfileContext from '../../../contexts/ProfileContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Image } from 'cloudinary-react';

const authToken = localStorage.getItem('token');

const StyledSection = styled.section `
    padding:1rem;
    width:100%;
    height:700px;
    border-radius:0 ${props => props.theme.borderRadius} ${props => props.theme.borderRadius} 0;
    background-color:#2b2c2e;
`

const StyledDiv = styled.div `
    display:flex;
    height:60px;
    margin-bottom:1rem;

    overflow:hidden;
    align-items:center;
    border-radius:${props => props.theme.borderRadius};
    background-color:${props => props.theme.color.purple};
    
    box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.1);
    background-color:#FBF9FF;
`

const ProfilePhoto = styled(Image) `
    height:100%;
    width:80px;

    object-fit:cover;
`

const InfosContainer = styled.div `
    display:flex;
    flex-direction:column;
    justify-content:center;
    text-decoration:none;
    flex:1;
    padding:0.5rem;
`

const Username = styled.span `
    font-size:1.25rem;
    font-weight:600;
    color:${props => props.theme.color.purple};
`

const Age = styled.span `
    font-size:1.15rem;
    font-weight:400;
    color:#2b2c2e;
`

const StyledButton = styled(FontAwesomeIcon) `
    border-radius:100%;
    border:2px solid ${props => props.theme.color.purple};
    color:${props => props.theme.color.purple};
    padding:0.6rem;
    margin-right:0.75rem;
    :hover {
        cursor: pointer;
        
    }
`


export default function BlockedList() {
    const profile = useContext(ProfileContext);
    
    
    function User(props) {
        const handleClick = event => {
            const params = {data: {
                type: "blocked",
                username: props.user.username,
            }};
            axios.delete(`/users/deleteRelationship?authToken=${authToken}`, params);
        }
        return (
            <StyledDiv>
                <ProfilePhoto cloudName='matchacn' publicId={props.user.photos[props.user.avatarIndex]}/>
                <InfosContainer to={`/profile/${props.user.username}`}>
                    <Username>{props.user.username}</Username>
                    <Age>{props.user.age}, {props.user.city}</Age>
                </InfosContainer>
                <StyledButton onClick={handleClick} icon={faEye} size={"lg"}/>
            </StyledDiv>
        )
    }

    return (
        <StyledSection>
            <Separator icon={faEyeSlash} size={'lg'}/>
            {profile.blockedList.map(blockedUser => <User key={blockedUser.userId} user={blockedUser}>{blockedUser.username}</User>)}
        </StyledSection>
    )
}