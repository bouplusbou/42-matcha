import React, { Fragment } from 'react';
import UserCard from './UserCard';
import CircleButton from './CircleButton';
import styled from 'styled-components'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export default function Results({ usersIndex, handleLikeDislike, user, hasNoMore }) {
    
    const Results = styled.section`
        display: flex;
        justify-content: center;
        align-items: center;
    `;
    const NextButtonSection = styled.section`
        z-index: 9;
        @media (max-width: 1080px) {
            transform: translate(60px);
        }
    `;
    const CardSection = styled.section`
        z-index: 0;
    `;
    const LikeButtonSection = styled.section`
        z-index: 9;
        @media (max-width: 1080px) {
            transform: translate(-60px);
        }
    `;

    return (
        <Results>
        {!hasNoMore &&
            <Fragment>
                <NextButtonSection>
                    <CircleButton
                        choice={'disliked'}
                        handleLikeDislike={handleLikeDislike}
                        circle_color={'gray'}
                        icon_color={'white'}
                        fa_icon={faTimes}
                    />
                </NextButtonSection>
                    <CardSection>
                        <UserCard 
                            user={user}
                            width={350}
                            height={525}
                        />
                    </CardSection>
                <LikeButtonSection>
                    <CircleButton
                        choice={'liked'}
                        handleLikeDislike={handleLikeDislike}
                        circle_color={'#FF6F62'}
                        icon_color={'white'}
                        fa_icon={faHeart}
                    />
                </LikeButtonSection>
            </Fragment>
        }
        {hasNoMore && 
            <p>No more suggestion...</p>
        }
        </Results>
    );
}





