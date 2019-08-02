import React from 'react';
import styled from 'styled-components';

export default function Biography(props) {

    const StyledDiv = styled.div `
        padding:0 1rem;

        font-style:italic;
        font-size:1.1rem;
        font-weight:200;
    `
    
    const bio = `"${props.bio}"`;

    return (
        <StyledDiv>{bio}</StyledDiv>
    )
}