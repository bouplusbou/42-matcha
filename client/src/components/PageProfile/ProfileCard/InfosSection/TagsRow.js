import React from 'react';
import styled from 'styled-components';
import TagChip from '../TagChip';

export default function TagsRow(props) {
    const TagsRow = styled.div `
        display:flex;
        flex-wrap:wrap;
        width:100%;
        margin-top:auto;
        margin-left:1rem;
    `

    const tags = props.tags.map(tag => <TagChip tag={tag}/>);
    return (
        <TagsRow>{tags}</TagsRow>
    );
}