import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMars, faVenus, faTransgender } from '@fortawesome/free-solid-svg-icons';

const GenderIcon = (props) => {
    const icons = {
        "male": faMars,
        "female": faVenus,
        "non-binary": faTransgender
    }

    const GenderIcon = styled(FontAwesomeIcon) `
        color: ${props => props.theme.color.lightRed};
    `
    return (
        <GenderIcon icon={icons[props.gender]} size={props.size}/>
    );
}

export default GenderIcon;