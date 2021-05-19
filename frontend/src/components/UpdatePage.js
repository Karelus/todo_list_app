import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
    
const UpdatePage = (props) => {

    let history = useHistory();
    var id = props.match.params.id;
    const [inputText, setInputText] = useState("");

    const fetchData = () => {
        let url = `/api/todo-single/${id}`;

        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            setInputText(data.content);
        });
    };

    useEffect(() => {
        fetchData();
    }, []);   

    const handleSubmit = (e) => {
        e.preventDefault();
        let url = `/api/todo-update/${id}/`;
        var crsftoken = getCookie('csrftoken')
        
        fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': crsftoken },
              'body': JSON.stringify({
                  content: inputText
              }),})
              .then((response) => {
                if (response.status == 200) {
                    history.push('/todos');
                }
              })
              .catch((error) => {
                  console.log('Error:', error)
              });
    };

    const handleInputChange = (e) => {
        var content = e.target.value;
        setInputText(content);
      };

    const handleCancelButton = () => {
        history.push("/todos");
    };

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
      }

    return (
        <Fragment>
            <div id="container">
                <div id="todo-flex-container">

                    <div id="form-container">
                        <h2 className="app-header">Edit Task</h2><br></br>
                        <form id="update-form" onSubmit={handleSubmit}>
                            <div className="flex-wrapper">
                                <div style={{ flex: 6 }}>
                                    <input type="text" name="update-content"
                                        className="form-control"
                                        placeholder="Enter a Todo"
                                        value={inputText}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <input type="submit" value="Save" name="Update" className="btn btn-outline-light button" />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <button className="btn btn-danger cancel-button" onClick={handleCancelButton}>Cancel</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    
                </div>
            </div>
        </Fragment>
    )
}

export default UpdatePage;