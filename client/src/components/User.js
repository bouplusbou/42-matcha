import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class User extends Component {
  constructor(props) {
      super(props)
      this.state = {
          id_user: this.props.match.params.id,
          user: [],
      }
  }

  componentDidMount() {
        axios.get(`/users/${this.state.id_user}`)
        .then(res => {
          const user = res.data.data[0];
          this.setState({ user });
        })
    }

  render() {
    let user = this.state.user
      return (
        <div>
          <h2>{user.username}</h2>
          <Link to='/users'>Back</Link>
        </div>
      );
  }
}


export default User
