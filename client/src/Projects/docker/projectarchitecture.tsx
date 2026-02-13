import React from "react";
import { marked } from "marked";
// import mermaid from "mermaid";
import "./projectarchitecture.scss"; // add CSS for full page

interface MarkDownPrevieverState {
    text: string;
}

const initialState = `# MERN Application Architecture




## Components

- **Root**: workspace containing two main folders and Docker configuration.
- **client/**: React frontend (with live markdown previewer component).
- **server/**: Express backend using Mongoose to talk to MongoDB.
- **db**: MongoDB instance – local container in development, Atlas in production.

## Environment

## Development Workflow

2. The backend waits for the Mongo container to be healthy before listening.
3. Editor and preview occupy the full page; edit markdown to document architecture.

## Production Behavior

- Frontend served statically behind Nginx, backend connects to Atlas using environment variables.
`;

class ProjectArchitecture extends React.Component<{}> {
    state: MarkDownPrevieverState = {
        text: initialState
    }

    handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({
            text: e.target.value
        });
    }
    
    render() {
        const { text } = this.state;
        const markdown = marked(text, {
            breaks: true
        });
        
        return (
            <>
                <div id="ProjectArchitecture" className="fullpage">
                    <div className="container fullpage">
                        <header>
                            <h1>Project Architecture Markdown Previewer</h1>
                        </header>
                        <section className="api-response">
                            <div 
                                id="preview"
                                dangerouslySetInnerHTML={{ __html: markdown }}
                            ></div>
                        </section>
                    </div>
                </div>
            </>
        );
    }
}

export default ProjectArchitecture;
