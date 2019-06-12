import { Component } from 'react';
import { withRouter } from 'react-router';
import { actionLogout } from '../actions/authActions';

class LogoutPage extends Component {

  componentDidMount() {
    actionLogout()
    this.props.history.push('/')
  }

  render() {
    return null
  }
}

export default withRouter(LogoutPage);