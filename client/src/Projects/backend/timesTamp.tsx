import React, { useState, useEffect } from 'react';
import AXIOS from '../../redux/services/axios';

interface TimestampResponse {
    unix: number | string;
    utc: string;
    error?: string;
}

const TimesTamp: React.FC = () => {
    const [responseData, setResponseData] = useState<TimestampResponse>({
        unix: '',
        utc: ''
    });
    const [inputDate, setInputDate] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const fetchCurrentTimestamp = () => {
        setLoading(true);
        AXIOS.get('/api/timestamp')
            .then((response) => {
                console.log(response.data);
                setResponseData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching timestamp:', error);
                setResponseData({ unix: '', utc: '', error: 'Failed to fetch timestamp' });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const fetchCustomTimestamp = (dateParam: string) => {
        setLoading(true);
        AXIOS.get(`/api/timestamp/${dateParam}`)
            .then((response) => {
                console.log(response.data);
                setResponseData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching timestamp:', error);
                setResponseData({ unix: '', utc: '', error: 'Invalid Date' });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputDate.trim()) {
            fetchCustomTimestamp(inputDate);
        }
    };

    useEffect(() => {
        fetchCurrentTimestamp();
    }, []);

    return (
        <>
            <div id="timestamp">
                <div className="container">
                    <header>
                        <h1>Timestamp Microservice</h1>
                        <p className="subtitle">Simple API Project</p>
                    </header>

                    <section className="about">
                        <h2>About</h2>
                        <p>
                            This is a Timestamp Microservice challenge for the freeCodeCamp API and Microservices certification.
                            The API converts dates between Unix timestamp and UTC ISO-8601 formats.
                        </p>
                    </section>

                    <section className="endpoints">
                        <h2>Endpoints</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Endpoint</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><code>GET /api/timestamp</code></td>
                                    <td>Return a date object with unix timestamp and UTC timestamp of the current timestamp</td>
                                </tr>
                                <tr>
                                    <td><code>GET /api/timestamp/&#123;dateParam&#125;</code></td>
                                    <td>Return a date object of the informed timestamp (unix or UTC ISO-8601)</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                    <section className="usage">
                        <h2>Example Usage</h2>
                        <ul>
                            <li><code>/api/timestamp</code></li>
                            <li><code>/api/timestamp/2015-12-25</code></li>
                            <li><code>/api/timestamp/1451001600000</code></li>
                        </ul>
                    </section>

                    <section className="example-output">
                        <h2>Example Output</h2>
                        <pre>
                            <code>
                                {`{"unix": 1451001600000, "utc": "Fri, 25 Dec 2015 00:00:00 GMT"}`}
                            </code>
                        </pre>
                        <p className="error-example">Error response:</p>
                        <pre>
                            <code>
                                {`{"error": "Invalid Date"}`}
                            </code>
                        </pre>
                    </section>

                    <section className="try-it">
                        <h2>Try It Out</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="dateInput">Enter a date (YYYY-MM-DD or unix timestamp):</label>
                                <input
                                    type="text"
                                    id="dateInput"
                                    value={inputDate}
                                    onChange={(e) => setInputDate(e.target.value)}
                                    placeholder="e.g., 2015-12-25 or 1451001600000"
                                />
                                <button type="submit" disabled={loading}>
                                    {loading ? 'Loading...' : 'Get Timestamp'}
                                </button>
                            </div>
                        </form>
                        <button onClick={fetchCurrentTimestamp} disabled={loading}>
                            Get Current Timestamp
                        </button>
                    </section>

                    <section className="api-response">
                        <h2>API Response</h2>
                        {responseData.error ? (
                            <div className="error">
                                <pre>
                                    <code>
                                        {`{"error": "${responseData.error}"}`}
                                    </code>
                                </pre>
                            </div>
                        ) : (
                            <pre>
                                <code>
                                    {responseData.unix && responseData.utc
                                        ? `{"unix": ${responseData.unix}, "utc": "${responseData.utc}"}`
                                        : 'No data yet. Click "Get Current Timestamp" to start.'}
                                </code>
                            </pre>
                        )}
                    </section>
                </div>
            </div>
        </>
    );
};

export default TimesTamp;
