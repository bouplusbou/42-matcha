import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { actionLogin } from '../../actions/authActions';
import AppContext from '../../AppContext';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';


const Hero = styled.section`
  background-color: #6F48BD;
  height: 100vh;
`;
const LoginSection = styled.section`
  display: flex;
  justify-content: center;
  padding-top: 10%;
`;
const FormContainer = styled.section`
  flex-basis: 400px;
  padding: 50px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0px 42px 60px rgba(0, 0, 0, 0.25);
  h1 {
    font-size: 2rem;
    text-align: center;
    font-family: Roboto;
    color: #292929;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const ErrorBox = styled.section`
  background-color: #FFECEC;
  color: red;
  padding: 5px;
  width: 60%;
  border: solid 0.5px red;
  border-radius: 8px;
  margin: 0 auto;
  margin-top: 40px;
  text-align: center;
  p {
    font-size: 0.8rem;
  }
`;
const SubmitButton = styled.button`
  text-decoration: none;
  border: none;
  display: block;
  margin: 0 auto;
  margin-top: 40px;
  background-color: #FF0041;
  width: 50%;
  text-align: center;
  border-radius: 100px;
  color: white;
  font-family: Roboto;
  font-size: 1em;
`;
const Redirect = styled.section`
  margin-top: 100px;
  color: #C6C6C6;
  font-weight: 500;
  text-align: center;
  a {
    text-decoration: none;
    color: #C6C6C6;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    text-decoration: underline;
}
`;

export default function PageLogin(props) {

  const userState = useContext(AppContext);
  const [values, setValues] = useState({
    username: '',
    password: '',
    showPassword: false,
    error: false,
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleFocus = () => {
    setValues({ ...values, error: false });
  };

  const toggleShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const credentials = {username: values.username, password: values.password};
    axios.post(`/auth`, credentials)
      .then(res => actionLogin(res.data.token))
      .then(res => {
        userState.toggleConnected();
        props.history.push('/search');
      })
      .catch(err => setValues({ ...values, error: true }));
  };

  return (
    <Hero>
      <LoginSection>
        <FormContainer>
          <h1>Login</h1>
          <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              id="standard-username"
              label="Username"
              value={values.username}
              onChange={handleChange('username')}
              onFocus={handleFocus}
              margin="normal"
            />

            <FormControl>
              <InputLabel htmlFor="adornment-password">Password</InputLabel>
              <Input
                id="standard-password"
                type={values.showPassword ? 'text' : 'password'}
                onChange={handleChange('password')}
                onFocus={handleFocus}
                error={values.passwordError}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-label="Toggle password visibility" onClick={toggleShowPassword}>
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText style={{color: 'red'}} id="password-helper-text">{values.passwordHelper}</FormHelperText>
            </FormControl>

            { values.error && 
              <ErrorBox>
                <p>⚠️ wrong Username or Password</p>
              </ErrorBox>
            }
            <SubmitButton type="submit">
              <p>Login</p>
            </SubmitButton>
          </Form>
          <Redirect>
            <p>Not a member yet ? <Link to="/signup">Signup now</Link></p>
          </Redirect>
        </FormContainer>
      </LoginSection>
    </Hero>
  );
}
