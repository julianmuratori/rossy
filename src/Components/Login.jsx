import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { setToken } from '../Services/tokenService'

import axios from 'axios';

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    axios
        // 1. POST to /auth/login, passing in the email and password in the body      
        .post("/login", {
            email,
            password
        })
        .then(res => {
          if (res.status === 200) {
            // 2. If we receive a successful response:
            //  - grab the token from the response
            const token = res.data.payload;
            //  - store it in local storage
            setToken(token);
            this.props.getCurrentUser()
          }
            console.log(res.data);
        });
    };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          hintText="Enter your Username"
          floatingLabelText="Username"
          name="email"
          onChange={this.handleChange}
        />
        <br />
        <TextField
          type="password"
          hintText="Enter your Password"
          name="password"
          floatingLabelText="Password"
          onChange={this.handleChange}
        />
        <br />
        <RaisedButton label="Submit" type="submit" primary={true} />
      </form>
    );
  }
}


export default Login;