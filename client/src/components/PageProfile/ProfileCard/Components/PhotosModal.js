import React, { useState } from 'react';
import styled from 'styled-components';

import Container from '../../../Container';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';


export default function PhotosModal(props) {

    const [index, setIndex] = useState(props.index);
    const maxIndex = props.photos.length - 1;

    const StyledDiv = styled.div `
        display:flex;
        height:100%;
        width:100%;

        align-items:center;
        justify-content:center;
        
        background-color:rgb(66, 66, 66, 0.5);
    `
    
    const StyledImg = styled.img `
        max-height:75vh;
        
        box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.2);
    `

    const ButtonContainer = styled.div `
        display:flex;
        margin-top:1rem;
        
        justify-content:center;
        align-items:center;
    `

    const StyledIcon = styled(FontAwesomeIcon) `
        margin: 0 1rem;
        
        color:white;
    `

    const handlePrevious = () => {
        setIndex(index - 1 < 0 ? maxIndex : index - 1);
    }

    const handleNext = () => {
        setIndex(index + 1 > maxIndex ? 0 : index + 1);
    }

    return (
        <StyledDiv onClick={props.handleClose}>
            <Container>
                <StyledImg src={props.photos[index]}/>
                <ButtonContainer>
                    <StyledIcon icon={faArrowLeft} size={"lg"} onClick={handlePrevious}/>
                    <StyledIcon icon={faArrowRight} size={"lg"} onClick={handleNext}/>
                </ButtonContainer>
            </Container>
        </StyledDiv>
    )
}