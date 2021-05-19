import React, { Fragment, useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
    
const Register = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = (e) => {
        var username = e.target.value;
        setUsername(username);
    };

    const handlePasswordChange = (e) => {
        var password = e.target.value;
        setPassword(password);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username);
        console.log(password);
        let url = '/api/create-user/'

        fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'},
              body: JSON.stringify({
                username: username,
                password: password
              }),})
            .then((response) => {
              console.log(response.status);
            })
            .catch((error) => {
              console.log('Error:', error);
            });
    };
 
    return (
        <Fragment>
            <div id="container">
                <div id="todo-flex-container">
                    <div id="form-container">
                        <h2 className="app-header">Create User</h2><br></br>

                        <form id="login-form" onSubmit={handleSubmit}>
                            <div className="login-flex-wrapper">
                                <div style={{ flex: "100%" }}>
                                    <input 
                                        type="text" 
                                        name="username"
                                        autoFocus                                
                                        className="form-control login-field"
                                        placeholder="Username"
                                        value={username}
                                        onChange={handleUsernameChange}
                                        required
                                    />
                                </div>
                                <div style={{ flex: "100%" }}>
                                <input type="password" name="password"
                                        className="form-control login-field"
                                        placeholder="Password"
                                        required
                                        value={password}
                                        onChange={handlePasswordChange}
                                    />
                                </div>
                                <div className="login-button-container">
                                    <input type="submit" value="Register" name="Login" 
                                    className="btn btn-outline-light login-button" />
                                    <span className="register-text">
                                        Already an user?  
                                        <Link style={{color:"yellow"}} to="/login"> Login
                                        </Link>
                                    </span>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Register;