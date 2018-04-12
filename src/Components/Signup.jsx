import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import axios from 'axios';



class Signup extends Component {
  state = {
    email: "",
    password: ""
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  
  handleSubmit = e => {
    e.preventDefault();
    // 1. Grab email and password out of state
    const { email, password } = this.state;
    // 2. Post them to our backend
    axios.post("/signup", { email, password }).then(res => {
      if (res.status === 200) {
        const user = res.data.payload;
        // 3. Set the user in state!
        this.props.setUser(user);
      }
    });
  };

  render() {
    return (
      // <form action="">
      //     <input type="text" placeholder="Enter Email"/>
      //     <input type="text" placeholder="password"/>
      // </form>
      <form onSubmit={this.handleSubmit}>
        <TextField
          hintText="Enter your Username"
          floatingLabelText="Username"
          onChange={this.handleChange}
          name="email"
          // onChange={(event, newValue) => this.setState({ username: newValue })}
        />
        <br />
        <TextField
          type="password"
          hintText="Enter your Password"
          floatingLabelText="Password"
          onChange={this.handleChange}
          name="password"
          // onChange={(event, newValue) => this.setState({ password: newValue })}
        />
        <br />
        <RaisedButton
          label="Register Your Account"
          primary={true}
          type="submit"
          // style={style}
          // onClick={(event) => this.handleClick(event)}
        />
      </form>
    );
  }
}


export default Signup;