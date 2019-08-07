import React, { useContext } from 'react';
import styled from 'styled-components';

import ProfileContext from '../../../../ProfileContext';
import ConnectedIcon from './ConnectedIcon';
import GenderIcon from './GenderIcon';
import LikeButton from './LikeButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';


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

export default function UsernameRow(props) {
    const profile = useContext(ProfileContext)

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
                <EditButton icon={faCog} size={"2x"} onClick={profile.openEdit}/> :
                <LikeButton {...profile}/>
            }
            </UsernameContainer>
        </StyledRow>
    )
}