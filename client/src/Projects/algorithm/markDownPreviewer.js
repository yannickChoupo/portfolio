import React from "react";
import { marked } from "marked"

const initialState = `
# heding
## heading
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:
let x=1;
let y=2;
let z=x+y;
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


1. And there are numbererd lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`;
class MarkDownPreviewer extends React.Component {
    state = {
        text: initialState
    }
    handleChange = (e) => {
        this.setState({
            text: e.target.value
        });
    }
    render() {
        const { text } = this.state;
        const markdown = marked(text, {
            breaks: true
        });
        const html = marked(
            this.state.text,
        );
        console.log(html);
        return (
            <div id="markDownPreviewer">
                <h2 className="header">Convert your Markdown</h2>
                <div id="inputField" className="">
                    <h4>Enter your Markdown here</h4>
                    <textarea
                        id="editor"
                        value={text}
                        onChange={this.handleChange}
                        // data-limt-row-len="true"
                        // maxLength="10"
                        rows="5"
                        cols="5"
                    />
                </div>
                <div id="outputField">
                    <h4>See the result</h4>
                    <div id="preview"
                        dangerouslySetInnerHTML={{ __html: markdown }}
                    ></div>
                </div>
            </div>
        );
    }
}


export default MarkDownPreviewer;