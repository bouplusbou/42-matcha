import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import axios from 'axios'

const styles = theme => ({
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
  state = {

  }

  emailIsOk = email => {
    if (email.length < 5) {
      return false
    } else {
      return true
    }
  }
  firstNameIsOk = firstName => {
    if (firstName.length < 5) {
      return false
    } else {
      return true
    }
  }
  lastNameIsOk = lastName => {
    if (lastName.length < 5) {
      return false
    } else {
      return true
    }
  }
  usernameIsOk = username => {
    if (username.length < 5) {
      return false
    } else {
      return true
    }
  }
  passwordIsOk = password => {
    if (password.length < 5) {
      return false
    } else {
      return true
    }
  }
  allIsOk = () => {
    return this.state.errorEmail
  }

  handleEmailBlur = email => event => {
    if (this.emailIsOk(event.target.value)) {
      this.setState({ 
        errorEmail: false,
        helperEmail: '',
        email: event.target.value
       })
    } else {
      this.setState({ 
        email: undefined,
        errorEmail: true,
        helperEmail: 'Please enter a proper email'
      })
    }
  }
  handleFirstNameBlur = firstName => event => {
    if (this.emailIsOk(event.target.value)) {
      this.setState({ 
        errorFirstName: false,
        helperFirstName: '',
        firstName: event.target.value
       })
    } else {
      this.setState({ 
        firstName: undefined,
        errorFirstName: true,
        helperFirstName: 'Please enter a proper first name'
      })
    }
  }
  handleLastNameBlur = lastName => event => {
    if (this.emailIsOk(event.target.value)) {
      this.setState({ 
        errorLastName: false,
        helperLastName: '',
        lastName: event.target.value
      })
    } else {
      this.setState({
        lastName: undefined,
        errorLastName: true,
        helperLastName: 'Please enter a proper last name' })
    }
  }
  handleUsernameBlur = username => event => {
    if (this.emailIsOk(event.target.value)) {
      this.setState({ 
        errorUsername: false,
        helperUsername: '',
        username: event.target.value
      })
    } else {
      this.setState({
        username: undefined,
        errorUsername: true,
        helperUsername: 'Please enter a proper username'
      })
    }
  }
  handlePasswordBlur = password => event => {
    if (this.emailIsOk(event.target.value)) {
      this.setState({ 
        errorPassword: false,
        helperPassword: '',
        password: event.target.value
      })
    } else {
      this.setState({ 
        password: undefined,
        errorPassword: true,
        helperPassword: 'Please enter a proper password'
      })
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    
    const newUser = { 
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      username: this.state.username,
      password: this.state.password
    }

    console.log(newUser)

    if (newUser.email 
        && newUser.firstName 
        && newUser.lastName
        && newUser.username
        && newUser.password) {
      axios.post(`/users`, newUser)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
    } else {
      console.log('missing field en alerte')
    }
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
              required={true}
              className={classes.textField}
              onBlur={this.handleEmailBlur('email')}
              error={this.state.errorEmail}
              helperText={this.state.helperEmail}
              margin="normal"
            />

            <TextField
              id="standard-firstName"
              label="First Name"
              required={true}
              className={classes.textField}
              onBlur={this.handleFirstNameBlur('firstName')}
              error={this.state.errorFirstName}
              helperText={this.state.helperFirstName}
              margin="normal"
            />

            <TextField
              id="standard-lastName"
              label="Last Name"
              required={true}
              className={classes.textField}
              onBlur={this.handleLastNameBlur('lastName')}
              error={this.state.errorLastName}
              helperText={this.state.helperLastName}
              margin="normal"
            />

            <TextField
              id="standard-username"
              label="Username"
              required={true}
              className={classes.textField}
              onBlur={this.handleUsernameBlur('username')}
              error={this.state.errorUsername}
              helperText={this.state.helperUsername}
              margin="normal"
            />

            <TextField
              id="standard-password"
              label="Password"
              required={true}
              className={classes.textField}
              onBlur={this.handlePasswordBlur('password')}
              error={this.state.errorPassword}
              helperText={this.state.helperPassword}
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
