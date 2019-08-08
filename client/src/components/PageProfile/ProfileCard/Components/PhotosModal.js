import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const ModalContainer = styled.div `
    display:flex;
    height:100%;
    width:100%;
    flex-direction:column;
    align-items:center;
    background-color:rgb(66, 66, 66, 0.7);
`

const MainImgContainer = styled.div `
    display:flex;
    height:50vh;
    margin: 5rem 0 2rem 0;
    flex-direction:column-reverse;
    align-items:center;       
`

const ImgButtonContainer = styled.div `
    display:flex;
    align-items:space-between;
    height:2rem;
`

const StyledImgButton = styled(FontAwesomeIcon) `
    color:white;
`

const MainImg = styled.img `
    margin-bottom:0.5rem;
    box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.2);
`

const ArrowButtonsContainer = styled.div `
    display:flex;
    margin-bottom:2rem;
    justify-content:center;
    align-items:center;
`

const StyledArrowIcon = styled(FontAwesomeIcon) `
    margin: 0 1rem;
    color:white;
`

const ThumbnailContainer = styled.div `
    display: flex;
    max-height:6rem;
    max-width:1000px;
    justify-content:center;
`


export default function PhotosModal(props) {
    
    const [index, setIndex] = useState(props.index);
    const maxIndex = props.photos.length - 1;

    const handleKeyDown = (event) => {
        if (event.key === "ArrowRight")
            handlePrevious();
        if (event.key === "ArrowRight")
            handleNext();
    }
    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown, false);
    })
    const Thumbnail = styled.img `
        object-fit:cover;
        min-width:10.6rem;
        box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.2);
        ${props => props.index === index && 
            `border:2px solid ${props.theme.color.lightRed};`
        }
        :not(:last-child) { margin-right:1rem; }
        :hover {
            cursor:pointer;
        }
    `

    const handlePrevious = () => {
        setIndex(index - 1 < 0 ? maxIndex : index - 1);
    }

    const handleNext = () => {
        setIndex(index + 1 > maxIndex ? 0 : index + 1);
    }

    return (
        <ModalContainer onClick={props.handleClose}>
            <MainImgContainer>
                {props.account &&
                    <ImgButtonContainer>
                        <StyledImgButton icon={faTrashAlt}/>
                        <p>Set as profile pic</p>
                    </ImgButtonContainer>
                }
                <MainImg src={props.photos[index]}/>
            </MainImgContainer>
                <ArrowButtonsContainer>
                    <StyledArrowIcon icon={faArrowLeft} size={"lg"} onClick={handlePrevious}/>
                    <StyledArrowIcon icon={faArrowRight} size={"lg"} onClick={handleNext}/>
                </ArrowButtonsContainer>
                <ThumbnailContainer>
                    {props.photos.map((photo, index) => 
                        <Thumbnail src={photo} key={index} index={index} onClick={() => setIndex(index)}/>
                    )}
                </ThumbnailContainer>
        </ModalContainer>
    )
}