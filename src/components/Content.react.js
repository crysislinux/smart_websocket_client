import React from 'react';
import WebsocketActions from '../actions/WebsocketActions'
import WebsocketStore from '../stores/WebsocketStore'
import styles from '../assets/styles/components/content.css'
import buttonStyles from '../assets/styles/components/button.css'
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/github';
import beautifier from 'js-beautify';


var Content = React.createClass({
  getInitialState() {
    return {
      content: ''
    }
  },

  componentDidMount() {
    WebsocketStore.listen(this._onChange);
  },

  componentWillUnmount() {
    WebsocketStore.unlisten(this._onChange);
  },

  _onClick(){
    WebsocketActions.sendData(this.state.content);
  },

  _onContentChange(data) {
    WebsocketActions.requestDataChanged(data);
  },

  _onChange(state) {
    this.setState({
      content: state.request_data
    })
  },

  render() {
    return (
      <div className={styles.root}>
        <button type="button" className={buttonStyles.button} onClick={this._onClick}>Send</button>
        <AceEditor
          className={styles.contentEditor}
          mode="javascript"
          theme="github"
          height="300"
          width="100%"
          tabSize={2}
          onChange={this._onContentChange}
          name="contentEditor"
          value={this.state.content}
          editorProps={{$blockScrolling: Infinity}}
          />
      </div>
    );
  }
});

export default Content;
