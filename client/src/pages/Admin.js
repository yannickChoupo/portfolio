import React, { useEffect, useState } from "react";
import axios from 'axios';
// import { response } from "express";
const SERVER_Request = axios.create(
    {
        baseURL: `${process.env.NODE_ENV === "production" ?
            'https://yannick-njilo-portfolio.herokuapp.com'
            :
            'http://localhost:5000'}`
    }
);

const Admin = () => {
    const [numberOfVisits, setNumberOfVisits] = useState(0);
    const [todos, setTodos] = useState(0);
    useEffect(() => {
        SERVER_Request.get('/api/todo/getTodos').then(response => {
            setTodos(response.data.todos);
            console.log(response);
        })
    }, [])

    return (
        <>
            <div id="work" className="page">
                <div className="page-container">
                    <h2>Welcome Admin</h2>
                    <div id="summary">
                        <h3>summary</h3>
                        <h4>Number of visits : {numberOfVisits}</h4>
                    </div>
                    <div id="todos">
                        <h3>Todos </h3>
                        {
                            todos && todos.map((todo) => {
                                return <li
                                    id={todo.name}
                                    key={todo.name}>
                                    {todo.description}
                                </li>
                            })
                        }
                        <ul id="todoList">

                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin;