import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import ProfileContext from '../../ProfileContext';

const authToken = localStorage.getItem('token');

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
    
    const profile = useContext(ProfileContext);
    const [currentIndexState, setCurrentIndexState] = useState(profile.avatarIndex);
    const [photosState, setPhotosState] = useState([...profile.photos]);
    const maxIndex = photosState.length - 1;

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
        ${props => props.index === currentIndexState && 
            `border:2px solid ${props.theme.color.lightRed};`
        }
        :not(:last-child) { margin-right:1rem; }
        :hover {
            cursor:pointer;
        }
    `

    const handleDelete = async () => {
        const confirm = window.confirm(`Are you sure you want to delete this picture ?`);
        if (confirm) {
            const filteredPhotos = [...profile.photos];
            filteredPhotos.splice(currentIndexState, 1);
            const editedValues = {
                avatarIndex: profile.avatarIndex === currentIndexState ?
                    0 :
                    (profile.avatarIndex > currentIndexState ? profile.avatarIndex -1 : profile.avatarIndex),
                photos: filteredPhotos,
            }
            await axios.post(`/users/updateProfile?authToken=${authToken}`, editedValues)
            profile.fetchData();
            if (filteredPhotos.length === 0) {
                props.handleClose();
            }
            setPhotosState([...filteredPhotos]);
        }
    }

    const handleSetAsProfile = async () => {
        const confirm = window.confirm(`Do you wish to set this picture to your profile pic ?`);
        if (confirm) {
            const editedValues = { avatarIndex: currentIndexState }
            await axios.post(`/users/updateProfile?authToken=${authToken}`, editedValues)
            profile.fetchData();
        }
    }
    const handlePrevious = () => {
        setCurrentIndexState(currentIndexState - 1 < 0 ? maxIndex : currentIndexState - 1);
    }

    const handleNext = () => {
        setCurrentIndexState(currentIndexState + 1 > maxIndex ? 0 : currentIndexState + 1);
    }

    return (
        <ModalContainer onClick={props.handleClose}>
            <MainImgContainer>
                {profile.account &&
                    <ImgButtonContainer>
                        <StyledImgButton icon={faTrashAlt} onClick={handleDelete}/>
                        <p onClick={handleSetAsProfile}>Set as profile pic</p>
                    </ImgButtonContainer>
                }
                <MainImg src={photosState[currentIndexState]}/>
            </MainImgContainer>
                <ArrowButtonsContainer>
                    <StyledArrowIcon icon={faArrowLeft} size={"lg"} onClick={handlePrevious}/>
                    <StyledArrowIcon icon={faArrowRight} size={"lg"} onClick={handleNext}/>
                </ArrowButtonsContainer>
                <ThumbnailContainer>
                    {photosState.map((photo, index) => 
                        <Thumbnail src={photo} key={index} index={index} onClick={() => setCurrentIndexState(index)}/>
                    )}
                </ThumbnailContainer>
        </ModalContainer>
    )
}