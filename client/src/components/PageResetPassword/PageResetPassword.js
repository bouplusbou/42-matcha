import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
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
const Section = styled.section`
  display: flex;
  justify-content: center;
  padding-top: 10%;
`;
const Container = styled.section`
  flex-basis: 400px;
  padding: 50px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.1);
  color: #4A4A4A;
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

export default function PageResetPassword(props) {
    // const [isLoading, setIsLoading] = useState(true);
    // const [isError, setIsError] = useState(true);
    const [isError, setIsError] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordHelper, setPasswordHelper] = useState('');

    const handleSubmit = async event => {
      event.preventDefault();
      const params = { 
        hash: props.match.params.hash,
        password: password,
      };
      axios.post(`/users/resetPassword`, params)
        .then(res => { if (res.status === 200) props.history.push('/login'); })
        .catch(error => {
          // error.response.data;
        })
    };

    const passwordIsOk = password => {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
      return regex.test(String(password));
    }

    const handleBlur = event => {
      if (!passwordIsOk(event.target.value)) {
        setPasswordError(true);
        setPasswordHelper('Minimum 6 characters, at least one uppercase letter, one lowercase letter and one number');
      }
    };
    const handleChange = event => setPassword(event.target.value);
    const toggleShowPassword = () => setShowPassword(!showPassword);

    useEffect(() => {
        async function fetchData() {
            try {
                await axios.post('/users/confirmation', {hash: props.match.params.hash});
                setIsError(false);
            } catch(error) {}
            setIsLoading(false);
        }
        fetchData();
    }, [props.match.params.hash]);

    return (
        <Hero>
            <Section>
                <Container>
                {!isLoading && isError && 
                  <Fragment>
                    <h1>Sorry but...</h1>
                    <ErrorBox>
                      <p> <span aria-label="Attention" role="img" >⚠️</span> the link you provided is not working, please try again.</p>
                    </ErrorBox>
                  </Fragment>
                }
                {!isLoading && !isError && 
                  <Fragment>
                    <h1>Reset your password</h1>
                    <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
                      <FormControl required={true}>
                        <InputLabel htmlFor="adornment-password">Password</InputLabel>
                        <Input
                          id="standard-password"
                          type={showPassword ? 'text' : 'password'}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={passwordError}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton aria-label="Toggle password visibility" onClick={toggleShowPassword}>
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                        <FormHelperText style={{color: 'red'}} id="password-helper-text">{passwordHelper}</FormHelperText>
                      </FormControl>
                      <SubmitButton type="submit">
                        <p>Signup</p>
                      </SubmitButton>
                    </Form>
                  </Fragment>
                }
                </Container>
            </Section>
        </Hero>
    );
}