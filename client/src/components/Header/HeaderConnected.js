import React from 'react';
import HeaderConnectedWide from './HeaderConnectedWide';
import HeaderConnectedNarrow from './HeaderConnectedNarrow';

export default function Header() {

    return (
        <header>
            <HeaderConnectedWide />
            <HeaderConnectedNarrow />
        </header>
    );
}