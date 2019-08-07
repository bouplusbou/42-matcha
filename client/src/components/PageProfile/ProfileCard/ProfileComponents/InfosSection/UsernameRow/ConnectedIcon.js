import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { faCircle, faDotCircle } from '@fortawesome/free-solid-svg-icons';
import Tooltip from '@material-ui/core/Tooltip';

const ConnectedIcon = (props) => {
    const ConnectedIcon = styled(FontAwesomeIcon) `
        color: ${props => props.connected ? "#1af033" : "#9c9c9c"};
        margin-right:0.75rem;
    `
    
    return (
        <Tooltip title={props.connected ? "Online" : props.lastConnection}>
            <ConnectedIcon
            connected={props.connected}
            icon={props.connected ? faCircle : faDotCircle}
            size={props.size}
            />
        </Tooltip>
    )
}

export default ConnectedIcon;