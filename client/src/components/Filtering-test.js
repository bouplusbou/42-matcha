import React from 'react';
import styled from 'styled-components';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Slider from 'rc-slider';
import AlgoliaPlaces from 'algolia-places-react';
import Select from 'react-select';

export default function Filtering({filterAge, handleAgeChange, rangeAge}) {

    const Filtering = styled.aside`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 500px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        font-family: Roboto;
        border-radius: 30px;
        padding: 3em;
        p {
            font-weight: 500;
            color: #292929;
        }
        @media (max-width: 630px) {
            width: 180px;

        }
    `
    const TextBox = styled.section`
        display: flex;
        justify-content: space-between;
        align-items: end;
    `

    const createSliderWithTooltip = Slider.createSliderWithTooltip;
    const Range = createSliderWithTooltip(Slider.Range);
    
    return (
        <Filtering>
            <section>
                <TextBox>
                    <p>Age</p>
                    <p style={{fontSize: '0.9em'}}>{filterAge[0]} - {filterAge[1]} years</p>
                </TextBox>
                <Range 
                    onAfterChange={handleAgeChange}
                    // min={rangeAge[0]}
                    // max={rangeAge[1]}
                    min={18}
                    max={40}
                    // value={filterAge}
                    allowCross={false}
                    defaultValue={filterAge}
                    // tipFormatter={value => `${value}`} 
                />
            </section>
        </Filtering>
    );
};
