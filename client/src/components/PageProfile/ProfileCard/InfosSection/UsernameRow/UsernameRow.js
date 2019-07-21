import React from 'react';
import styled from 'styled-components';

import ProfileContext, { ProfileConsumer } from "../../../ProfileContext";
import ConnectedIcon from './ConnectedIcon';
import GenderIcon from './GenderIcon';
import LikeButton from './LikeButton';


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

export default function UsernameRow(props) {
    return (
        <ProfileConsumer>
            {profil =>(

            <StyledRow>
                <Container>
                    <ConnectedIcon 
                        connected={profil.connected} 
                        lastConnection={profil.lastConnection}
                        size={"xs"}
                    />
                    <Username>{profil.username}</Username>
                    <GenderIcon gender={profil.gender} size={"3x"}/>
                </Container>
                <Container>
                    <LikeButton {...profil}/>
                </Container>
            </StyledRow>

            )}
        </ProfileConsumer>
    )
}