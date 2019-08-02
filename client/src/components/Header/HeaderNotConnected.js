import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from './Logo';

export default function HeaderNotConnected()  {
    const Header = styled.header`
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 56px;
        background-color: #6F48BD;
        color: white;
    `;
    const LoginButton = styled(Link)`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 10px;
        padding: 15px;
        margin-right: 10vw;
        border: solid 0.5px rgba(255, 255, 255, 0.56);
        border-radius: 10px;
        text-align: center;
        font-family: 'Roboto', sans-serif;
        color: rgba(255, 255, 255, 0.56);
        text-decoration: none;
        transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
        &:hover {
            transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
            background-color: white;
            color: #6F48BD;
        }
    `;

    return (
        <Header>
            <Logo />
            <LoginButton to='/login'>Login</LoginButton>
        </Header>
    );
}