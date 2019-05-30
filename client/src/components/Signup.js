import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CssBaseline from "@material-ui/core/CssBaseline"
import axios from 'axios'

const styles = theme => ({
  body: {
    backgroundColor: '#5e3da1',
  },
  formContainer: {
    padding: '50px',
    borderRadius: '10px',
    width: '500px',
    height: '600px',
    backgroundColor: '#fff',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  button: {
    color: 'white',
    fontWeight: 900,
    backgroundColor: '#EF2F53',
    marginTop: '40px',
    padding: '12px',
    borderRadius: '50px',
  },
  formTitle: {
    textAlign: 'center',
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
})

class SignupForm extends React.Component {

  handleEmailChange = email => event => {
    this.setState({ [email]: event.target.value })
  }
  handleFirstNameChange = firstName => event => {
    this.setState({ [firstName]: event.target.value })
  }
  handleLastNameChange = lastName => event => {
    this.setState({ [lastName]: event.target.value })
  }
  handleUsernameChange = username => event => {
    this.setState({ [username]: event.target.value })
  }
  handlePasswordChange = password => event => {
    this.setState({ [password]: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault();

    const newUser = this.state

    axios.post(`/users`, newUser)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.wrapper}>
        <div className={classes.formContainer}>
          <h1 className={classes.formTitle}>Signup</h1>
          <form className={classes.form} noValidate autoComplete="off" onSubmit={this.handleSubmit} >
            <TextField
              id="standard-email"
              label="Email"
              className={classes.textField}
              onChange={this.handleEmailChange('email')}
              margin="normal"
            />

            <TextField
              id="standard-firstName"
              label="First Name"
              className={classes.textField}
              onChange={this.handleFirstNameChange('firstName')}
              margin="normal"
            />

            <TextField
              id="standard-lastName"
              label="Last Name"
              className={classes.textField}
              onChange={this.handleLastNameChange('lastName')}
              margin="normal"
            />

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

            <Button type="submit" variant="contained" className={classes.button}>
                Signup
            </Button>

          </form>
        </div>

      </div>
    )
  }
}

SignupForm.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SignupForm)
