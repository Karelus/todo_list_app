import React, { Fragment } from "react";
import { Link } from "react-router-dom";
    
const HomePage = () => {

    return (
        <Fragment>
            <div id="container">
                <div id="todo-flex-container">
                    <div id="form-container">
                        <h2 className="app-header">Welcome</h2>
                        <h2 className="app-header">To</h2>
                        <h2 className="app-header">To Do App</h2><br></br>
                        <div className="homepage-flex-container">
                            <Link to="/api/register/"><button className="btn btn-light edit-button">Register</button></Link>
                            <Link to="/api/login/"><button className="btn btn-light edit-button">Login</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default HomePage;