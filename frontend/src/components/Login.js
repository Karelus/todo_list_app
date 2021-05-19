import React, { Fragment, useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
    
const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    let history = useHistory();

    const getCookie = (name) => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
      };

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
        let url = '/api/login/'
        var crsftoken = getCookie('csrftoken')

        fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': crsftoken },
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

        history.push('/todos');
    }

    return (
        <Fragment>
            <div id="container">
                <div id="todo-flex-container">
                    <div id="form-container">
                        <h2 className="app-header">Login</h2><br></br>
                        <form id="login-form" onSubmit={handleSubmit}>
                            <div className="login-flex-wrapper">
                                <div style={{ flex: "100%" }}>
                                    <input 
                                        type="text" 
                                        name="username"
                                        autoFocus                                
                                        className="form-control login-field"
                                        placeholder="Enter Username"
                                        value={username}
                                        onChange={handleUsernameChange}
                                        required
                                    />
                                </div>
                                    <div style={{ flex: "100%" }}>
                                    <input type="password" name="password"
                                            className="form-control login-field"
                                            placeholder="Enter Password"
                                            required
                                            value={password}
                                            onChange={handlePasswordChange}
                                    />
                                </div>
                                <div className="login-button-container">
                                    <input type="submit" value="Login" name="Login" 
                                    className="btn btn-outline-light login-button" />
                                    <span className="register-text">
                                        Don't have an account?  
                                        <Link style={{color:"yellow"}} to="/register"> Register
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

export default Login;