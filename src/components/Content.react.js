import React from 'react';
import styles from '../assets/styles/components/content.css'
import buttonStyles from '../assets/styles/components/button.css'


var Content = React.createClass({
  render() {
    return (
      <div className={styles.root}>
        <button type="button" className={buttonStyles.button}>Send</button>
        <textarea className={styles.textarea} value={this.props.content}></textarea>
      </div>
    );
  }
});

export default Content;
