import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';




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
    showPassword: false,
    open: true,
  }


  emailIsOK = email => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase())
  }
  emailError = () => {
    this.setState({ 
      email: undefined,
      errorEmail: true,
      helperEmail: 'Enter a proper email',
    })
  }
  emailTaken = () => {
    this.setState({ 
      email: undefined,
      errorEmail: true,
      helperEmail: 'This email is already used. Wanna <a href="#">login</a> ?',
    })
  }
  emailIsSet = email => {
    this.setState({ 
      email: email,
      errorEmail: false,
      helperEmail: '',
     })
  }
  handleEmailBlur = email => event => {
    if (this.emailIsOK(event.target.value)) {
      this.emailIsSet(event.target.value)
    } else {
      this.emailError()
    }
  }
  handleEmailChange = email => event => {
    if (this.emailIsOK(event.target.value)) {
      this.emailIsSet(event.target.value)
    }
  }


  firstNameIsOK = firstName => {
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ-]{3,15}$/
    return regex.test(String(firstName))
  }
  firstNameError = () => {
    this.setState({ 
      firstName: undefined,
      errorFirstName: true,
      helperFirstName: 'Between 3 and 15 characters, only letters and "-"',
    })
  }
  firstNameIsSet = firstName => {
    this.setState({ 
      firstName: firstName,
      errorFirstName: false,
      helperFirstName: '',
     })
  }
  handleFirstNameBlur = firstName => event => {
    if (this.firstNameIsOK(event.target.value)) {
      this.firstNameIsSet(event.target.value)
    } else {
      this.firstNameError()
    }
  }
  handleFirstNameChange = firstName => event => {
    if (this.firstNameIsOK(event.target.value)) {
      this.firstNameIsSet(event.target.value)
    }
  }


  lastNameIsOK = lastName => {
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ]{3,15}$/
    return regex.test(String(lastName))
  }
  lastNameError = () => {
    this.setState({
      lastName: undefined,
      errorLastName: true,
      helperLastName: 'Between 3 and 15 characters, only letters',
    })
  }
  lastNameIsSet = lastName => {
    this.setState({ 
      lastName: lastName,
      errorLastName: false,
      helperLastName: '',
    })
  }
  handleLastNameBlur = lastName => event => {
    if (this.lastNameIsOK(event.target.value)) {
      this.lastNameIsSet(event.target.value)
    } else {
      this.lastNameError()
    }
  }
  handleLastNameChange = lastName => event => {
    if (this.lastNameIsOK(event.target.value)) {
      this.lastNameIsSet(event.target.value)
    }
  }


  usernameIsOK = username => {
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ]{5,10}$/
    return regex.test(String(username))
  }
  usernameError = () => {
    this.setState({
      username: undefined,
      errorUsername: true,
      helperUsername: 'Between 6 and 10 characters, only letters',
    })
  }
  usernameTaken = () => {
    this.setState({
      username: undefined,
      errorUsername: true,
      helperUsername: 'This username is already taken',
    })
  }
  usernameIsSet = username => {
    this.setState({ 
      username: username,
      errorUsername: false,
      helperUsername: '',
    })
  }
  handleUsernameBlur = username => event => {
    if (this.usernameIsOK(event.target.value)) {
      this.usernameIsSet(event.target.value)
    } else {
      this.usernameError()
    }
  }
  handleUsernameChange = username => event => {
    if (this.usernameIsOK(event.target.value)) {
      this.usernameIsSet(event.target.value)
    }
  }

  passwordIsOK = password => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/
    return regex.test(String(password))
  }
  passwordError = () => {
    this.setState({ 
      password: undefined,
      errorPassword: true,
      helperPassword: 'Minimum 6 characters, at least one uppercase letter, one lowercase letter and one number',
    })
  }
  passwordIsSet = password => {
    this.setState({ 
      password: password,
      errorPassword: false,
      helperPassword: '',
    })
  }
  handlePasswordBlur = password => event => {
    if (this.passwordIsOK(event.target.value)) {
      this.passwordIsSet(event.target.value)
    } else {
      this.passwordError()
    }
  }
  handlePasswordChange = password => event => {
    if (this.passwordIsOK(event.target.value)) {
      this.passwordIsSet(event.target.value)
    }
  }
  handleClickShowPassword = () => {
    this.setState({ 
      showPassword: !this.state.showPassword
     })
  };



  handleSubmit = event => {
    event.preventDefault();
    
    const newUser = { 
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      username: this.state.username,
      password: this.state.password
    }

    if (newUser.email 
        && newUser.firstName 
        && newUser.lastName
        && newUser.username
        && newUser.password) {
      axios.post(`/users`, newUser)
      .then(res => {
        if (res.status === 200) {
          this.props.history.push('/')
        } 
      })
      .catch(error => {
        console.log(error.response.data)
        const res = error.response.data
        if (res.emailKO) {
          this.emailError()
        }
        if (res.firstNameKO) {
          this.firstNameError()
        }
        if (res.lastNameKO) {
          this.lastNameError()
        }
        if (res.usernameKO) {
          this.usernameError()
        }
        if (res.passwordKO) {
          this.passwordError()
        }
      })
    } else {
      if (!newUser.email) {
        this.emailError()
      }
      if (!newUser.firstName) {
        this.firstNameError()
      }
      if (!newUser.lastName) {
        this.lastNameError()
      }
      if (!newUser.username) {
        this.usernameError()
      }
      if (!newUser.password) {
        this.passwordError()
      }
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
              onChange={this.handleEmailChange('email')}
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
              onChange={this.handleFirstNameChange('firstName')}
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
              onChange={this.handleLastNameChange('lastName')}
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
              onChange={this.handleUsernameChange('username')}
              error={this.state.errorUsername}
              helperText={this.state.helperUsername}
              margin="normal"
            />

            <FormControl required={true} className={classes.textField}>
              <InputLabel htmlFor="adornment-password">Password</InputLabel>
              <Input
                id="standard-password"

                type={this.state.showPassword ? 'text' : 'password'}
                onBlur={this.handlePasswordBlur('password')}
                onChange={this.handlePasswordChange('password')}
                error={this.state.errorPassword}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-label="Toggle password visibility" onClick={this.handleClickShowPassword}>
                      {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText style={{color: 'red'}} id="password-helper-text">{this.state.helperPassword}</FormHelperText>
            </FormControl>

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
