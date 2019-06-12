import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { actionLogin } from '../actions/authActions';

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


class TextFields extends React.Component {

  handleUsernameChange = username => event => {
    this.setState({ [username]: event.target.value });
  }

  handlePasswordChange = password => event => {
    this.setState({ [password]: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    const credentials = this.state;
    axios.post(`/auth`, credentials)
      .then(res => actionLogin(res.data.token))
      .then(res => this.props.history.push('/'))
      .catch((err) => {
        console.error(err)
        alert('Error logging in please try again')
      });
  }

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleSubmit} >
        <TextField
          id="standard-username"
          label="Username"
          className={classes.textField}
          onChange={this.handleUsernameChange('username')}
          margin="normal"
        />

        <TextField
          id="standard-password"
          label="Password"
          className={classes.textField}
          onChange={this.handlePasswordChange('password')}
          margin="normal"
        />

        <Button type="submit" variant="contained" color="primary" className={classes.button}>
            Primary
        </Button>

      </form>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TextFields);
