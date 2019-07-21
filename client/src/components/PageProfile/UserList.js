import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import UserListItem from './UserListItem';

const StyledSection = styled.section `
    display:flex;
    flex-direction:column;
    box-sizing:border-box;
    width:100%;
    margin-bottom:2em;
    padding:1rem;

    overflow:hidden;
    @media (min-width: 1000px) { border-radius: ${props => props.theme.borderRadius}; }

    background-color: ${props => props.color};
    box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.1);  
`

const Title = styled.h2 `
    margin:0 0 0.5rem 0;

    color: white;
    text-align:center;
`

const Line = styled.div `
    flex:1;
    height:1px;

    border-top:1px solid white;
`

const Separator = styled.div `
    display:flex;
    width:100%;
    margin-bottom:0.75rem;
    
    justify-content:center;
    align-items:center;
`

const StyledIcon = styled(FontAwesomeIcon) `
    padding:0 0.5rem;

    color:white;
`

const ListContainer = styled.div `
    display:grid;
    width: 100%;
    margin-bottom:1rem;

    /* BIG RESOLUTION */
    @media (min-width: 600px) { grid-template-columns:1fr 1fr; }
    grid-template-rows: auto;
    grid-column-gap:1rem;
    grid-row-gap:1rem;
`

const ButtonRow = styled.div `
    display:flex;
    width:100%;

    flex-direction:column;
    align-items:center;
    justify-content:center;
    
    color:white;
    
    :hover{
        cursor: pointer;
    }
`

const StyledButton = styled(FontAwesomeIcon) `
    :not(:last-child) {
        margin-right:1.5rem;
    }
`
export default function UserList(props) {
    const [displayedUser, setDisplayedUser] = useState(props.list.slice(0, 8));
    const Users = displayedUser.map(user => <UserListItem color={props.color} {...user}/>);

    const handleShowMoreClick = (e) => {
        if (displayedUser.length < props.list.length)
            setDisplayedUser(props.list.slice(0, 
                displayedUser.length + 8 < props.list.length ?
                    displayedUser.length + 8 : 
                    props.list.length
            ));
    }

    const handleReduceClick = (e) => {
        setDisplayedUser(props.list.slice(0, 8));
    }

    return (
            <StyledSection color={props.color}>
                    <Title color={props.color}>{props.title}</Title>
                    <Separator>
                        <Line color={props.color}/>
                            <StyledIcon icon={props.icon} size={"2x"} color={props.color}/>
                        <Line color={props.color}/>
                    </Separator>
                    <ListContainer>
                        {Users}
                    </ListContainer>
                    <ButtonRow>
                        <div>
                        {displayedUser.length > 8 && 
                            <StyledButton icon={faMinus} size={"lg"} onClick={handleReduceClick}/>
                        }
                        {displayedUser.length < props.list.length && 
                            <StyledButton icon={faPlus} size={"lg"} onClick={handleShowMoreClick}/>
                        }       
                        </div>
                    </ButtonRow>
            </StyledSection>
    )
}