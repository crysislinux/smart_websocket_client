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

  _onClear(){
    this.setState({
      content: ""
    })
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
        <div className={styles.control}>
         <label className={styles.label}>Edit a message to send:</label>
         <button type="button" className={buttonStyles.button} onClick={this._onClick}>Send</button>
         <button type="button" className={buttonStyles.buttonClear} onClick={this._onClear}>Clear</button>
         <input className={styles.input} type="checkbox">Encode with protocol buffer</input>
        </div>
        <AceEditor
          className={styles.contentEditor}
          height="300"
          width="50%"
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