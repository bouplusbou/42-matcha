import React, { Fragment, useState } from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFireAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal } from '@material-ui/core';

import ProfileContext, { ProfileConsumer } from '../ProfileContext';
import PhotosModal from './PhotosModal';

const StyledSection = styled.section `
    display:flex;
    height:500px;

    align-items:flex-end;
    
    background-image: url(${props => props.avatar});
    background-position: center center;
    background-size: cover;
`

const ScoreContainer = styled.div `
    display:flex;
    height:150px;
    width:100%;
    
    align-items:flex-end;
    justify-content:center;
    
    background: linear-gradient(179.76deg, rgba(0, 0, 0, 0) 0.51%, #000000 83.4%);
`

const Score = styled.div `
    margin-bottom:1.5rem;
    
    color:white;
    font-size:2rem;
`

const ScoreIcon = styled(FontAwesomeIcon) `
    margin-right:0.75rem;
    
    color:${props => props.theme.color.red};
`
export default function AvatarSection(props) {
    const [open, setOpen] = useState(false);
    
    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = (event) => {
        if (event.target.tagName == "DIV")
            setOpen(false);
    }

    return (
        <ProfileConsumer>
        {profile => (
            <Fragment>
                <StyledSection avatar={profile.photos[profile.avatar]} onClick={handleOpen}>
                    <ScoreContainer>
                        <Score>
                            <ScoreIcon icon={faFireAlt}/>
                            <span>{profile.score}</span>
                        </Score>
                    </ScoreContainer>
                    </StyledSection>

                <Modal open={open} onClose={handleClose}>
                    <PhotosModal 
                        index={profile.avatar} 
                        photos={profile.photos}
                        handleClose={handleClose}
                    />
                </Modal>
            </Fragment>
        )}
        </ProfileConsumer>
    )
}