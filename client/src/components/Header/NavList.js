import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function Navlist() {

    const NavList = styled.ul`
        display: flex;
        justify-content: space-between;
        li {
            list-style: none;
            padding-bottom: 5px;
            &:hover {
                box-shadow: 0px 2.5px 0px #FFFFFF;
            }
        }
        a {
            text-decoration: none;
            color: white;
            font-family: Roboto;
            font-style: normal;
            font-weight: 500;
        }
        @media (max-width: 1080px) {
            flex-direction: column;
            align-items: flex-end;
            li {
                margin-bottom: 30px;
            }
        }
    `;

    return (
        <NavList>
            <li><Link to="/search">Search</Link></li>
            <li><Link to="/matcher">Matcher</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/users/EAZYE">TestProfile</Link></li>
        </NavList>
    );
}