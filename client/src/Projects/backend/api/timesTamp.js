import React, { useState, useEffect } from 'react';
import AXIOS from '../../../redux/services/axios';
// import AXIOS from '../../redux/services/axios';

const TimesTamp = () => {
    const [ResponseData, setResponseData] = useState({
        unix: '',
        utc: ''
    })
    useEffect(() => {
        getTimeStamp(value)
    }, [])

    const getTimeStamp = (urlParam) => {
        AXIOS.get(`api/timestamp?${urlParam}`).then((response) => {
            console.log(response.data);
            setResponseData(response.data);
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        getTimeStamp(value);
    }

    const [value, setValue] = useState('')

    const handleChange = (e) => {
        // TODO check if valid input
        console.log("handle changes....");
        setValue(e.target.value)
    }

    return (
        <>
            <div id="timestamp">
                <h2>Timestamp Microservice</h2>
                <div className="container">
                    <section id='example-usage'>
                        <h3>Example usage</h3>
                        <div className='body'>
                            <div onSubmit={handleSubmit} className='form' id='request'>
                                <textarea value={value} onChange={handleChange} className='text-area' />
                                <div type="submit" className='submit' onClick={handleSubmit}>
                                    <i class="fa-regular fa-paper-plane" />
                                </div>
                            </div>
                            <div id='response'>
                                <h3>
                                    Response
                                </h3>
                                <code >
                                    {JSON.stringify(ResponseData)}
                                </code>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

export default TimesTamp;