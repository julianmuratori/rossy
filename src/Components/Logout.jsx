import React from "react";
import { removeToken } from '../Services/tokenService'

const Logout = props => {
    const logout = () => {
        // 1. Remove the user's token from local storage.
        removeToken();
        // 2. Set the user in state to be equal to null.
        props.setUser(null);
    };
    return <button onClick={logout}>Logout</button>;
};

export default Logout;