import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { actionIsAuthenticated } from '../actions/authActions';

export default function Authenticate(ComponentToProtect) {

  return class extends Component {
    state = {
        loading: true,
        redirect: false,
      };

    componentDidMount() {
      actionIsAuthenticated(localStorage.getItem('token'))
        .then(isAuthenticated => {
          isAuthenticated ? this.setState({ loading: false, redirect: false }) : this.setState({ loading: false, redirect: true })
        })
        .catch(err => this.setState({ loading: false, redirect: true }));
    }

    render() {
      const { loading, redirect } = this.state;
      if (loading) return null;
      if (redirect) return <Redirect to="/login" />;
      
      return (
        <React.Fragment>
          <ComponentToProtect {...this.props} />
        </React.Fragment>
      );
    }
  }
}
