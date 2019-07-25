import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Separator from '../Separator';
import { faPencilAlt, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { TextField } from '@material-ui/core';
import ProfileContext from '../ProfileContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TagChip from './TagChip';

const StyledSection = styled.section `
    display:flex;
    padding:1rem;

    align-items:center;
    flex-direction:column;

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

const UsernameTextField = styled(StyledTextField) `grid-area:username;`

const FirstNameTextField = styled(StyledTextField) `grid-area:firstName;`

const LastNameTextField = styled(StyledTextField) `grid-area:lastName;`

const GenderTextField = styled(StyledTextField) `grid-area:gender;`

const OrientationTextField = styled(StyledTextField) `grid-area:orientation;`

const AgeTextField = styled(StyledTextField) `grid-area:age;`

const AddTagTextField = styled(StyledTextField) `grid-area:addTag;`

const BiographyTextField = styled(StyledTextField) `
    grid-area:biography;
    margin:0;
    max-height:200px;
`


const GridForm = styled.form `
    width:100%;
    display:grid;
    grid-template-columns:1fr 1fr 1fr 1fr;
    grid-template-rows:auto;
    grid-template-areas:
    "username gender firstName lastName"
    "age . . orientation"
    "biography biography biography biography"
    "addTag addTag addTag addTagButton"
    "tags tags tags tags"
    ". cancelButton submitButton .";
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
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

const AddTagButton = styled(StyledButton) `
    grid-area:addTagButton;
    border:2px solid ${props => props.theme.color.purple};
    color:${props => props.theme.color.purple};
    background-color:#2b2c2e;
    :hover {
        color:#2b2c2e;
        background-color:${props => props.theme.color.purple};
        cursor:pointer;
    }
`

const CancelButton = styled(AddTagButton) `
    grid-area:cancelButton;
    height:2rem;
`

export default function InfosSection(props) {
    const profile = useContext(ProfileContext);
    const [editState, setEditState] = useState({
        ...profile,
        newTag: ""
    })
    const Tags = editState.tags.map((tag, index) => <TagChip deletable={true} tag={tag} index={index} onDelete={DeleteTag}/>)
    

    function handleChange(event) {
        const {name, value} = event.target;
        if (name == "bio") {
            if (editState.bio.length < 300 && value.length < 300)
            setEditState({
                ...editState,
                bio: value
            })
        } else {
            setEditState({
                ...editState,
                [name]: value,
            });
        }
    };

    function CreateTag() {
        if (editState.tags.length < 10) {
            const newTags = editState.tags;
            newTags.push(editState.newTag);
            setEditState({
                ...editState,
                tags: newTags,
                newTag: ""
            })
        }
    }
    function DeleteTag(tagIndex) {
        console.log(tagIndex);
        const tags = editState.tags;
        tags.splice(tagIndex, 1);
         setEditState({
             ...editState,
             tags : tags
         })
    }

    function SubmitChanges() {
        profile.closeAndSaveEdit(editState);
    }

    return (
        <StyledSection>
            {/* <Title>Edit your profile</Title> */}
            <Separator icon={faPencilAlt} size={"lg"}/>
            <GridForm>
                <UsernameTextField
                    label="Username"
                    name='username'
                    value={editState.username}
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
                    value={editState.gender}
                    onChange={handleChange}
                    variant="outlined"
                >
                    <option value="man">Man</option>
                    <option value="woman">Woman</option>
                    <option value="non-binary">Non-binary</option>
                </GenderTextField>
                <FirstNameTextField
                    label="First Name"
                    value={profile.firstName}
                    onChange={handleChange}
                    variant="outlined"
                />
                <LastNameTextField
                    label="Last Name"
                    value={profile.lastName}
                    onChange={handleChange}
                    variant="outlined"
                />
                <AgeTextField
                    select
                    label="Age"
                    name="age"
                    SelectProps={{
                        native: true,
                    }}
                    value={editState.age}
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
                    value={editState.orientation}
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
                    value={editState.bio}
                    onChange={handleChange}
                    fullWidth
                    variant="outlined"
                />
                <AddTagTextField
                    label="Add tag"
                    name='newTag'
                    value={editState.newTag}
                    placeholder="Add tag"
                    onChange={handleChange}
                    variant="outlined"
                />
                <AddTagButton onClick={CreateTag}>Add Tag</AddTagButton>
                <TagsContainer>
                    {Tags}
                </TagsContainer>
                <CancelButton onClick={SubmitChanges}><FontAwesomeIcon icon={faTimes} size={'lg'}/></CancelButton>
                <SubmitButton onClick={SubmitChanges}><FontAwesomeIcon icon={faCheck} size={'lg'}/></SubmitButton>
            </GridForm>
        </StyledSection>
    )
}