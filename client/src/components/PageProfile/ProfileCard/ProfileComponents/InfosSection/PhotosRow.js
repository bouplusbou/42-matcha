import React, { Fragment, useState } from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import { Modal } from '@material-ui/core';

import PhotosModal from '../PhotosModal';

const StyledRow = styled.div `
    display:flex;
    margin-top:0.5rem;
    width:100%;
    height:6rem;
`

const StyledImg = styled.img `
    flex:1;
    width:25%;
    object-fit:cover;
`

const Line = styled.div `
    border-top:1px solid ${props => props.theme.color.purple};
    height:1px;
    flex:1;
`

const Separator = styled.div `
    width:100%;
    display:flex;
    justify-content:center;
    align-items:center;
`

const StyledIcon = styled(FontAwesomeIcon) `
    padding:0 0.5rem;
    color:${props => props.theme.color.purple};
`

const PhotosRow = (props) => {
    const [modalState, setModalState] = useState({
        open: false,
        index: null
    });
    
    const handleOpen = (event) => {
        setModalState({
            open:true,
            index:event.target.id
        })
    }

    const handleClose = (event) => {
        if (event.target.tagName === "DIV")
            setModalState({
                open:false,
                index:null
            });
    }

    const Photos = props.photos.map((photo, index) => <StyledImg src={photo} key={index} id={index} onClick={handleOpen}/>);
    Photos.shift();
    return (
        <Fragment>
            <Separator>
                <Line/>
                <StyledIcon icon={faCameraRetro} size={"2x"}/>
                <Line/>
            </Separator>
            <StyledRow>
                {Photos}
            </StyledRow>
            <Modal open={modalState.open} onClose={handleClose}>
                <PhotosModal 
                    index={modalState.index} 
                    photos={props.photos}
                    handleClose={handleClose}
                />
            </Modal>
        </Fragment>
    )
}
export default PhotosRow;