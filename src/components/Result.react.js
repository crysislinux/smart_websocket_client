import React from 'react';
import WebsocketStore from '../stores/WebsocketStore';
import styles from '../assets/styles/components/result.css';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/github';
import beautifier from 'js-beautify';


var Result = React.createClass({
  getInitialState() {
    return {
      content: this.props.content
    }
  },

  componentDidMount() {
    WebsocketStore.listen(this._onChange);
  },

  componentWillUnmount() {
    WebsocketStore.unlisten(this._onChange);
  },

  shouldComponentUpdate(nextProps, nextState) {
    return !(nextState.content === this.state.content);
  },

  _onChange(state) {
    this.setState({
      content: state.data
    });
  },

  _formattedCode(content) {
    return content && beautifier(content, {indent_size: 2})
  },

  render() {
    return (
      <div className={styles.root}>
        <label>Result</label>
        <AceEditor
          className={styles.contentEditor}
          mode="javascript"
          theme="github"
          height="360"
          width="100%"
          name="resultEditor"
          value={this._formattedCode(this.state.content)}
          readOnly={true}
          editorProps={{$blockScrolling: Infinity}}
          />
      </div>
    );
  }
});

export default Result;
