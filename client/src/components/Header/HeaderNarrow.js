import React, { useState } from 'react';
import styled from 'styled-components';
import Logo from '../Logo';
import Burger from './Burger';
import Dropdown from './Dropdown';

export default function HeaderWide() {

    const [menuOpen, setMenuOpen] = useState(false);

    const HeaderNarrow = styled.section`
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 56px;
        background-color: ${props => props.theme.color.purple};
        color: ${props => props.theme.color.white};
        @media (min-width: 1080px) {
            display: none;
        }
    `;

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <React.Fragment>
            <HeaderNarrow>
                <Logo />
                <Burger toggleMenu={toggleMenu}/>
            </HeaderNarrow>
            { menuOpen && <Dropdown /> }
        </React.Fragment>
    );
}