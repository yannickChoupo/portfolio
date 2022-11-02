import React, { useEffect, useState, useRef } from "react";
import AXIOS from '../redux/services/axios';
import {
    CSSTransition
} from "react-transition-group";

import Todo from "../Components/todo";


// function usePrevious(value) {
//     // The ref object is a generic container whose current property is mutable ...
//     // ... and can hold any value, similar to an instance property on a class
//     const ref = useRef();
//     // Store current value in ref
//     useEffect(() => {
//         ref.current = value;
//     }, [value]); // Only re-run if value changes
//     // Return previous value (happens before update in useEffect above)
//     return ref.current;
// }

const Admin = ({ user }) => {
    const [sessions, setSession] = useState(0);
    const [todos, setTodos] = useState(0);

    const [isEditing, setEditing] = useState(false);
    // const prevEdetingState = usePrevious(isEditing);


    const [newTodoName, setNewTodoName] = useState('');
    const [newTodoDescription, setNewTodoDescription] = useState('');


    const nameFieldRef = useRef(null);

    const getTodos = () => {
        AXIOS.get('/api/todo/getTodos').then(response => {
            setTodos(response.data.todos);
            console.log(response.data.todos)
        });
    }
    useEffect(() => {
        getTodos();
        AXIOS.get('/api/session/all').then((response) => {
            setSession(response.data.sessions);
        })
    }, []);

    const activeEditView = () => {
        if (isEditing) {
            return;
        }
        setEditing(true);
    }

    const desactiveEditView = () => {
        if (!isEditing) {
            return;
        }
        setEditing(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('newTodoName : ', newTodoName)
        console.log("newTodoDescription : ", newTodoDescription);
        // Add the todo to the database 
        // depending on response close edit view
        // 2 todos can't have the same name
        if (newTodoName && newTodoDescription) {
            AXIOS.post('/api/todo/storeTodo',
                {
                    name: newTodoName,
                    description: newTodoDescription
                }).then((response) => {
                    getTodos();
                })
            // CLeanup
            setNewTodoName('');
            setNewTodoDescription('');
            desactiveEditView();
        }

    }
    // const handleChange = (e) => {
    //     console.log("set new task name");
    // }
    const deleteTask = (id) => {
        AXIOS.post('/api/todo/removeTodo',
            {
                id: id,
            }).then((response) => {
                getTodos();
            })
    }
    return (
        <>
            <div id="admin" className="page">
                <div className="page-container">
                    <h2>Welcome Admin</h2>
                    <div id="summary">
                        <h3>summary</h3>
                        <ul>
                            <li>Number of visits : {sessions.length}</li>
                        </ul>
                    </div>
                    <div id="todos">
                        <div className="todos">
                            <div className="header">
                                <h3>Todos </h3>
                                <button onClick={activeEditView}>Add</button>
                            </div>
                            {/* { */}
                            {/* isEditing && */}
                            <CSSTransition
                                timeout={500}
                                classNames="edit"
                                in={isEditing} unmountOnExit>
                                <form className="form" onSubmit={handleSubmit}>
                                    <div className="form-group name">
                                        <label htmlFor="taskName">name</label>
                                        <input id="taskName"
                                            className="todo-text"
                                            type="text"
                                            value={newTodoName}
                                            onChange={(e) => setNewTodoName(e.target.value)}
                                            ref={nameFieldRef}
                                            required={true}
                                            autoFocus />

                                    </div>
                                    <div className="form-group description">
                                        <label htmlFor="taskDescription">description</label>
                                        <input id="taskDescription"
                                            className="todo-text"
                                            type="text"
                                            value={newTodoDescription}
                                            onChange={(e) => setNewTodoDescription(e.target.value)}
                                            required={true} />
                                    </div>
                                    <div className="btn-group">
                                        <button type="button" className="btn todo-cancel"
                                            onClick={desactiveEditView}>
                                            Cancel
                                            {/* <span className="visually-hidden">renaming {props.name}</span> */}
                                        </button>
                                        <button type="submit"
                                            className="btn btn__primary todo-edit"
                                        // onClick={handleTodoSave}
                                        >
                                            Save
                                            {/* <span className="visually-hidden">new name for {props.name}</span> */}
                                        </button>
                                    </div>
                                </form>
                            </CSSTransition>
                            {/* } */}
                        </div>
                        <div className="todoList">
                            <ul>
                                {
                                    todos && todos.map((todo) => {
                                        return (
                                            < Todo todo={todo} key={todo.id} deleteTask={deleteTask} />
                                        )
                                        // return <li
                                        //     id={todo.name}
                                        //     key={todo.name}>
                                        //     {todo.description}
                                        // </li>
                                    })
                                }
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin;