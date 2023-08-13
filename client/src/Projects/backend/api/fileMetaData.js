import React, { useState, useEffect } from 'react';
import AXIOS from '../../../redux/services/axios';
// import AXIOS from '../../redux/services/axios';

const FileMetaData = () => {
    const [ResponseData, setResponseData] = useState({
        unix: '',
        utc: ''
    })

    const [selectedFile, setSelectedFile] = React.useState(null);
    useEffect(() => {
        // uploadFile(value)
    }, [])

    const handleFileSelect = (event) => {
        console.log(event.target.files[0]);
        setSelectedFile(event.target.files[0])
      }

    const uploadFile = (file) => {
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", selectedFile);
        AXIOS.post('/api/filemeta', formData, {
            headers: { "Content-Type": "multipart/form-data" },
        }).then((response) => {
            console.log(response.data);
            setResponseData(response.data);
        })
    }

    const [value, setValue] = useState('')

    const handleChange = (e) => {
        console.log("handle changes....");
        setValue(e.target.value)
    }

    return (
        <>
            <div id="timestamp">
                <h2>File fileMetaData Parser Microservice</h2>
                <div className="container">
                    <section id='example-usage'>
                        <h3>Example usage</h3>
                        <div className='body'>
                            {/* <div onSubmit={handleSubmit} className='form' id='request'>
                                <textarea value={value} onChange={handleChange} className='text-area' />
                                <div type="submit" className='submit' onClick={handleSubmit}>
                                    <i class="fa-regular fa-paper-plane" />
                                </div>
                            </div> */}
                            <div>
                                <form encType="multipart/form-data" method="POST" action="/api/filemeta" onSubmit={handleSubmit}>
                                    <input id="inputfield" type="file" name="upfile" onChange={handleFileSelect}/>
                                    <input id="button" type="submit" value="Upload" />
                                </form>
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

export default FileMetaData;