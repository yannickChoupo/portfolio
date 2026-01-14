import React, { useState, useEffect } from 'react';
import AXIOS from '../../redux/services/axios';

interface HeaderParserResponse {
    ipaddress: string;
    language: string;
    software: string;
    error?: string;
}

const RequestHeaderParser: React.FC = () => {
    const [responseData, setResponseData] = useState<HeaderParserResponse>({
        ipaddress: '',
        language: '',
        software: ''
    });
    const [loading, setLoading] = useState<boolean>(false);

    const fetchHeaderInfo = () => {
        setLoading(true);
        AXIOS.get('/api/whoiam')
            .then((response) => {
                console.log(response.data);
                setResponseData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching header info:', error);
                setResponseData({ 
                    ipaddress: '', 
                    language: '', 
                    software: '', 
                    error: 'Failed to fetch header information' 
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchHeaderInfo();
    }, []);

    return (
        <>
            <div id="header-parser">
                <div className="container">
                    <header>
                        <h1>Request Header Parser Microservice</h1>
                        <p className="subtitle">API Project - Parse HTTP Request Headers</p>
                    </header>

                    <section className="about">
                        <h2>About</h2>
                        <p>
                            This is a Request Header Parser Microservice challenge for the freeCodeCamp API and Microservices certification.
                            The API parses HTTP request headers to extract information about the client making the request.
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
                                    <td><code>GET /api/whoiam</code></td>
                                    <td>Return client IP address, preferred language, and software (user-agent)</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                    <section className="usage">
                        <h2>Example Usage</h2>
                        <ul>
                            <li><code>/api/whoiam</code></li>
                        </ul>
                    </section>

                    <section className="example-output">
                        <h2>Example Output</h2>
                        <pre>
                            <code>
                                {`{
  "ipaddress": "192.168.1.1",
  "language": "en-US,en;q=0.9",
  "software": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)..."
}`}
                            </code>
                        </pre>
                    </section>

                    <section className="try-it">
                        <h2>Try It Out</h2>
                        <button onClick={fetchHeaderInfo} disabled={loading}>
                            {loading ? 'Loading...' : 'Get My Header Info'}
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
                                    {responseData.ipaddress || responseData.language || responseData.software
                                        ? `{
  "ipaddress": "${responseData.ipaddress}",
  "language": "${responseData.language}",
  "software": "${responseData.software}"
}`
                                        : 'No data yet. Click "Get My Header Info" to start.'}
                                </code>
                            </pre>
                        )}
                    </section>

                    <section className="how-to-use">
                        <h2>How to Use</h2>
                        <p>Simply make a GET request to the endpoint and receive information about your current browser and connection:</p>
                        <pre>
                            <code>
                                {`fetch('/api/whoiam')
  .then(response => response.json())
  .then(data => console.log(data));`}
                            </code>
                        </pre>
                    </section>

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

export default RequestHeaderParser;
