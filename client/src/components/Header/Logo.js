import React from 'react';
import styled from 'styled-components';

export default function HeaderConnectedWide() {

    const Logo = styled.section`
        margin-left: 10vw;
    `;

    return (
        <Logo>
            <img src={'./logo_color.svg'} width="45px" height="45px" alt=""/>
        </Logo>
    );
}