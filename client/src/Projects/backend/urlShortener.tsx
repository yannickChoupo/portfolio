import React, { useState } from 'react';
import AXIOS from '../../redux/services/axios';

interface UrlShortenerResponse {
    original_url?: string;
    short_url?: number;
    error?: string;
    success?: boolean;
    message?: string;
}

const UrlShortener: React.FC = () => {
    const [inputUrl, setInputUrl] = useState<string>('');
    const [responseData, setResponseData] = useState<UrlShortenerResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputUrl.trim()) {
            setLoading(true);
            AXIOS.post('/api/shorturl/shorturl', { url: inputUrl })
                .then((response) => {
                    console.log(response.data);
                    setResponseData(response.data);
                })
                .catch((error) => {
                    console.error('Error shortening URL:', error);
                    setResponseData({ error: 'Failed to shorten URL' });
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    const getShortUrlLink = () => {
        if (responseData && responseData.short_url) {
            return `${window.location.origin}/api/shorturl/shorturl/${responseData.short_url}`;
        }
        return '';
    };

    return (
        <>
            <div id="url-shortener">
                <div className="container">
                    <header>
                        <h1>URL Shortener Microservice</h1>
                        <p className="subtitle">Shorten Long URLs</p>
                    </header>

                    <section className="about">
                        <h2>About</h2>
                        <p>
                            This is a URL Shortener Microservice challenge for the freeCodeCamp API and Microservices certification.
                            The API creates short URLs that redirect to the original long URLs.
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
                                    <td><code>POST /api/shorturl/shorturl</code></td>
                                    <td>POST</td>
                                    <td>Create a short URL from a long URL</td>
                                </tr>
                                <tr>
                                    <td><code>GET /api/shorturl/shorturl/:id</code></td>
                                    <td>GET</td>
                                    <td>Redirect to the original URL using the short URL ID</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                    <section className="usage">
                        <h2>Example Usage</h2>
                        <ul>
                            <li><code>POST /api/shorturl/shorturl</code> with body: <code>&#123;"url": "https://www.example.com"&#125;</code></li>
                            <li><code>GET /api/shorturl/shorturl/1</code> - Redirects to the original URL</li>
                        </ul>
                    </section>

                    <section className="example-output">
                        <h2>Example Output</h2>
                        <pre>
                            <code>
                                {`{
  "original_url": "https://www.example.com",
  "short_url": 1
}`}
                            </code>
                        </pre>
                        <p className="error-example">Error response:</p>
                        <pre>
                            <code>
                                {`{"error": "invalid url"}`}
                            </code>
                        </pre>
                    </section>

                    <section className="try-it">
                        <h2>Try It Out</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="urlInput">Enter a URL to shorten:</label>
                                <input
                                    type="text"
                                    id="urlInput"
                                    value={inputUrl}
                                    onChange={(e) => setInputUrl(e.target.value)}
                                    placeholder="https://www.example.com"
                                />
                                <button type="submit" disabled={loading}>
                                    {loading ? 'Shortening...' : 'Shorten URL'}
                                </button>
                            </div>
                        </form>
                    </section>

                    <section className="api-response">
                        <h2>API Response</h2>
                        {responseData ? (
                            responseData.error ? (
                                <div className="error">
                                    <pre>
                                        <code>
                                            {`{"error": "${responseData.error}"}`}
                                        </code>
                                    </pre>
                                </div>
                            ) : responseData.message ? (
                                <div className="info">
                                    <pre>
                                        <code>
                                            {`{"success": ${responseData.success}, "message": "${responseData.message}"}`}
                                        </code>
                                    </pre>
                                </div>
                            ) : (
                                <>
                                    <pre>
                                        <code>
                                            {`{
  "original_url": "${responseData.original_url}",
  "short_url": ${responseData.short_url}
}`}
                                        </code>
                                    </pre>
                                    <div className="short-link">
                                        <p><strong>Your short URL:</strong></p>
                                        <a href={getShortUrlLink()} target="_blank" rel="noopener noreferrer">
                                            {getShortUrlLink()}
                                        </a>
                                    </div>
                                </>
                            )
                        ) : (
                            <pre>
                                <code>No data yet. Enter a URL above to create a short link.</code>
                            </pre>
                        )}
                    </section>

                    <section className="how-to-use">
                        <h2>How to Use</h2>
                        <p>Make a POST request with a JSON body containing the URL to shorten:</p>
                        <pre>
                            <code>
                                {`fetch('/api/shorturl/shorturl', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ url: 'https://www.example.com' })
})
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

export default UrlShortener;
