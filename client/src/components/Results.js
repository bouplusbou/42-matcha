import React from 'react';
import UserCard from './UserCard';
import CircleButton from './CircleButton';
import styled from 'styled-components'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export default function Results({ users }) {

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
            <NextButtonSection>
                <CircleButton
                    circle_color={'gray'}
                    icon_color={'white'}
                    fa_icon={faTimes}
                />
            </NextButtonSection>
            <CardSection>
                <UserCard 
                    user={users[0]}
                    width={350}
                    height={525}
                />
            </CardSection>
            <LikeButtonSection>
                <CircleButton
                    circle_color={'#FF6F62'}
                    icon_color={'white'}
                    fa_icon={faHeart}
                />
            </LikeButtonSection>
        </Results>
    );
}





