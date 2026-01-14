import React, { useState, useEffect } from 'react';
import AXIOS from '../../redux/services/axios';

interface Todo {
    _id: string;
    id: string;
    name: string;
    description: string;
    completed: boolean;
}

interface ApiResponse {
    success: boolean;
    message: string;
    todos?: Todo[];
    todo?: Todo;
    remainingTodo?: any;
}

const TodoManager: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editName, setEditName] = useState<string>('');
    const [editDescription, setEditDescription] = useState<string>('');
    const [editCompleted, setEditCompleted] = useState<boolean>(false);
    const [responseData, setResponseData] = useState<ApiResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = () => {
        AXIOS.get('/api/todo/getTodos')
            .then((response) => {
                console.log('Todos:', response.data);
                if (response.data.success && response.data.todos) {
                    setTodos(response.data.todos);
                }
            })
            .catch((error) => {
                console.error('Error fetching todos:', error);
            });
    };

    const handleCreateTodo = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim() && description.trim()) {
            setLoading(true);
            AXIOS.post('/api/todo/storeTodo', { name, description })
                .then((response) => {
                    console.log(response.data);
                    setResponseData(response.data);
                    if (response.data.success) {
                        setName('');
                        setDescription('');
                        fetchTodos(); // Refresh todo list
                    }
                })
                .catch((error) => {
                    console.error('Error creating todo:', error);
                    setResponseData({ success: false, message: 'Failed to create todo' });
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    const handleUpdateTodo = (id: string) => {
        if (editName.trim() && editDescription.trim()) {
            setLoading(true);
            AXIOS.post('/api/todo/updateTodo', { id, name: editName, description: editDescription, completed: editCompleted })
                .then((response) => {
                    console.log(response.data);
                    setResponseData(response.data);
                    if (response.data.success) {
                        setEditingId(null);
                        setEditName('');
                        setEditDescription('');
                        fetchTodos(); // Refresh todo list
                    }
                })
                .catch((error) => {
                    console.error('Error updating todo:', error);
                    setResponseData({ success: false, message: 'Failed to update todo' });
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    const handleToggleComplete = (todo: Todo) => {
        setLoading(true);
        AXIOS.post('/api/todo/updateTodo', {
            id: todo.id,
            name: todo.name,
            description: todo.description,
            completed: !todo.completed
        })
            .then((response) => {
                console.log(response.data);
                setResponseData(response.data);
                if (response.data.success) {
                    fetchTodos(); // Refresh todo list
                }
            })
            .catch((error) => {
                console.error('Error toggling todo:', error);
                setResponseData({ success: false, message: 'Failed to toggle todo status' });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleDeleteTodo = (id: string) => {
        if (window.confirm('Are you sure you want to delete this todo?')) {
            setLoading(true);
            AXIOS.post('/api/todo/removeTodo', { id })
                .then((response) => {
                    console.log(response.data);
                    setResponseData(response.data);
                    if (response.data.success) {
                        fetchTodos(); // Refresh todo list
                    }
                })
                .catch((error) => {
                    console.error('Error deleting todo:', error);
                    setResponseData({ success: false, message: 'Failed to delete todo' });
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    const startEdit = (todo: Todo) => {
        setEditingId(todo.id);
        setEditName(todo.name);
        setEditDescription(todo.description);
        setEditCompleted(todo.completed);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditName('');
        setEditDescription('');
        setEditCompleted(false);
    };

    return (
        <>
            <div id="todo-manager">
                <div className="container">
                    <header>
                        <h1>Todo Manager Microservice</h1>
                        <p className="subtitle">Manage Your Tasks</p>
                    </header>

                    <section className="about">
                        <h2>About</h2>
                        <p>
                            A Todo Manager API that allows you to create, read, update, and delete tasks.
                            Full CRUD functionality with MongoDB storage.
                        </p>
                    </section>

                    <section className="endpoints">
                        <h2>Endpoints</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Endpoint</th>
                                    <th>Method</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><code>GET /api/todo/getTodos</code></td>
                                    <td>GET</td>
                                    <td>Get all todos</td>
                                </tr>
                                <tr>
                                    <td><code>POST /api/todo/storeTodo</code></td>
                                    <td>POST</td>
                                    <td>Create a new todo</td>
                                </tr>
                                <tr>
                                    <td><code>POST /api/todo/updateTodo</code></td>
                                    <td>POST</td>
                                    <td>Update an existing todo</td>
                                </tr>
                                <tr>
                                    <td><code>POST /api/todo/removeTodo</code></td>
                                    <td>POST</td>
                                    <td>Delete a todo</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                    <section className="try-it">
                        <h2>Create New Todo</h2>
                        <form onSubmit={handleCreateTodo}>
                            <div className="form-group">
                                <label htmlFor="nameInput">Task Name:</label>
                                <input
                                    type="text"
                                    id="nameInput"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter task name"
                                    required
                                />

                                <label htmlFor="descriptionInput">Description:</label>
                                <textarea
                                    id="descriptionInput"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="What needs to be done?"
                                    rows={3}
                                    required
                                />

                                <button type="submit" disabled={loading}>
                                    {loading ? 'Creating...' : 'Create Todo'}
                                </button>
                            </div>
                        </form>
                    </section>

                    {responseData && (
                        <section className="api-response">
                            <h2>Last Action Response</h2>
                            <div className={responseData.success ? 'success' : 'error'}>
                                <pre>
                                    <code>{JSON.stringify(responseData, null, 2)}</code>
                                </pre>
                            </div>
                        </section>
                    )}

                    <section className="todos-list">
                        <h2>All Todos ({todos.length})</h2>
                        {todos.length > 0 ? (
                            <div className="todo-cards">
                                {todos.map((todo) => (
                                    <div key={todo._id} className="todo-card">
                                        {editingId === todo.id ? (
                                            <div className="edit-form">
                                                <input
                                                    type="text"
                                                    value={editName}
                                                    onChange={(e) => setEditName(e.target.value)}
                                                    placeholder="Task name"
                                                />
                                                <textarea
                                                    value={editDescription}
                                                    onChange={(e) => setEditDescription(e.target.value)}
                                                    placeholder="Description"
                                                    rows={3}
                                                />
                                                <div className="toggle-group">
                                                    <label className="toggle-label">
                                                        <input
                                                            type="checkbox"
                                                            checked={editCompleted}
                                                            onChange={(e) => setEditCompleted(e.target.checked)}
                                                        />
                                                        <span>Mark as completed</span>
                                                    </label>
                                                </div>
                                                <div className="button-group">
                                                    <button
                                                        className="save-btn"
                                                        onClick={() => handleUpdateTodo(todo.id)}
                                                        disabled={loading}
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        className="cancel-btn"
                                                        onClick={cancelEdit}
                                                        disabled={loading}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="todo-header">
                                                    <h3>{todo.name}</h3>
                                                    <span
                                                        className={`status ${todo.completed ? 'completed' : 'pending'}`}
                                                        onClick={() => handleToggleComplete(todo)}
                                                        style={{ cursor: 'pointer' }}
                                                        title="Click to toggle status"
                                                    >
                                                        {todo.completed ? '✓ Completed' : '○ Pending'}
                                                    </span>
                                                </div>
                                                <p className="todo-description">{todo.description}</p>
                                                <p className="todo-id">ID: {todo.id}</p>
                                                <div className="button-group">
                                                    <button
                                                        className="edit-btn"
                                                        onClick={() => startEdit(todo)}
                                                        disabled={loading}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="delete-btn"
                                                        onClick={() => handleDeleteTodo(todo.id)}
                                                        disabled={loading}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No todos yet. Create one above!</p>
                        )}
                    </section>

                    <section className="example-output">
                        <h2>Example Output</h2>
                        <pre>
                            <code>
                                {`{
  "success": true,
  "message": "todo succesfull added",
  "todo": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Complete project",
    "description": "Finish the portfolio project",
    "completed": false,
    "id": "507f1f77bcf86cd799439011"
  }
}`}
                            </code>
                        </pre>
                    </section>

                    <section className="feedback">
                        <p>
                            This is a custom Todo Manager API with full CRUD operations.
                        </p>
                    </section>
                </div>
            </div>
        </>
    );
};

export default TodoManager;
