import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { actionLogin } from '../../actions/authActions';
import AppContext from '../../AppContext';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

function PageLogin(props) {

  const LoginSection = styled.section`
    display: flex;
    justify-content: center;
    background-color: #6F48BD;
    height: 100vh;
  `;
  const FormContainer = styled.section`
    padding: 50px;
    border-radius: 20px;
    margin-top: 15vh;
    width: 400px;
    height: 650px;
    background-color: white;
  `;
  const Form = styled.form`
    display: flex;
    flex-direction: column;
  `;


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { classes } = props;

  const userState = useContext(AppContext);

  const handleUsernameChange = username => event => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = password => event => {
    setPassword(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    const credentials = {username: username, password: password};
    axios.post(`/auth`, credentials)
      .then(res => actionLogin(res.data.token))
      .then(res => {
        userState.toggleConnected();
        props.history.push('/search');
      })
      .catch((err) => {
        console.error(err)
        alert('Error logging in please try again')
      });
  };

  return (
    <LoginSection>
      <form className={classes.container} noValidate autoComplete="off" onSubmit={handleSubmit} >
        <TextField
          id="standard-username"
          label="Username"
          className={classes.textField}
          onChange={handleUsernameChange('username')}
          margin="normal"
        />

        <TextField
          id="standard-password"
          label="Password"
          className={classes.textField}
          onChange={handlePasswordChange('password')}
          margin="normal"
        />

        <Button type="submit" variant="contained" color="primary" className={classes.button}>
            Primary
        </Button>
      </form>
    </LoginSection>
  );
}

export default withStyles(styles)(PageLogin);
