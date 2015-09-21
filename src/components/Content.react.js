import React from 'react';
import WebsocketActions from '../actions/WebsocketActions'
import styles from '../assets/styles/components/content.css'
import buttonStyles from '../assets/styles/components/button.css'
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/github';
import beautifier from 'js-beautify';


var Content = React.createClass({
  getInitialState() {
    return {
      content: this.props.content && beautifier(this.props.content, {indent_size: 2})
    }
  },

  componentDidMount() {
  },

  _onClick(){
    WebsocketActions.sendData(this.state.content);
  },

  _onChange(data) {
    console.log(data)
    this.setState({
      content: data
    })
  },

  render() {
    return (
      <div className={styles.root}>
        <button type="button" className={buttonStyles.button} onClick={this._onClick}>Send</button>
        <AceEditor className={styles.contentEditor}
          mode="javascript"
          theme="github"
          height="300"
          width="100%"
          onChange={this._onChange}
          name="contentEditor"
          value={this.state.content}
          editorProps={{$blockScrolling: true}}
          />
      </div>
    );
  }
});

export default Content;
