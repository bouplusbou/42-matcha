import React, { useContext } from 'react';
import HeaderConnected from './HeaderConnected';
import HeaderNotConnected from './HeaderNotConnected';
import AppContext from '../../AppContext';

export default function Header() {

    const userState = useContext(AppContext);
    // console.log('connected? ' + userState.connected);

    return (
        <React.Fragment>
            { userState.connected ? <HeaderConnected /> : <HeaderNotConnected />}
        </React.Fragment>
    );
}