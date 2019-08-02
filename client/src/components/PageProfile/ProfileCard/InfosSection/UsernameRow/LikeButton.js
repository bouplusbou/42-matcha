import React from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const LikeButton = (props) => {
    const StyledButton = styled.button `
        height:4.5rem;
        width:4.5rem;
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
    `

    const MatchButton = styled(StyledButton) `
        color:${props => props.theme.color.red};
        background-color:white;
        box-shadow: 0px 0px 20px -1px ${props => props.theme.color.red};
    `

    const CancelMatchButton = styled(StyledButton) `
        color:white;
        background-color:${props => props.theme.color.red};
        box-shadow: 0px 0px 20px -1px ${props => props.theme.color.red};
    `

    if (props.liked && props.likedBy)
        return (<CancelMatchButton onClick={props.handleCancelLike}><FontAwesomeIcon icon={faHeart} size={"2x"}/></CancelMatchButton>)
    if (!props.liked && !props.likedBy)
        return (<LikeButton onClick={props.handleLike}><FontAwesomeIcon icon={faHeart} size={"2x"}/></LikeButton>)
    if (props.liked && !props.likedBy)
        return (<CancelLikeButton onClick={props.handleCancelLike}><FontAwesomeIcon icon={faHeart} size={"2x"}/></CancelLikeButton>)
    if (!props.liked && props.likedBy)
        return (<MatchButton onClick={props.handleLike}><FontAwesomeIcon icon={faHeart} size={"2x"}/></MatchButton>)
}

export default LikeButton;