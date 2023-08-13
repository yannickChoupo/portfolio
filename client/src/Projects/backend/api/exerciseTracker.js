import React, { useState, useEffect } from 'react';
import AXIOS from '../../../redux/services/axios';
// import AXIOS from '../../redux/services/axios';

const ExerciseTracker = () => {
    const [curExercise, setCurExercise] = useState({
        uid: '',
        description: '',
        duration: '',
        date: ''
    });
    const [ResponseData, setResponseData] = useState({
        unix: '',
        utc: ''
    })
    useEffect(() => {
        // getTimeStamp(value)
    }, [])

    const [username, setUsername] = useState('');

    const handleCreateUSerSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        AXIOS.post('/api/exercise/users', formData).then((response) => {
            console.log(response.data.id);
            setResponseData(response.data);
            setCurExercise({ ...curExercise, uid: response.data.id })
        })
    }

    const handleAddExerciseSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        console.log(curExercise.uid);
        formData.append("data", curExercise);
        if (curExercise.uid) {
            AXIOS.post(`/api/exercise/users/${curExercise.uid}/exercises`, curExercise).then((response) => {
                console.log(response.data);
                setResponseData(response.data);
            })
        } else {
            console.log("create first a user id");
        }
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handleExerciseChange = (e) => {
        curExercise[e.target.id] = e.target.value;
        setCurExercise({ ...curExercise })
        console.log(curExercise);
    }

    return (
        <>
            <div id="excerciseTacker">
                <h3>Exercise Tracker Microservice</h3>
                <div className='body'>
                    <div className='forms'>
                        <form action="/api/users" method="post" onSubmit={handleCreateUSerSubmit}>
                            <h3>Create a New User</h3>
                            <p><code>POST /api/users</code></p>
                            <input id="uname" type="text" name="username" placeholder="username" onChange={handleUsernameChange} />
                            <input type="submit" value="Submit" />
                        </form>
                        <form id="exercise-form" method="post" onSubmit={handleAddExerciseSubmit}>
                            <h3>Add exercises</h3>
                            <p><code>POST /api/users/:_id/exercises</code></p>
                            <input id="uid" type="text" name=":_id" placeholder=":_id" onChange={handleExerciseChange} />
                            <input id="description" type="text" name="description" placeholder="description*" onChange={handleExerciseChange} />
                            <input id="duration" type="text" name="duration" placeholder="duration* (mins.)" onChange={handleExerciseChange} />
                            <input id="date" type="text" name="date" placeholder="date (yyyy-mm-dd)" onChange={handleExerciseChange} />
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                    <div>
                        <p>
                            <strong>GET user's exercise log: </strong>
                            <code>GET /api/users/:_id/logs?[from][&amp;to][&amp;limit]</code>
                        </p>
                        <p><strong>[ ]</strong> = optional</p>
                        <p><strong>from, to</strong> = dates (yyyy-mm-dd); <strong>limit</strong> = number</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ExerciseTracker;