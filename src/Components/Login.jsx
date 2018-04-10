import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

// import axios from 'axios';

class Login extends Component {
    render() {
        return (
            // <form action="">
            //     <input type="text" placeholder="Enter Email"/>
            //     <input type="text" placeholder="password"/>
            // </form>
            <form>
                <TextField
                    hintText="Enter your Username"
                    floatingLabelText="Username"
                    // onChange={(event, newValue) => this.setState({ username: newValue })}
                />
                <br />
                <TextField
                    type="password"
                    hintText="Enter your Password"
                    floatingLabelText="Password"
                    // onChange={(event, newValue) => this.setState({ password: newValue })}
                />
                <br />
                <RaisedButton label="Submit" primary={true} 
                // style={style} 
                // onClick={(event) => this.handleClick(event)}
                 />
            </form>
        )
    }
}


export default Login;