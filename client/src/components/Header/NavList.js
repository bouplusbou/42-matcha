import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavList = styled.ul`
    display: flex;
    justify-content: space-between;
    li {
        list-style: none;
        padding-bottom: 5px;
    }
    a {
        text-decoration: none;
        color: ${props => props.theme.color.white};
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

export default function Navlist() {

    const [underline, setUnderline] = useState({
        search: false,
        matcher: false,
        profile: false,
    });

    const handleClickUnderline = type => {
        if (type === 'search') setUnderline({
            search: true,
            matcher: false,
            profile: false,
        });
        if (type === 'matcher') setUnderline({
            search: false,
            matcher: true,
            profile: false,
        });
        if (type === 'profile') setUnderline({
            search: false,
            matcher: false,
            profile: true,
        });
    };

    return (
        <NavList>
            <li style={underline.search ? {boxShadow: '0px 2.5px 0px #FFFFFF'} : {boxShadow: 'none'}}>
                <Link to="/search" onClick={() => handleClickUnderline('search')}>
                    Search
                </Link>
            </li>
            <li style={underline.matcher ? {boxShadow: '0px 2.5px 0px #FFFFFF'} : {boxShadow: 'none'}}>
                <Link onClick={() => handleClickUnderline('matcher')} to="/matcher">
                    Matcher
                </Link>
            </li>
            <li style={underline.profile ? {boxShadow: '0px 2.5px 0px #FFFFFF'} : {boxShadow: 'none'}}>
                <Link onClick={() => handleClickUnderline('profile')} to="/profile">
                    Profile
                </Link>
            </li>
        </NavList>
    );
}