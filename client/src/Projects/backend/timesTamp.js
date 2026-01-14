import React, { useState, useEffect } from 'react';
import AXIOS from '../../redux/services/axios';

const TimesTamp = () => {
    const [ResponseData, setResponseData] = useState({
        unix: '',
        utc: ''
    })

    // useEffect(() => {
    //     AXIOS.get('api/timestamp').then((response) => {
    //         console.log(response.data);
    //         setResponseData(response.data);
    //     })
    // }, [])
    
    return (
        <>
            <div id="timestamp">
                <h2>Timestamp Microservice</h2>
                <div className="container">
                    <section>
                        <h3>Example usage</h3>
                        <ul>
                            {/* <li>[project url]/api/2015-12-25</li>
                            <li>[project url]/api/1451001600000</li> */}
                        </ul>
                    </section>
                    <section>
                        <h3>Example Output</h3>
                        <p>
                            "unix": 1451001600000,
                        </p>
                        <p>
                            "utc": "Fri, 25 Dec 2015 00:00:00 GMT"
                        </p>
                    </section>
                    <section>
                        <h3>Api response</h3>
                        <p>
                            "unix": {ResponseData.unix}
                        </p>
                        <p>
                            "utc": {ResponseData.utc}
                        </p>
                    </section>
                </div>
            </div>
        </>
    );
}

export default TimesTamp;