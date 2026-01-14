import React, { useState } from 'react';
import AXIOS from '../../redux/services/axios';

interface FileMetadataResponse {
    name?: string;
    type?: string;
    size?: number;
    error?: string;
}

const FileMetadata: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [responseData, setResponseData] = useState<FileMetadataResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedFile) {
            const formData = new FormData();
            formData.append('upfile', selectedFile);

            setLoading(true);
            AXIOS.post('/api/filemeta/fileanalyse', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then((response) => {
                    console.log(response.data);
                    setResponseData(response.data);
                })
                .catch((error) => {
                    console.error('Error analyzing file:', error);
                    setResponseData({ error: 'Failed to analyze file' });
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    const formatFileSize = (bytes: number | undefined): string => {
        if (!bytes) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    return (
        <>
            <div id="file-metadata">
                <div className="container">
                    <header>
                        <h1>File Metadata Microservice</h1>
                        <p className="subtitle">Analyze File Information</p>
                    </header>

                    <section className="about">
                        <h2>About</h2>
                        <p>
                            This is a File Metadata Microservice challenge for the freeCodeCamp API and Microservices certification.
                            Upload a file and the API will return metadata including the file name, type, and size.
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
                                    <td><code>POST /api/filemeta/fileanalyse</code></td>
                                    <td>POST</td>
                                    <td>Upload a file and receive metadata (name, type, size)</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                    <section className="usage">
                        <h2>Example Usage</h2>
                        <ul>
                            <li>Upload a file via form-data with field name <code>upfile</code></li>
                            <li><code>POST /api/filemeta/fileanalyse</code></li>
                        </ul>
                    </section>

                    <section className="example-output">
                        <h2>Example Output</h2>
                        <pre>
                            <code>
                                {`{
  "name": "example.pdf",
  "type": "application/pdf",
  "size": 123456
}`}
                            </code>
                        </pre>
                    </section>

                    <section className="try-it">
                        <h2>Try It Out</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="fileInput">Select a file to analyze:</label>
                                <input
                                    type="file"
                                    id="fileInput"
                                    onChange={handleFileChange}
                                    accept="*/*"
                                />
                                {selectedFile && (
                                    <p className="file-info">
                                        Selected: <strong>{selectedFile.name}</strong> ({formatFileSize(selectedFile.size)})
                                    </p>
                                )}
                                <button type="submit" disabled={!selectedFile || loading}>
                                    {loading ? 'Analyzing...' : 'Analyze File'}
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
                            ) : (
                                <>
                                    <pre>
                                        <code>
                                            {`{
  "name": "${responseData.name}",
  "type": "${responseData.type}",
  "size": ${responseData.size}
}`}
                                        </code>
                                    </pre>
                                    <div className="file-details">
                                        <p><strong>File Name:</strong> {responseData.name}</p>
                                        <p><strong>File Type:</strong> {responseData.type}</p>
                                        <p><strong>File Size:</strong> {formatFileSize(responseData.size)} ({responseData.size} bytes)</p>
                                    </div>
                                </>
                            )
                        ) : (
                            <pre>
                                <code>No data yet. Upload a file above to see its metadata.</code>
                            </pre>
                        )}
                    </section>

                    <section className="how-to-use">
                        <h2>How to Use</h2>
                        <p>Make a POST request with form-data containing a file with field name <code>upfile</code>:</p>
                        <pre>
                            <code>
                                {`const formData = new FormData();
formData.append('upfile', fileInput.files[0]);

fetch('/api/filemeta/fileanalyse', {
  method: 'POST',
  body: formData
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

export default FileMetadata;
