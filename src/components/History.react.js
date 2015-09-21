import React from 'react';
import styles from '../assets/styles/components/history.css'


var History = React.createClass({
  render() {
    return (
      <div className={styles.root}>
        {this.props.content}
      </div>
    );
  }
});

export default History;
