import React, { useEffect, useState, useRef } from "react";
import AXIOS from '../redux/services/axios';
import {
    CSSTransition
} from "react-transition-group";

import Todo from "../Components/todo";

interface TodoItem {
    id: string;
    name: string;
    description: string;
}

interface AdminProps {
    user?: any;
}

const Admin: React.FC<AdminProps> = ({ }) => {
    const [sessions, setSession] = useState<any[]>([]);
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [isEditing, setEditing] = useState<boolean>(false);
    const [newTodoName, setNewTodoName] = useState<string>('');
    const [newTodoDescription, setNewTodoDescription] = useState<string>('');
    const nameFieldRef = useRef<HTMLInputElement>(null);

    const getTodos = (): void => {
        AXIOS.get('/api/todo/getTodos').then(response => {
            setTodos(response.data.todos);
        });
    }

    useEffect(() => {
        getTodos();
        AXIOS.get('/api/session/all').then((response) => {
            setSession(response.data.sessions);
        })
    }, []);

    const activeEditView = (): void => {
        if (isEditing) {
            return;
        }
        setEditing(true);
    }

    const desactiveEditView = (): void => {
        if (!isEditing) {
            return;
        }
        setEditing(false);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        
        if (newTodoName && newTodoDescription) {
            AXIOS.post('/api/todo/storeTodo',
                {
                    name: newTodoName,
                    description: newTodoDescription
                }).then(() => {
                    getTodos();
                })
            
            setNewTodoName('');
            setNewTodoDescription('');
            desactiveEditView();
        }
    }

    const deleteTask = (id: string): void => {
        AXIOS.post('/api/todo/removeTodo',
            {
                id: id,
            }).then(() => {
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
                            <CSSTransition
                                timeout={500}
                                classNames="edit"
                                in={isEditing} 
                                unmountOnExit>
                                <form className="form" onSubmit={handleSubmit}>
                                    <div className="form-group name">
                                        <label htmlFor="taskName">name</label>
                                        <input 
                                            id="taskName"
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
                                        <input 
                                            id="taskDescription"
                                            className="todo-text"
                                            type="text"
                                            value={newTodoDescription}
                                            onChange={(e) => setNewTodoDescription(e.target.value)}
                                            required={true} />
                                    </div>
                                    <div className="btn-group">
                                        <button 
                                            type="button" 
                                            className="btn todo-cancel"
                                            onClick={desactiveEditView}>
                                            Cancel
                                        </button>
                                        <button 
                                            type="submit"
                                            className="btn btn__primary todo-edit">
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </CSSTransition>
                        </div>
                        <div className="todoList">
                            <ul>
                                {
                                    todos && todos.map((todo) => {
                                        return (
                                            <Todo todo={todo} key={todo.id} deleteTask={deleteTask} />
                                        )
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
