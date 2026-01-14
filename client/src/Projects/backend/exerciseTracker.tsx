import React, { useState, useEffect } from 'react';
import AXIOS from '../../redux/services/axios';

interface User {
    username: string;
    _id: string;
}

interface Exercise {
    description: string;
    duration: number;
    date: string;
}

interface ExerciseLog {
    username: string;
    count?: number;
    _id: string;
    log: Exercise[];
    __v?: number;
}

const ExerciseTracker: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [username, setUsername] = useState<string>('');
    const [selectedUserId, setSelectedUserId] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [duration, setDuration] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [responseData, setResponseData] = useState<any>(null);
    const [logs, setLogs] = useState<ExerciseLog | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        AXIOS.get('/api/excercise/users')
            .then((response) => {
                console.log('Users:', response.data);
                setUsers(response.data);
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
            });
    };

    const handleCreateUser = (e: React.FormEvent) => {
        e.preventDefault();
        if (username.trim()) {
            setLoading(true);
            AXIOS.post('/api/excercise/users', { username })
                .then((response) => {
                    console.log(response.data);
                    setResponseData(response.data);
                    setUsername('');
                    fetchUsers(); // Refresh user list
                })
                .catch((error) => {
                    console.error('Error creating user:', error);
                    setResponseData({ error: 'Failed to create user' });
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    const handleAddExercise = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Selected User ID:', selectedUserId, description, duration);
        const durationValue = !duration ? "30" : duration;
        if (selectedUserId && description && durationValue) {
            setLoading(true);
            const exerciseData: any = {
                description,
                duration: parseInt(durationValue, 10),
            };

            if (date) {
                exerciseData.date = date;
            }

            console.log('Selected User ID:', selectedUserId, date, exerciseData);


            AXIOS.post(`/api/excercise/users/${selectedUserId}/exercises`, exerciseData)
                .then((response) => {
                    console.log(response.data);
                    setResponseData(response.data);
                    setDescription('');
                    setDuration('');
                    setDate('');
                })
                .catch((error) => {
                    console.error('Error adding exercise:', error);
                    setResponseData({ error: 'Failed to add exercise' });
                })
                .finally(() => {
                    setLoading(false);
                });
        };
    }

    const handleGetLogs = (userId: string) => {
        setLoading(true);
        AXIOS.get(`/api/excercise/users/${userId}/logs`)
            .then((response) => {
                console.log('Logs:', response.data);
                setLogs(response.data);
            })
            .catch((error) => {
                console.error('Error fetching logs:', error);
                setLogs(null);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <>
            <div id="exercise-tracker">
                <div className="container">
                    <header>
                        <h1>Exercise Tracker Microservice</h1>
                        <p className="subtitle">Track Your Exercises</p>
                    </header>

                    <section className="about">
                        <h2>About</h2>
                        <p>
                            This is an Exercise Tracker Microservice challenge for the freeCodeCamp API and Microservices certification.
                            Create users, add exercises, and retrieve exercise logs.
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
                                    <td><code>POST /api/excercise/users</code></td>
                                    <td>POST</td>
                                    <td>Create a new user</td>
                                </tr>
                                <tr>
                                    <td><code>GET /api/excercise/users</code></td>
                                    <td>GET</td>
                                    <td>Get all users</td>
                                </tr>
                                <tr>
                                    <td><code>POST /api/excercise/users/:id/exercises</code></td>
                                    <td>POST</td>
                                    <td>Add an exercise for a user</td>
                                </tr>
                                <tr>
                                    <td><code>GET /api/excercise/users/:id/logs</code></td>
                                    <td>GET</td>
                                    <td>Get exercise logs for a user</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                    <section className="try-it">
                        <h2>Create New User</h2>
                        <form onSubmit={handleCreateUser}>
                            <div className="form-group">
                                <label htmlFor="usernameInput">Username:</label>
                                <input
                                    type="text"
                                    id="usernameInput"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter username"
                                />
                                <button type="submit" disabled={loading}>
                                    {loading ? 'Creating...' : 'Create User'}
                                </button>
                            </div>
                        </form>
                    </section>

                    <section className="users-list">
                        <h2>Users ({users.length})</h2>
                        {users.length > 0 ? (
                            <div className="user-cards">
                                {users.map((user) => (
                                    <div key={user._id} className="user-card">
                                        <p><strong>{user.username}</strong></p>
                                        <p className="user-id">ID: {user._id}</p>
                                        <button onClick={() => handleGetLogs(user._id)}>
                                            View Logs
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No users yet. Create one above!</p>
                        )}
                    </section>

                    <section className="try-it">
                        <h2>Add Exercise</h2>
                        <form onSubmit={handleAddExercise}>
                            <div className="form-group">
                                <label htmlFor="userSelect">Select User:</label>
                                <select
                                    id="userSelect"
                                    value={selectedUserId}
                                    onChange={(e) => setSelectedUserId(e.target.value)}
                                >
                                    <option value="">-- Select a user --</option>
                                    {users.map((user) => (
                                        <option key={user._id} value={user._id}>
                                            {user.username}
                                        </option>
                                    ))}
                                </select>

                                <label htmlFor="descriptionInput">Description:</label>
                                <input
                                    type="text"
                                    id="descriptionInput"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="e.g., Running"
                                />

                                <label htmlFor="durationInput">Duration (minutes):</label>
                                <input
                                    type="number"
                                    id="durationInput"
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                    placeholder="30"
                                />

                                <label htmlFor="dateInput">Date (optional):</label>
                                <input
                                    type="date"
                                    id="dateInput"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />

                                <button type="submit" disabled={loading || !selectedUserId}>
                                    {loading ? 'Adding...' : 'Add Exercise'}
                                </button>
                            </div>
                        </form>
                    </section>

                    {responseData && (
                        <section className="api-response">
                            <h2>Last Action Response</h2>
                            {responseData.error ? (
                                <div className="error">
                                    <pre>
                                        <code>{JSON.stringify(responseData, null, 2)}</code>
                                    </pre>
                                </div>
                            ) : (
                                <pre>
                                    <code>{JSON.stringify(responseData, null, 2)}</code>
                                </pre>
                            )}
                        </section>
                    )}

                    {logs && (
                        <section className="exercise-logs">
                            <h2>Exercise Logs for {logs.username}</h2>
                            <p><strong>Total Exercises:</strong> {logs.count || logs.log.length}</p>
                            {logs.log && logs.log.length > 0 ? (
                                <div className="log-list">
                                    {logs.log.map((exercise, index) => (
                                        <div key={index} className="log-item">
                                            <p><strong>{exercise.description}</strong></p>
                                            <p>Duration: {exercise.duration} minutes</p>
                                            <p>Date: {new Date(exercise.date).toDateString()}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>No exercises logged yet.</p>
                            )}
                        </section>
                    )}

                    <section className="feedback">
                        <p>
                            This project is part of the <strong>freeCodeCamp Backend Development and APIs</strong> certification.
                        </p>
                    </section>
                </div>
            </div>
        </>
    );
};

export default ExerciseTracker;
