import React from 'react';
import styled from 'styled-components';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Slider from 'rc-slider';
import AlgoliaPlaces from 'algolia-places-react';
import Select from 'react-select';

export default function Filtering({filterAge, handleAgeChange, filterFame, handleFameChange, handleLatlngChange, filterTags, handleTagsChange}) {

    const Filtering = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 500px;
        // background-color: azure;
        font-family: Roboto;
        // box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        // border-right: solid 0.5px ghostwhite;
        border-radius: 30px;
        padding: 3em;
    `

    const createSliderWithTooltip = Slider.createSliderWithTooltip;
    const Range = createSliderWithTooltip(Slider.Range);

    return (
        <Filtering>
            <section>
                <p>Age</p>
                <Range 
                    onAfterChange={handleAgeChange}
                    min={18}
                    max={40}
                    allowCross={false}
                    defaultValue={filterAge}
                    tipFormatter={value => `${value}`} 
                />
            </section>
            <section>
                <p>Fame</p>
                <Range 
                    onAfterChange={handleFameChange}
                    min={0}
                    max={1000}
                    allowCross={false}
                    defaultValue={filterFame}
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
            </section>            
            <section>
                <p>Interests</p>
                <Select
                    onChange={handleTagsChange}
                    defaultValue={[]}
                    isMulti
                    name="colors"
                    options={filterTags}
                    className="basic-multi-select"
                    classNamePrefix="select"
                />
            </section>
        </Filtering>
    );
};