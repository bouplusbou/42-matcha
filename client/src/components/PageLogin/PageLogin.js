import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { actionLogin } from '../../actions/authActions';
import AppContext from '../../AppContext';


export default function PageLogin(props) {

  const LoginSection = styled.section`
    display: flex;
    justify-content: center;
    background-color: #6F48BD;
    height: 100vh;
  `;
  // const FormContainer = styled.section`
  //   width: 400px;
  // `;
  // const FormContainer = styled.section`
  //   width: 400px;
  //   height: 400px;
  //   padding: 50px;
  //   background-color: white;
  //   border-radius: 20px;
  //   margin-top: 15vh;
  //   box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.1);
  //   h1 {
  //     font-size: 2rem;
  //     text-align: center;
  //     font-family: Roboto;
  //     color: #292929;
  //   }
  // `;
  const Form = styled.form`
    display: flex;
    flex-direction: column;
  `;
  const SubmitButton = styled.button`
    text-decoration: none;
    border: none;
    display: block;
    margin: 60px auto;
    background-color: #FF0041;
    width: 250px;
    text-align: center;
    border-radius: 100px;
    color: white;
    font-family: Roboto;
    font-size: 1em;
  `;

  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const userState = useContext(AppContext);

  const handleSubmit = event => {
    event.preventDefault();

    const credentials = {username: values.username, password: values.password};
    axios.post(`/auth`, credentials)
      .then(res => actionLogin(res.data.token))
      .then(res => {
        userState.toggleConnected();
        props.history.push('/search');
      })
      .catch(err => alert('Wrong username or password. Please try again'));
  };

  return (
    // quand je place le form dans un container FormContainer, l'input ne fonctionne plus WTFFFFFFFFF !!!!!!!!
    // <FormContainer> 
    <section>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          id="standard-username"
          label="Username"
          value={values.username}
          onChange={handleChange('username')}
          margin="normal"
        />
        <TextField
          id="standard-password"
          label="Password"
          value={values.password}
          onChange={handleChange('password')}
          margin="normal"
        />
        <SubmitButton type="submit">
          <p>Login</p>
        </SubmitButton>
      </form>
    </section>
    // </FormContainer>
  );
}