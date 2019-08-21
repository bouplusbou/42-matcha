import React from 'react';
import styled from 'styled-components';
import NavList from './NavList';
import Notifications from './Notifications';
import LogoutButton from './LogoutButton';

const Dropdown = styled.section`
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 56px;
    right: 0;
    width: 80px;
    height: 300px;
    border-radius: 0px 0px 30px 30px;
    box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.1);
    background-color: #6F48BD;
    z-index: 99;
    padding: 20px 10vw;
    @media (min-width: 1080px) {
        display: none;
    }
`;

const NotificationsSection = styled.section`
    position: relative;
`;

export default function HeaderWide() {

    return (
        <Dropdown>
            <ul>
                <li style={{listStyle: 'none'}}>
                    <NotificationsSection>
                        <Notifications />
                    </NotificationsSection>
                </li>
            </ul>
            <NavList />
            <LogoutButton />
        </Dropdown>
    );
}
