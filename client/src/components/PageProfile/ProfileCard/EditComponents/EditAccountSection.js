import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import Separator from '../Components/Separator';
import { faPencilAlt, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { TextField } from '@material-ui/core';
import ProfileContext from '../../ProfileContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const authToken = localStorage.getItem('token');

const StyledSection = styled.section `
    display:flex;
    padding:1rem;
    width:100%;

    align-items:center;
    justify-content:center;
    flex-direction:column;
    border-radius:0 ${props => props.theme.borderRadius} ${props => props.theme.borderRadius} 0;

    background-color:#2b2c2e;
`

const StyledTextField = styled(TextField) `
    label {
        color:${props => props.theme.color.lightRed};
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
    grid-template-columns:1fr 1fr ;
    grid-template-rows:auto;
    grid-template-areas:
    "username username"
    "email emailConf"
    "password passwordConf"
    "submitButton cancelButton";
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
`

const UsernameTextField = styled(StyledTextField) `grid-area:username;`
const EmailTextField = styled(StyledTextField) `grid-area:email;`
const EmailConfTextField = styled(StyledTextField) `grid-area:emailConf;`
const PasswordTextField = styled(StyledTextField) `grid-area:password;`
const PasswordConfTextField = styled(StyledTextField) `grid-area:passwordConf;`

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

export default function InfosSection(props) {
    
    const profile = useContext(ProfileContext);
    const [valueState, setValueState] = useState({ ...profile })
    
    const [errorState, setErrorState] = useState({});

    const [editState, setEditState] = useState({});
    
    function handleValueChange(event) {
        const {name, value} = event.target;
        if (!valueIsOk(name, value)) {
            displayError(name);
        } else { 
            setErrorState({
                [name + 'Error']: false,
                [name + 'Helper']: ''
            }) 
        }
        setValueState({ ...valueState, [name]: value });
        setEditState({ ...editState, [name]: value });
    };

    
    const valueIsOk = (name, value) => {
        const regex = {
          email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          firstName: /^[A-Za-zÀ-ÖØ-öø-ÿ-]{3,15}$/,
          lastName: /^[A-Za-zÀ-ÖØ-öø-ÿ]{3,15}$/,
          username: /^[A-Za-zÀ-ÖØ-öø-ÿ]{5,10}$/,
          password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
        };
        return regex[name].test(String(value));
    };
    
    const displayError = name => {
        const errorMessage = {
            email: 'Enter a proper email',
            firstName: 'Between 3 and 15 characters, only letters and "-"',
            lastName: 'Between 3 and 15 characters, only letters',
            username: 'Between 6 and 10 characters, only letters',
            password: 'Minimum 6 characters, at least one uppercase letter, one lowercase letter and one number',
        };
        setErrorState({
            [name + 'Error']: true,
            [name + 'Helper']: errorMessage[name],
        })
    }

    function SubmitChanges() {
        profile.closeAndSaveEdit(editState);
    }

    return (
        <StyledSection>
            <Separator icon={faPencilAlt} size={"lg"}/>
            <GridForm>
                <UsernameTextField
                    label="Username"
                    name='username'
                    value={valueState.username}
                    onChange={handleValueChange}
                    error={errorState.usernameError}
                    helperText={errorState.usernameHelper}
                    variant="outlined"
                />
                <EmailTextField
                    label="Email"
                    name='email'
                    value={valueState.email}
                    onChange={handleValueChange}
                    error={errorState.emailError}
                    helperText={errorState.emailHelper}
                    variant="outlined"
                />
                <EmailConfTextField
                    label="Email Confirmation"
                    name='emailConf'
                    value={valueState.emailConf}
                    onChange={handleValueChange}
                    error={errorState.emailError}
                    helperText={errorState.emailHelper}
                    variant="outlined"
                />
                <PasswordTextField
                    label="Password"
                    name='password'
                    type='password'
                    value={valueState.password}
                    onChange={handleValueChange}
                    error={errorState.passwordError}
                    helperText={errorState.passwordHelper}
                    variant="outlined"
                />
                <PasswordConfTextField
                    label="Password Confirmation"
                    name='passwordConf'
                    type='password'
                    value={valueState.passwordConf}
                    onChange={handleValueChange}
                    error={errorState.passwordError}
                    helperText={errorState.passwordHelper}
                    variant="outlined"
                />
                <CancelButton onClick={SubmitChanges}><FontAwesomeIcon icon={faTimes} size={'lg'}/></CancelButton>
                <SubmitButton onClick={SubmitChanges}><FontAwesomeIcon icon={faCheck} size={'lg'}/></SubmitButton>
            </GridForm>
        </StyledSection>
    )
}