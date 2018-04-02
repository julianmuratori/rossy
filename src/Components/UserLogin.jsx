import React, { Component } from 'react';
import { setToken } from "../lib/tokenService"
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';

class UserLogin extends Component {
    
    state = {
        email: "",
        password: ""
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault()
        const { email, password } = this.state

        axios
            .post("/login", {
                email,
                password
            })
            .then(res=> {
                if (res.status === 200) {
                    const token = res.data.payload

                    setToken(token)
                }
            })
    }
    
    render() {
        return (
            <form action="" className onSubmit={this.handleSubmit}>
                <div>
                    <TextField 
                    placeholder="Enter Email"
                    onChange={this.handleChange}
                    id="login-email"
                    name="email"
                    />
                </div>
                <div>
                    <TextField 
                    placeholder="password"
                    onChange={this.handleChange}
                    id="login-password"
                    name="password"
                    />
                </div>
                <RaisedButton type="submit" label="Login"/>
            </form>
        )
    }
}


export default UserLogin;