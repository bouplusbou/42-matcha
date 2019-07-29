import React from 'react';
import styled from 'styled-components';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Slider from 'rc-slider';
import AlgoliaPlaces from 'algolia-places-react';
import Select from 'react-select';

export default function Filtering({filterAge, handleAgeChange, rangeAge, filterScore, handleScoreChange, filterDistance, handleDistanceChange, handleLatlngChange, filterTags, handleTagsChange}) {
// export default function Filtering({filterAge, handleAgeChange, filterScore, handleScoreChange, filterDistance, handleDistanceChange, handleLatlngChange, filterTags, handleTagsChange}) {

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
                    min={rangeAge[0]}
                    max={rangeAge[1]}
                    // min={0}
                    // max={100}
                    allowCross={false}
                    defaultValue={filterAge}
                    tipFormatter={value => `${value}`} 
                />
            </section>
            <section>
                <TextBox>
                    <p>Score</p>
                    <p style={{fontSize: '0.9em'}}>{filterScore[0]} - {filterScore[1]}</p>
                </TextBox>
                <Range 
                    onAfterChange={handleScoreChange}
                    min={0}
                    max={1000}
                    allowCross={false}
                    defaultValue={filterScore}
                    tipFormatter={value => `${value}`} 
                />
            </section>
            <section>
                <p>City</p>
                <AlgoliaPlaces
                    placeholder='Search a city here'
                    options={{
                        appId: 'plGGWNJECAIH',
                        apiKey: 'ecb0baaa5b936ebb8dcc52e94b0b3b75',
                        language: 'fr',
                        countries: ['fr'],
                        type: 'city',
                    }}
                    onChange={handleLatlngChange}
                />
                <TextBox>
                    <p>Distance</p>
                    <p style={{fontSize: '0.9em'}}>{filterDistance}km</p>
                </TextBox>
                {/* <Range 
                    onAfterChange={handleDistanceChange}
                    min={0}
                    max={1000}
                    allowCross={false}
                    defaultValue={filterDistance}
                    tipFormatter={value => `${value}`} 
                /> */}
                <Slider 
                    dots
                    step={200} 
                    // defaultValue={50}
                    min={0}
                    max={1000}
                    defaultValue={filterDistance}
                    onAfterChange={handleDistanceChange}
                    // onBeforeChange={log} 
                />
            </section>            
            <section>
                <p>Interests</p>
                <Select
                    // onChange={handleTagsChange}
                    defaultValue={[]}
                    isMulti
                    name="colors"
                    options={filterTags}
                    // options={}
                    className="basic-multi-select"
                    classNamePrefix="select"
                />
            </section>
        </Filtering>
    );
};