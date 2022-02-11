import React from 'react';

const TimesTamp = () => {
    return (
        <>
            <div id="timestamp">
                <div className="container">
                    <h1>Timestamp Microservice</h1>
                    <section>
                        <h3>example usage</h3>
                        <p>
                            [project url]/api/2015-12-25
                            [project url]/api/1451001600000
                        </p>
                    </section>
                    <section>
                        <h3>Example Output</h3>
                        <p>
                            "unix":1451001600000, "utc":"Fri, 25 Dec 2015 00:00:00 GMT"
                        </p>
                    </section>
                </div>
            </div>
        </>
    );
}

export default TimesTamp;