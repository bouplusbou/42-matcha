import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import Separator from '../Separator';
import { faPencilAlt, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { TextField } from '@material-ui/core';
import ProfileContext from '../ProfileContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TagChip from './TagChip';
import CreatableSelect from 'react-select/creatable';
import axios from 'axios';
import AlgoliaPlaces from 'algolia-places-react';
const authToken = localStorage.getItem('token');

const StyledSection = styled.section `
    display:flex;
    padding:1rem;

    align-items:center;
    flex-direction:column;
    border-radius:0 ${props => props.theme.borderRadius} ${props => props.theme.borderRadius} 0;

    background-color:#2b2c2e;
`

const StyledTextField = styled(TextField) `
    label {
        color:${props => props.theme.color.purple};
        font-size:1.25rem;
        font-weight:bold;
        :focus { color:pink; }
    }
    input { color:white; }
    div {
        color:white;
        height:100%;
        option {
            color:#2b2c2e;
            background-color:black;
        }
    }
    svg { color:${props => props.theme.color.purple}; }
`
const GridForm = styled.form `
    width:100%;
    display:grid;
    grid-template-columns:1fr 1fr 1fr 1fr;
    grid-template-rows:auto;
    grid-template-areas:
    "username gender firstName lastName"
    "age location location orientation"
    "biography biography biography biography"
    "tagSelect tagSelect tagSelect tagSelect"
    "tags tags tags tags"
    ". cancelButton submitButton .";
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
`

const UsernameTextField = styled(StyledTextField) `grid-area:username;`
const FirstNameTextField = styled(StyledTextField) `grid-area:firstName;`
const LastNameTextField = styled(StyledTextField) `grid-area:lastName;`
const GenderTextField = styled(StyledTextField) `grid-area:gender;`
const OrientationTextField = styled(StyledTextField) `grid-area:orientation;`
const AgeTextField = styled(StyledTextField) `grid-area:age;`
const BiographyTextField = styled(StyledTextField) `
    grid-area:biography;
    margin:0;
    max-height:200px;
`

const TagsContainer = styled.div `
    display:flex;
    flex-direction:row;
    flex-wrap:wrap;
    grid-area:tags;
`

const StyledButton = styled.div `
    box-sizing:border-box;
    display:flex;
    justify-content:center;
    align-items:center;
    border-radius:5px;
    font-weight:bold;
    height:100%;
    width:100%;
    :hover {
        cursor:pointer;
    }
`

const SubmitButton = styled(StyledButton) `
    grid-area:submitButton;
    background-color:${props => props.theme.color.purple};
    color:#2b2c2e;
    height:2rem;
    :hover {
        border:2px solid ${props => props.theme.color.purple};
        color:${props => props.theme.color.purple};
        background-color:#2b2c2e;
    }
`

const CancelButton = styled(StyledButton) `
    grid-area:cancelButton;
    height:2rem;
`

const StyledCreatableSelect = styled(CreatableSelect) `
    grid-area:tagSelect;
    div {
        color:white;
        border-color:#212223;
        background-color:#2b2c2e;
        div {
            background-color:#2b2c2e;
        }
    }
`

const StyledAlgoliaPlaces = styled(AlgoliaPlaces) `
    grid-area:location;
    background-color:#2b2c2e;
    color:#ffffff;
    border-color:#212223;
`

export default function InfosSection(props) {
    const profile = useContext(ProfileContext);
    const [valueState, setValueState] = useState({
        ...profile,
        newTag: ""
    })
    const Tags = valueState.tags.map((tag, index) => <TagChip deletable={true} tag={tag} index={index} onDelete={DeleteTag}/>)
    const [editState, setEditState] = useState({});

    const [tagsList, setTagsList] = useState([]);
    useEffect(() => {
        async function fetchAllTags() {
            const tags = await axios.get(`/tags?authToken=${authToken}`);
            const filteredTags = tags.data.data.filter(tag => !valueState.tags.includes(tag.label));
            setTagsList([...filteredTags]);
        }
        fetchAllTags();
    },[valueState]);

    function handleChange(event) {
        const {name, value} = event.target;
        if (name === "bio") {
            if (valueState.bio.length < 300 && value.length < 300) {
                setValueState({ ...valueState, bio: value })
                setEditState({ ...editState, bio: value })
            }
        } else {
            setValueState({ ...valueState, [name]: value });
            setEditState({ ...editState, [name]: value });
        }
    };

    async function createTag(tag) {
        if (!valueState.tags.includes(tag)) {
            await axios.post(`/tags/create?authToken=${authToken}`, {tag})
            addTag({label: tag});
        }
    }
    
    async function addTag(newValue) {
            const tag = newValue.label;
            await axios.post(`/users/addTag?authToken=${authToken}`, {tag});
            const newTagsList = valueState.tags
            newTagsList.push(tag);
            setValueState({
                ...valueState,
                tags: newTagsList,
                newTag: ""
            })
    }

    async function DeleteTag(tagIndex) {
        const params = {data: {tag: valueState.tags[tagIndex]}};
        await axios.delete(`/users/removeTag?authToken=${authToken}`, params);
        const newTagsList = valueState.tags;
        newTagsList.splice(tagIndex, 1);
        setValueState({
            ...valueState,
            tags: newTagsList
        })
    }

    function SubmitChanges() {
        profile.closeAndSaveEdit(editState);
    }

    function handleInputChange(value) {
        setValueState({
            ...valueState,
            newTag: value,
        })
    }

    const handleLatlngChange = ({ suggestion }) => { 
        setValueState({
            ...valueState,
            latLng: [suggestion.latlng.lat, suggestion.latlng.lng],
            city: suggestion.city,
        });
        setEditState({
            ...editState,
            latLng: [suggestion.latlng.lat, suggestion.latlng.lng],
            city: suggestion.city,
        })
    };

    return (
        <StyledSection>
            <Separator icon={faPencilAlt} size={"lg"}/>
            <GridForm>
                <UsernameTextField
                    label="Username"
                    name='username'
                    value={valueState.username}
                    onChange={handleChange}
                    variant="outlined"
                />
                <GenderTextField
                    select
                    label="Gender"
                    name="gender"
                    SelectProps={{
                        native: true,
                    }}
                    value={valueState.gender}
                    onChange={handleChange}
                    variant="outlined"
                >
                    <option value="male">Man</option>
                    <option value="female">Woman</option>
                    <option value="non-binary">Non-binary</option>
                </GenderTextField>
                <FirstNameTextField
                    label="First Name"
                    name="firstName"
                    value={valueState.firstName}
                    onChange={handleChange}
                    variant="outlined"
                />
                <LastNameTextField
                    label="Last Name"
                    name="lastName"
                    value={valueState.lastName}
                    onChange={handleChange}
                    variant="outlined"
                />
                <StyledAlgoliaPlaces
                    placeholder='Search a city here'
                    options={{
                        appId: 'plGGWNJECAIH',
                        apiKey: 'ecb0baaa5b936ebb8dcc52e94b0b3b75',
                        language: 'fr',
                        countries: ['fr'],
                        type: 'address',
                    }}
                    onChange={handleLatlngChange}
                />
                <AgeTextField
                    select
                    label="Age"
                    name="age"
                    SelectProps={{
                        native: true,
                    }}
                    value={valueState.age}
                    onChange={handleChange}
                    variant="outlined"
                >
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                </AgeTextField>
                <OrientationTextField
                    select
                    label="Orientation"
                    name="orientation"
                    SelectProps={{
                        native: true,
                    }}
                    value={valueState.orientation}
                    onChange={handleChange}
                    variant="outlined"
                >
                    <option value="straight">Straight</option>
                    <option value="homosexual">Homosexuel</option>
                    <option value="bisexual">Bisexual</option>
                </OrientationTextField>
                <BiographyTextField
                    label="Biography"
                    name="bio"
                    multiline
                    value={valueState.bio}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                />
                <StyledCreatableSelect
                    value={valueState.newTag}
                    options={tagsList}
                    onChange={addTag}
                    onInputChange={handleInputChange}
                    onCreateOption={createTag}
                />
                <TagsContainer>
                    {Tags}
                </TagsContainer>
                <CancelButton onClick={SubmitChanges}><FontAwesomeIcon icon={faTimes} size={'lg'}/></CancelButton>
                <SubmitButton onClick={SubmitChanges}><FontAwesomeIcon icon={faCheck} size={'lg'}/></SubmitButton>
            </GridForm>
        </StyledSection>
    )
}