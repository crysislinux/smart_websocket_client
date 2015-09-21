import React from 'react';
import WebsocketActions from '../actions/WebsocketActions'
import styles from '../assets/styles/components/content.css'
import buttonStyles from '../assets/styles/components/button.css'


var Content = React.createClass({
  getInitialState() {
    return {
      content: this.props.content
    }
  },

  _onClick(){
    WebsocketActions.sendData(this.state.content);
  },

  render() {
    return (
      <div className={styles.root}>
        <button type="button" className={buttonStyles.button} onClick={this._onClick}>Send</button>
        <textarea className={styles.textarea} value={this.state.content}></textarea>
      </div>
    );
  }
});

export default Content;
