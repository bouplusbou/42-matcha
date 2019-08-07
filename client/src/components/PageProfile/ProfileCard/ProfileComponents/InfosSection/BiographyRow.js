import React from 'react';
import styled from 'styled-components';

export default function Biography(props) {

    const StyledDiv = styled.div `
        margin-bottom:0.75rem;
        max-width:650px;


        font-style:italic;
        font-size:1.1rem;
        font-weight:300;
        overflow-wrap: break-word;
        hyphens:auto;
    `
    
    const bio = `"${props.bio}"`;

    return (
        <StyledDiv>{bio}</StyledDiv>
    )
}