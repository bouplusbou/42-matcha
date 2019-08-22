import React, { useContext } from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faSearch, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';

import ProfileContext from '../../../ProfileContext';
import UsernameRow from './UsernameRow';
import TagChip from '../Components/TagChip'


const StyledSection = styled.section `
    display:flex;
    flex:1;
    padding:1rem;

    align-items:center;
    justify-content:center;
    flex-direction:column;
`

const Tags = styled.div `
    display:flex;
    justify-content:space-between;
    margin-top:auto;
    flex-wrap:wrap;
    width:100%;
`

const Biography = styled.div `
    margin-bottom:0.75rem;
    max-width:650px;
    font-style:italic;
    font-size:1.1rem;
    font-weight:300;
    overflow-wrap: break-word;
    hyphens:auto;
`

const Infos = styled.div `
    display:flex;
    width:100%;
    margin-bottom:1rem;
    justify-content:center;
    align-items:center;
    color: ${props => props.theme.color.lightRed};
`

export default function InfosSection() {

    const profile = useContext(ProfileContext);
    const infosList = [
        { info: `${profile.age} years old`, icon: faCalendarAlt },
        { info: profile.city, icon: faMapMarkedAlt },
        { info: profile.lookingFor, icon: faSearch }
    ]
    
    const InfoCase = (props) => { 
        const StyledCase = styled.div `
            display:flex;
            flex:1;
            height:4rem;
            justify-content:center;
            align-items:center;
            :not(:first-child) { border-left:1px solid #a275f0; }
        `
    
        const StyledIcon = styled(FontAwesomeIcon) `
            margin-right:1rem;
        `
    
        const StyledSpan = styled.span `
            font-size:1.25rem;
            font-weight:bold;
        `
    
        return (
            <StyledCase>
                <StyledIcon icon={props.icon} size={"2x"}/>
                <StyledSpan><strong>{props.info}</strong></StyledSpan>
            </StyledCase>
        )      
    }
    
    return (
        <StyledSection>
            <UsernameRow/>
            <Infos>
                {infosList.map((info, index) => 
                    <InfoCase 
                        key={index} 
                        info={info.info}
                        icon={info.icon}
                    />
                )}
            </Infos>
            <Biography>
                <span>"{profile.bio}"</span>
            </Biography>
            <Tags>
                {profile.tags.map((tag, index)=> <TagChip tag={tag} key={index}/>)}
            </Tags>
        </StyledSection>
    )
}