import React, { Fragment, useState, useContext } from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFireAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal } from '@material-ui/core';

import ProfileContext from '../../ProfileContext';
import PhotosModal from '../Components/PhotosModal';

const StyledSection = styled.section `
    display:flex;
    min-width:300px;
    min-height:375px;

    align-items:flex-end;
    
    border-radius:${props => props.theme.borderRadius} 0 0 ${props => props.theme.borderRadius};
    background-image: url(${props => props.avatar ? props => props.avatar : "https://icon-library.net/images/no-profile-picture-icon/no-profile-picture-icon-12.jpg"});
    background-position: center center;
    background-size: cover;
    @media (max-width: 1000px) { 
        border-radius:0;
    }
    @media (max-width: 740px) {
        height:300px;
    }
`

const ScoreContainer = styled.div `
    display:flex;
    height:150px;
    width:100%;
    
    align-items:flex-end;
    justify-content:center;
    
    border-radius:0 0 0 ${props => props.theme.borderRadius};
    background: linear-gradient(179.76deg, rgba(0, 0, 0, 0) 0.51%, #000000 83.4%);
    @media (max-width: 1000px) { 
        border-radius:0;
    }
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

const ModalContentContainer = styled.div `
    height:100%;
`
export default function AvatarSection(props) {
    const [open, setOpen] = useState(true);
    const profile = useContext(ProfileContext);
    
    const OpenModal = () => {
        setOpen(true);
    }

    const CloseModal = (event) => {
        if (event.target.tagName === "DIV")
            setOpen(false);
    }

    return (
        <Fragment>
            <StyledSection avatar={profile.photos[profile.avatarIndex]} onClick={OpenModal}>
                <ScoreContainer>
                    <Score>
                        <ScoreIcon icon={faFireAlt}/>
                        <span>{profile.score}</span>
                    </Score>
                </ScoreContainer>
            </StyledSection>
            <Modal open={open} onClose={CloseModal}>
                <ModalContentContainer> 
                    <PhotosModal 
                        index={profile.avatarIndex} 
                        photos={profile.photos}
                        handleClose={CloseModal}
                        account={profile.account}
                    />
                </ModalContentContainer>
            </Modal>
        </Fragment>
    )
}