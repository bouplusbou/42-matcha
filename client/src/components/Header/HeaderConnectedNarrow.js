import React, { useState } from 'react';
import styled from 'styled-components';
import Logo from './Logo';
import Burger from './Burger';
import Dropdown from './Dropdown';

export default function HeaderConnectedWide() {

    const [menuOpen, setMenuOpen] = useState(false);

    const HeaderConnectedNarrow = styled.section`
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 56px;
        background-color: #6F48BD;
        color: white;
        @media (min-width: 1080px) {
            display: none;
        }
    `;

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <React.Fragment>
            <HeaderConnectedNarrow>
                <Logo />
                <Burger toggleMenu={toggleMenu}/>
            </HeaderConnectedNarrow>
            { menuOpen && <Dropdown /> }
        </React.Fragment>
    );
}