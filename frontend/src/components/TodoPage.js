import React, { Fragment, useState, useEffect } from "react";
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from "array-move";
import { Link, useHistory, Redirect } from "react-router-dom";

const TodoPage = () => {

    let history = useHistory();
    const [inputText, setInputText] = useState("");
    const [todoData, setTodoData] = useState([]);

    // fetching todos from the api
    const getTodos = () => {
      fetch('/api/todo-list/')
      .then(response => response.json())
      .then(data =>
        setTodoData(data))
      .then(console.log(todoData))
    };

    // initializing todoData state when mounting
    useEffect(() => {
      getTodos();
    }, []);

    const handleInputChange = (e) => {
      var content = e.target.value;
      setInputText(content);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      var crsftoken = getCookie('csrftoken')

      if (inputText == "") {
        console.log("Enter some text");
        return;
      } else {
        fetch('api/todo-create/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': crsftoken },
            body: JSON.stringify({
              content: inputText
            }),})
          .then((response) => {
            getTodos()
            setInputText("")
          })
          .catch((error) => {
            console.log('Error:', error)
          })
      }
    };

    const handleDeleteClick = (e) => {
      var id = e.target.id;
      var crsftoken = getCookie('csrftoken')

      fetch(`api/todo-delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': crsftoken },
        })
        .then((response) => {
          getTodos()
          console.log(response.status);
        })
        .catch((error) => {
          console.log('Error:', error)
        })
    };

    const handleCheckBoxChange = (e) => {
      var id = e.target.id;
      var completed = e.target.checked;
      var crsftoken = getCookie('csrftoken');

      fetch(`api/todo-update/${id}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': crsftoken },
          body: JSON.stringify({
            completed: completed
          }),})
        .then((response) => {
          getTodos()
        })
        .catch((error) => {
          console.log('Error:', error)
        })
    };

    const handleEditClick = (id) => {
      var id = id;
      history.push(`/update/${id}`);
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
    };

    const SortableItem = SortableElement(({ value, index }) => (
        <div className="flex-wrapper todo-wrapper" index={index}>
                <div style={{ flex: 1 }}>
                    <input name="completed"
                      type="checkbox"
                      checked={value.completed}
                      onChange={handleCheckBoxChange}
                      id={value.id}
                    />
                </div>
                <div style={{ flex: 7 }}>
                    <span className={`${value.completed ? "completed" : ""}`}>{value.content}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <button className="btn btn-light edit-button" onClick={() => handleEditClick(value.id)}>Edit</button>
                </div>
                <div style={{ flex: 1 }}>
                    <button className="btn btn-danger" onClick={(handleDeleteClick)} id={value.id}>Del</button>
                </div>
            </div>
    ));

    const SortableList = SortableContainer(({ items }) => {
        return (
            <div id="list-wrapper">
                {items
                .sort((a, b) => a.position - b.position)
                .map((value, index) => {
                  return(
                    <SortableItem value={value} index={index} key={`item-${value.id}`} />
                  )
                })}
            </div>
        );
    });

    const onSortEnd = ({ oldIndex, newIndex }) => {
        let arr = arrayMove(todoData, oldIndex, newIndex)
        for (let i = 0; i < arr.length; i++) {
            arr[i].position = i;
        }
        setTodoData(arr);
    };

  return (
    <Fragment>
      <div id="container">
        <div id="todo-flex-container">

          <div id="form-container">
            <h2 className="app-header">To Do App</h2><br></br>
            <form onSubmit={handleSubmit} id="form">
              <div className="flex-wrapper">
                <div style={{ flex: 6 }}>
                  <input type="text" name="content"
                    className="form-control"
                    placeholder="Enter a Todo"
                    value={inputText}
                    onChange={handleInputChange}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <input type="submit" value="Add" name="Add" className="btn btn-outline-light button" />
                </div>
              </div>
            </form>
          </div>

          <div className="task-header-container">
            <h4 className="task-header">Task List</h4>
            <p className="task-count">{`${todoData.length} Tasks`}</p>
          </div>
          <SortableList items={todoData} onSortEnd={onSortEnd} axis="y" />
        </div>
      </div>
    </Fragment>
  );
};

export default TodoPage;
