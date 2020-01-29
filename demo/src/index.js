import React, { Component } from "react";
import { render } from "react-dom";
import MDEditor from "../../src/index.js";
// import MDEditor from "../../dist/index.js";
import "../../src/styles/all.scss";
// import "../../dist/index.css";
import "./styles/demo.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "## Hello"
    };
  }

  handleValueChange = value => {
    this.setState({ value });
  };

  loadSuggestions = async text => {
    return new Promise(resolve => {
      setTimeout(() => {
        const suggestions = [
          {
            preview: "Andre",
            value: "@andre"
          },
          {
            preview: "Angela",
            value: "@angela"
          },
          {
            preview: "David",
            value: "@david"
          },
          {
            preview: "Louise",
            value: "@louise"
          }
        ].filter(i => i.preview.toLowerCase().includes(text.toLowerCase()));
        resolve(suggestions);
      }, 250);
    });
  };

  render = () => (
    <div className="container">
      <MDEditor
        onChange={this.handleValueChange}
        value={this.state.value}
        loadSuggestions={this.loadSuggestions}
        suggestionTriggerCharacters={["@"]}
      />
    </div>
  );
}

render(<App />, document.getElementById("root"));
