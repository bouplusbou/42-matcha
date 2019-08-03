import React, { useContext } from 'react';
import styled from 'styled-components';

import ProfileContext from "../../../ProfileContext";
import ConnectedIcon from './ConnectedIcon';
import GenderIcon from './GenderIcon';
import LikeButton from './LikeButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';


const StyledRow = styled.div `
    display:flex;
    box-sizing:border-box;
    width:100%;
    min-height:4rem;
    margin-bottom:2rem;
    padding-left:1rem;

    justify-content:space-between;
    align-items:center;
`

const Username = styled.h2 `
    display:inline-block;
    margin:0;
    margin-right:1rem;
    
    color:${props => props.theme.color.black};
    font-size:2.5rem;
`

const Container = styled.div `
    display:flex;
    
    align-items:center;
`

const EditButton = styled(FontAwesomeIcon) `

`
export default function UsernameRow(props) {

    const profile = useContext(ProfileContext)
    return (
        <StyledRow>
            <Container>
                <ConnectedIcon 
                    connected={profile.connected} 
                    lastConnection={profile.lastConnection}
                    size={"xs"}
                />
                <Username>{profile.username}</Username>
                <GenderIcon gender={profile.gender} size={"3x"}/>
            </Container>
            <Container>
                {profile.account ?
                <EditButton icon={faPencilAlt} size={"2x"} onClick={profile.openEdit}/> :
                <LikeButton {...profile}/>
            }
            </Container>
        </StyledRow>
    )
}