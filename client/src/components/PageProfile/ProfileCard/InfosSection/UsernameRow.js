import React, { useContext, Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMars, faVenus, faTransgender, faCog, faPlus, faCircle, faDotCircle } from '@fortawesome/free-solid-svg-icons';
import Tooltip from '@material-ui/core/Tooltip';

import ProfileContext from '../../../ProfileContext';
import LikeButton from '../Components/LikeButton';

const StyledRow = styled.div `
    display:flex;
    box-sizing:border-box;
    width:100%;
    min-height:4rem;
    padding:0 1rem;

    justify-content:space-between;
    align-items:center;
`

const NamesContainer = styled.div `
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    `

const UsernameContainer = styled.div `
    display:flex;
    
    align-items:center;
`

const Username = styled.h2 `
    margin:0;
    margin-right:1rem;
    
    color:${props => props.theme.color.lightRed};
    font-size:2.5rem;
`

const StyledNames = styled.p `
    margin:0 0 0 1.5rem;
    font-weight:300;
    font-style:italic;
`

const EditButton = styled(FontAwesomeIcon) `
    color:${props => props.theme.color.purple};
`

const ConnectedIcon = (props) => {
    const StyledIcon = styled(FontAwesomeIcon) `
        color: ${props => props.connected ? "#1af033" : "#9c9c9c"};
        margin-right:0.75rem;
    `
    
    return (
        <Tooltip title={props.connected ? "Online" : props.lastConnection}>
            <StyledIcon
            connected={props.connected}
            icon={props.connected ? faCircle : faDotCircle}
            size={props.size}
            />
        </Tooltip>
    )
}

const GenderIcon = (props) => {
    const icons = {
        "male": faMars,
        "female": faVenus,
        "non-binary": faTransgender
    }

    const GenderIcon = styled(FontAwesomeIcon) `
        color: ${props => props.theme.color.lightRed};
    `
    return (
        <GenderIcon icon={icons[props.gender]} size={props.size}/>
    );
}


export default function UsernameRow(props) {
    const profile = useContext(ProfileContext)
        
    const PhotoUploadButton = () => {
        return(
            <Fragment>
                <input
                   accept="image/*"
                   style={{ display: 'none' }}
                   id="uploadFileButton"
                   type="file"
                   onChange={profile.uploadPicture}
                   />
                <label htmlFor="uploadFileButton">
                    <EditButton icon={faPlus} size={"2x"}/>
                </label>
            </Fragment>
        )
    }

    return (
        <StyledRow>
            <NamesContainer>
                <UsernameContainer>
                    <ConnectedIcon 
                        connected={profile.connected} 
                        lastConnection={profile.lastConnection}
                        size={"xs"}
                        />
                    <Username>{profile.username}</Username>
                    <GenderIcon gender={profile.gender} size={"3x"}/>
                </UsernameContainer>
                <StyledNames>{profile.firstName} {profile.lastName}</StyledNames>
            </NamesContainer>
            <UsernameContainer>
                {profile.account ?
                <Fragment>
                {profile.photos.length < 5 && <PhotoUploadButton/>}
                <Link to="/profile/edit">
                    <EditButton icon={faCog} size={"2x"} onClick={profile.openEdit}/>
                </Link>
                </Fragment> :
                <LikeButton/>
            }
            </UsernameContainer>
        </StyledRow>
    )
}