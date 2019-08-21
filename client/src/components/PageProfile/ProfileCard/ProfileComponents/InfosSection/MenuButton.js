import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const MenuButton = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    function handleClick(event) {
      setAnchorEl(event.currentTarget);
    }
  
    function handleClose() {
      setAnchorEl(null);
    }

    const MenuButton = styled(FontAwesomeIcon) `
        :hover {
            cursor:pointer;
        }
    `

    return (
        <div>
            <MenuButton icon={faEllipsisH} onClick={handleClick}/>
            <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            >
            <MenuItem onClick={handleClose}>Block user</MenuItem>
            <MenuItem onClick={handleClose}>Report User</MenuItem>
            </Menu>
        </div>
    )
}

export default MenuButton;