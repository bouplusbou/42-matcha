import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../Logo';
import NavList from './NavList';
import LogoutButton from './LogoutButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

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
const NotifSection = styled.section`
    position: relative;
`;
const NotificationDot = styled.div`
    position: absolute;
    top: -10px;
    right: -10px;
    width: 25px;
    height: 25px;
    background-color: ${props => props.theme.color.red};
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
 
export default function () {

    return (
        <HeaderWide>
            <Logo />
            <NavSection>
                <NavList />
            </NavSection>
            <NotifSection>
                <Link to="/notifications" style={{textDecoration: 'none'}}>
                    <NotificationDot>
                        <p style={{fontWeight: 900, fontSize: '10px', color: 'white'}}>99+</p>
                    </NotificationDot>
                    <FontAwesomeIcon  style={{fontSize: '25px', cursor: 'pointer', color: 'white'}} icon={faBell}/>
                </Link>
            </NotifSection>
            <LogoutSection>
                <LogoutButton />
            </LogoutSection>
        </HeaderWide>
    );
}
