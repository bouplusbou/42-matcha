import React from 'react';
import styled from 'styled-components';

export default function TagsRow(props) {
    const TagsRow = styled.div `
        margin-bottom:1.5rem;
        margin-top:auto;
        margin-left:1rem;
    `
    
    const StyledTag = styled.span `
        margin-right:1rem;

        color: ${props => props.theme.color.lightRed};
        font-weight:bold;
        font-style:italic;
        padding:0.1rem 0.25rem;
        border-radius:10px;
    `

    const tags = props.tags.map(tag => <StyledTag>#{tag}</StyledTag>);
    return (
        <TagsRow>{tags}</TagsRow>
    );
}