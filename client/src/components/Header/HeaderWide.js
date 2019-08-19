import React from 'react';
import styled from 'styled-components';
import Logo from '../Logo';
import NavList from './NavList';
import LogoutButton from './LogoutButton';

const HeaderWide = styled.section`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 56px;
    background-color: #6F48BD;
    color: white;
    @media (max-width: 1080px) {
        display: none;
    }
`;
const NavSection = styled.nav`
    width: 30vw;
`;
const LogoutSection = styled.section`
    margin-right: 10vw;
`;

export default function () {

    return (
        <HeaderWide>
            <Logo />
            <NavSection>
                <NavList />
            </NavSection>
            <LogoutSection>
                <LogoutButton />
            </LogoutSection>
        </HeaderWide>
    );
}