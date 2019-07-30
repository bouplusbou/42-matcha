import React from 'react';
import styled from 'styled-components';

export default function MoreButton({ handleOffsetChange }) {

    const MoreButton = styled.button`
        display: inline-block;
        max-width: 200px;
        margin: 0 auto;
        padding: 8px 10px;
        border: solid 0.5px #AE86FF;
        border-radius: 10px;
        background-color: #6F48BD;
        color: #AE86FF;
        font-size: 1rem;
        cursor: pointer;
        text-decoration: none;
        transition: background 250ms ease-in-out, 
                    transform 150ms ease;
        -webkit-appearance: none;
        -moz-appearance: none;
        &:hover,
        &:focus {
            background: white;
            color: #6F48BD;
        }
        &:focus {
            outline: 1px solid #fff;
            outline-offset: -4px;
        }
        &:active {
            transform: scale(0.99);
        }
        p {
            margin: 0;
        }
    `;

    return (
        <MoreButton
            onClick={handleOffsetChange}
        >
            <p>Load More</p>
        </MoreButton>
    );
}