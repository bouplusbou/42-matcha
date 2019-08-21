import React from 'react';
import styled from 'styled-components';
import TagChip from '../../Components/TagChip';

export default function TagsRow(props) {
    const TagsRow = styled.div `
        display:flex;
        flex-wrap:wrap;
    `

    const tags = props.tags.map((tag, index)=> <TagChip tag={tag} key={index}/>);
    return (
        <TagsRow>{tags}</TagsRow>
    );
}