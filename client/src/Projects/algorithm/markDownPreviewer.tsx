import React from "react";
import { marked } from "marked"

interface MarkDownPrevieverState {
    text: string;
}

const initialState = `# Heading 1
## Heading 2
### Heading 3

Here's some code, \`<div></div>\`, between 2 backticks.

\`\`\`javascript
// this is multi-line code:
let x = 1;
let y = 2;
let z = x + y;
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.

1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:
`;

class MarkDownPreviewer extends React.Component<{}, MarkDownPrevieverState> {
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
                <div id="markdown-previewer">
                    <div className="container">
                        <header>
                            <h1>Markdown Previewer</h1>
                            <p className="subtitle">Live Editor with Real-Time Preview</p>
                        </header>

                        <section className="about">
                            <h2>About</h2>
                            <p>
                                A live markdown editor with real-time preview using marked.js. 
                                Type your markdown in the editor and see it rendered instantly in the preview pane.
                            </p>
                        </section>

                        <section className="usage">
                            <h2>Example Markdown Syntax</h2>
                            <ul>
                                <li><code># Heading 1</code></li>
                                <li><code>**bold text**</code></li>
                                <li><code>_italic text_</code></li>
                                <li><code>`inline code`</code></li>
                                <li><code>[link](https://example.com)</code></li>
                            </ul>
                        </section>

                        <section className="try-it">
                            <h2>Try It Out</h2>
                            <div className="editor-wrapper">
                                <div className="editor-section">
                                    <h3>Editor</h3>
                                    <textarea
                                        id="editor"
                                        value={text}
                                        onChange={this.handleChange}
                                        placeholder="Enter your markdown here..."
                                    />
                                </div>
                            </div>
                        </section>

                        <section className="api-response">
                            <h2>Preview</h2>
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

export default MarkDownPreviewer;
