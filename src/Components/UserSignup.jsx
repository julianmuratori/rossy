import React, { Component } from "react"
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { TextArea } from "bloomer/lib/elements/Form/TextArea"

import axios from 'axios'

class UserSignup extends Component {
    state = {
        email: "",
        password: ""
    };
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
    handleSubmit = e => {
        e.preventDefault();

        // GRAB MAIL AND PASSWORD OUT OF STATE
        const { email, password } = this.state;

        // POST THEM TO BACKEND
        axios
            .post("/user", {
                email,
                password
            })
            .then(res => {
                if (res.status === 200) {
                    const user = res.data.payload
                    
                    // SET THE USER IN STATE
                    this.props.setUser(user);
                }
            })
        console.log("submitted!");
    };
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <TextField
                        placeholder="Email"
                        onChange={this.handleChange}
                        type="email"
                        id="email"
                        name="email"
                    />
                </div>
                <div>
                    <TextField 
                        placeholder="Create Password"
                        type="password"
                        onChange={this.handleChange}
                        name="password"
                        id="password"
                    />
                </div>
                <div>
                    <RaisedButton type="submit" value="Signup" label="Sign Up"/>
                </div>
            </form>
        );
    }
}

export default UserSignup;